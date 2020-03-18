import httpContext from 'express-http-context';
import { HTTP_CONTEXT_KEYS } from '../constants';
import entyService from '../services/entry-service';

const responseHandler = {
  handle(error, response) {
    if (response) {
      console.info(`Got response with statuscode: ${response.statusCode} and message: ${response.statusMessage}`);

      const isValidRequest = response.statusCode < 300;
      if (isValidRequest) {
        const connectId = httpContext.get(HTTP_CONTEXT_KEYS.CONNECT_ID);
        if (connectId) {
          const entry = response.toJSON();
          entry.connectId = connectId;
          entyService.insertEntry(entry);
        }
      }
    }

    if (error) {
      console.error(`Error while recieving response: ${error.message}`);
    }
  },
};

export default responseHandler;
