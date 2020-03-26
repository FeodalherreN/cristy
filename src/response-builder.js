import { ERRORS, RESPONSE_TYPE } from './constants';
import configService from './services/config-service';
import entryService from './services/entry-service';

const config = configService.getSettings();

const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const handleOfflineResponse = async (req, res, request) => {
  const key = req.headers[config.settings.headerKey];
  const existingResponse = await entryService.getRequest(key, request.toJSON());
  if (existingResponse && existingResponse.Item) {
    res.statusCode = existingResponse.Item.statusCode;
    res.headers = existingResponse.Item.headers;
    if (isJson(existingResponse.Item.body)) {
      res.json(JSON.parse(existingResponse.Item.body));
    }
    res.status(200).end();
  }
};

const getResponseType = (res, error) => {
  if (config.settings.offline) {
    return RESPONSE_TYPE.OFFLINE;
  } if (error || res.statusCode >= 500) {
    return RESPONSE_TYPE.SERVER_ERROR;
  }

  return RESPONSE_TYPE.OK;
};

const handleInvalidRequest = (res) => {
  res.statusMessage = ERRORS.MISSING_ID_HEADER;
  res.status(400).end();
};

const handlePipedResponse = async (req, res, request, error) => {
  const responseType = getResponseType(res, error);

  switch (responseType) {
    case RESPONSE_TYPE.OK:
      break;
    case RESPONSE_TYPE.SERVER_ERROR:
    case RESPONSE_TYPE.OFFLINE:
      await handleOfflineResponse(req, res, request);
      break;
    default:
      break;
  }
};

export {
  handleInvalidRequest,
  handlePipedResponse,
};
