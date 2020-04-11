import cors from "cors";
import express from "express";
import { HTTP_CONTEXT_KEYS } from "../constants";
import httpContext from "express-http-context";

const middleware = (app) => {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(httpContext.middleware);
  app.use((req, res, next) => {
    const host = req.headers["host"];

    if (host) httpContext.set(HTTP_CONTEXT_KEYS.HOST, host);
    next();
  });
};

export default middleware;
