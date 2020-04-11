import httpContext from "express-http-context";
import { HTTP_CONTEXT_KEYS, RESPONSE_TYPE } from "../constants";
import entryService from "../services/entry-service";

const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const getResponseType = (res, error) => {
  if (error || res.statusCode >= 500) {
    return RESPONSE_TYPE.SERVER_ERROR;
  }

  return RESPONSE_TYPE.OK;
};

const responseBuilder = {
  handleOfflineResponse: async (req, res) => {
    const config = httpContext.get(HTTP_CONTEXT_KEYS.CONFIG);
    const request = {
      method: req.method,
      uri: {
        host: new URL(config.settings.baseUrl).hostname,
        path: req.path,
      },
    };
    const existingResponse = await entryService.getEntry(request);
    if (existingResponse) {
      res.statusCode = existingResponse.statusCode;
      res.headers = existingResponse.headers;
      if (typeof existingResponse.body === "object") {
        res.json(existingResponse.body);
      } else if (isJsonString(existingResponse.body)) {
        res.json(JSON.parse(existingResponse.body));
      }
      res.status(res.statusCode).end();
    } else {
      const statusCode = 418;
      res.json({
        code: statusCode,
        message: "Error connecting to server, no entry found from database.",
        query: request,
      });
      res.status(statusCode).end();
    }
  },
  handlePipedResponse: async (req, res, error) => {
    const responseType = getResponseType(res, error);

    switch (responseType) {
      case RESPONSE_TYPE.OK:
        break;
      case RESPONSE_TYPE.SERVER_ERROR:
      case RESPONSE_TYPE.OFFLINE:
        await responseBuilder.handleOfflineResponse(req, res);
        break;
      default:
        break;
    }
  },
};

export default responseBuilder;
