import configController from "./controllers/config-controller";
import entryController from "./controllers/entry-controller";
import proxyController from "./controllers/proxy-controller";

const proxyRoutes = (app) => {
  app.use("/", async (req, res) => proxyController.handle(req, res));
};

const apiRoutes = (app) => {
  app.put("/entry", async (req, res) => entryController.put(req, res));

  app.post("/entries", async (req, res) => entryController.getMany(req, res));

  app.get("/entry/:id", async (req, res) => entryController.get(req, res));

  app.put("/config", async (req, res) => configController.put(req, res));

  app.get("/config", async (req, res) => configController.get(req, res));
};

export { proxyRoutes, apiRoutes };
