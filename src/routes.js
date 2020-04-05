import configController from "./controllers/config-controller";
import entryController from "./controllers/entry-controller";
import proxyController from "./controllers/proxy-controller";
import { ROUTES } from "./constants";

const proxyRoutes = (app) => {
  app.use("/", async (req, res) => {
    const isEntryRequest = req.url.startsWith(ROUTES.HIDDEN_ENTRY_ROUTE);
    if (isEntryRequest) return entryController.handle(req, res);

    const isConfigRequest = req.url.startsWith(ROUTES.HIDDEN_CONFIG_ROUTE);
    if (isConfigRequest) return configController.handle(req, res);

    return proxyController.handle(req, res);
  });
};

const apiRoutes = (app) => {
  app.put("entry", async (req, res) => {
    return entryController.handle(req, res);
  });

  app.get("entries", async (req, res) => {
    return entryController.handle(req, res);
  });

  app.get("entry", async (req, res) => {
    return entryController.handle(req, res);
  });

  app.put("config", async (req, res) => {
    return configController.handle(req, res);
  });

  app.get("config", async (req, res) => {
    return configController.handle(req, res);
  });
};

export {
  proxyRoutes,
  apiRoutes
};
