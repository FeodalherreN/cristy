import httpContext from "express-http-context";
import configService from "../services/config-service";

const configController = {
  get: async (req, res) => {
    const config = httpContext.get(HTTP_CONTEXT_KEYS.CONFIG);
    res.json(config);
    res.status(200).end();
  },
  put: async (req, res) => {
    const result = configService.setConfig(req.body);
    res.status(result ? 200 : 400).end();
  },
};

export default configController;
