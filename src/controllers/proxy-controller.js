import httpContext from "express-http-context";
import { HTTP_CONTEXT_KEYS } from "../constants";
import responseBuilder from "../builders/response-builder";
import requestHandler from "../proxy-handlers/request-handler";

const proxyController = {
  handle: async (req, res) => {
    const config = httpContext.get(HTTP_CONTEXT_KEYS.CONFIG);
    if (config.settings.offline) {
      responseBuilder.handleOfflineResponse(req, res);
      return;
    }

    const request = requestHandler.getRequest(req);
    req
      .pipe(request)
      .on("error", async (error) => {
        await responseBuilder.handlePipedResponse(req, res, error);
      })
      .pipe(res);

    await responseBuilder.handlePipedResponse(req, res);
  },
};

export default proxyController;
