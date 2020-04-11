import entyService from "../services/entry-service";
import logger from "../logger";

const responseHandler = {
  handle(error, response) {
    if (response) {
      logger.debug(
        `Got response with statuscode: ${response.statusCode} and message: ${response.statusMessage}`
      );

      const isValidRequest = response.statusCode < 300;
      if (isValidRequest) {
        entyService.insertOrUpdateEntry(response.toJSON());
      }
    }

    if (error) {
      logger.error(error);
    }
  },
};

export default responseHandler;
