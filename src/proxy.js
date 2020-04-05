import express from 'express';
import middleware from './middleware/proxy-middleware';
import { proxyRoutes } from './routes';

const app = express();

middleware(app);
proxyRoutes(app);

export default app;
