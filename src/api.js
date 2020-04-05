import express from 'express';
import middleware from './middleware/api-middleware';
import { apiRoutes } from './routes';

const app = express();

middleware(app);
apiRoutes(app);

export default app;
