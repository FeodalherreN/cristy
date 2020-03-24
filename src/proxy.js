import cors from 'cors';
import express from 'express';
import httpContext from 'express-http-context';
import configService from './services/config-service';
import { HTTP_CONTEXT_KEYS } from './constants';
import { handleInvalidRequest, handlePipedResponse } from './response-builder';
import requestHandler from './proxy-handlers/request-handler';
import sslLoader from './security/ssl-loader';

const app = express();
const sslOptions = sslLoader.loadOptions();
const config = configService.getSettings();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(httpContext.middleware);
app.use('/', async (req, res) => {
  const { baseUrl } = config.settings;
  const url = `${baseUrl}${req.url}`;
  const key = req.headers[config.settings.headerKey];
  if (!key) handleInvalidRequest(res);

  httpContext.set(HTTP_CONTEXT_KEYS.ID, key);
  const request = requestHandler.getRequest(req, url, sslOptions);

  console.info(`Proxying request with url: ${request.uri.href} and method: ${request.method}`);
  req.pipe(request).on('error', async (error) => {
    await handlePipedResponse(req, res, request, error);
  }).pipe(res);

  await handlePipedResponse(req, res, request);
});

export default app;
