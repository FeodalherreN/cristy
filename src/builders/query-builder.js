import httpContext from 'express-http-context';
import shortHash from 'short-hash';
import { HTTP_CONTEXT_KEYS } from '../constants';

const prefixSalt = 'eb';
const suffixSalt = 'be';

const queryBuilder = {
  createFromRequest(request) {
    const id = httpContext.get(HTTP_CONTEXT_KEYS.ID);
    const key = JSON.stringify({
      id,
      'request.method': request.method,
      'request.uri.host': request.uri.host,
      'request.uri.path': request.uri.path,
    });
    const hash = `${prefixSalt}${shortHash(key)}${suffixSalt}`;

    return hash;
  },
  createFromResponse(response) {
    const id = httpContext.get(HTTP_CONTEXT_KEYS.ID);
    const key = JSON.stringify({
      id,
      'request.method': response.request.method,
      'request.uri.host': response.request.uri.host,
      'request.uri.path': response.request.uri.path,
    });
    const hash = `${prefixSalt}${shortHash(key)}${suffixSalt}`;

    return hash;
  },
  createDatabaseQuery(obj) {
    return obj;
  },
};

export default queryBuilder;
