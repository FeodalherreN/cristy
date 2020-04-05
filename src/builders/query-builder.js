import httpContext from 'express-http-context';
import shortHash from 'short-hash';
import { ObjectId } from 'mongodb';
import { HTTP_CONTEXT_KEYS } from '../constants';

const prefixSalt = 'eb';
const suffixSalt = 'be';

const queryBuilder = {
  createFromObject(obj) {
    const key = JSON.stringify(obj);
    const hash = `${prefixSalt}${shortHash(key)}${suffixSalt}`;

    return { _id: new ObjectId(hash) };
  },
  createFromRequest(request) {
    const id = httpContext.get(HTTP_CONTEXT_KEYS.ID);
    const key = JSON.stringify({
      id,
      method: request.method,
      targetHost: request.uri.host,
      clientHost: httpContext.get(HTTP_CONTEXT_KEYS.HOST),
      path: request.uri.path,
    });
    const hash = `${prefixSalt}${shortHash(key)}${suffixSalt}`;

    return { _id: new ObjectId(hash) };
  },
  createFromResponse(response) {
    const id = httpContext.get(HTTP_CONTEXT_KEYS.ID);
    const key = JSON.stringify({
      id,
      method: response.request.method,
      targetHost: response.request.uri.host,
      clientHost: httpContext.get(HTTP_CONTEXT_KEYS.HOST),
      path: response.request.uri.path,
    });
    const hash = `${prefixSalt}${shortHash(key)}${suffixSalt}`;

    return { _id: new ObjectId(hash) };
  },
};

export default queryBuilder;
