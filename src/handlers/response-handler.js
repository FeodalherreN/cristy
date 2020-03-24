import httpContext from 'express-http-context';
import { HTTP_CONTEXT_KEYS } from '../constants';
import entyService from '../services/entry-service';

const responseHandler = {
  handle(error, response) {
    if (response) {
      console.info(`Got response with statuscode: ${response.statusCode} and message: ${response.statusMessage}`);

      const isValidRequest = response.statusCode < 300;
      if (isValidRequest) {
        const id = httpContext.get(HTTP_CONTEXT_KEYS.ID);
        if (id) {
          const entry = response.toJSON();
          entry.id = id;
          entyService.insertEntry(entry);
        }
      }
    }

    if (error) {
      console.error(error);
    }
  },
};

export default responseHandler;
