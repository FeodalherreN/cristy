import cors from 'cors';
import express from 'express';
import httpContext from 'express-http-context';
import entryService from './services/entry-service';
import { ERRORS, HTTP_CONTEXT_KEYS } from './constants';
import requestHandler from './handlers/request-handler';
import settingsService from './services/settings-service';
import sslLoader from './security/ssl-loader';

const app = express();
const sslOptions = sslLoader.loadOptions();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(httpContext.middleware);
app.use('/', async (req, res) => {
  const settings = await settingsService.getSettings();
  const { baseUrl } = settings;
  const url = `${baseUrl}e${req.url}`;
  const key = req.headers[settings.headerKey];
  if (!key) {
    res.statusMessage = ERRORS.MISSING_CONNECT_HEADER;
    res.status(400).end();
    return;
  }

  httpContext.set(HTTP_CONTEXT_KEYS.CONNECT_ID, key);
  const request = requestHandler.getRequest(req, url, sslOptions);

  console.info(`Proxying request with url: ${request.uri.href} and method: ${request.method}`);
  req.pipe(request).on('error', (error) => {
    res.status(500).send(error);
  }).pipe(res);

  const returnCachedResponse = res.statusCode >= 500 || settings.offline;
  if (returnCachedResponse) {
    const existingResponse = await entryService.getRequest(key, request.toJSON());
    if (existingResponse) {
      res.statusCode = existingResponse.statusCode;
      res.headers = existingResponse.headers;
      res.json(JSON.parse(existingResponse.body));
      res.status(200).end();
    }
  }
});

export default app;
