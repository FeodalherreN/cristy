import cors from 'cors';
import express from 'express';
import httpContext from 'express-http-context';
import configService from './services/config-service';
import { HTTP_CONTEXT_KEYS } from './constants';

const config = configService.loadConfig();

const middleware = (app) => {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(httpContext.middleware);
  app.use((req, res, next) => {
    const { baseUrl } = config.settings;
    const url = `${baseUrl}${req.url}`;
    const key = req.headers[config.settings.headerKey];

    if (key) httpContext.set(HTTP_CONTEXT_KEYS.ID, key);

    httpContext.set(HTTP_CONTEXT_KEYS.CONFIG, config);
    httpContext.set(HTTP_CONTEXT_KEYS.URL, url);
    next();
  });
};

export default middleware;
