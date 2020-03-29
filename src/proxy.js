import express from 'express';
import middlware from './middleware';
import routes from './routes';

const app = express();

middlware(app);
routes(app);

export default app;
