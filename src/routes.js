import entryController from './controllers/entry-controller';
import proxyController from './controllers/proxy-controller';
import { ROUTES } from './constants';

const routes = (app) => {
  app.use('/', async (req, res) => {
    const isEntryRequest = req.url.startsWith(ROUTES.HIDDEN_ROUTE);
    if (isEntryRequest) return entryController.handle(req, res);

    return proxyController.handle(req, res);
  });
};

export default routes;
