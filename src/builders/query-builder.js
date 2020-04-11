import httpContext from "express-http-context";
import shortHash from "short-hash";
import { ObjectId } from "mongodb";
import { HTTP_CONTEXT_KEYS } from "../constants";

const queryBuilder = {
  createFromId(id) {
    return { _id: new ObjectId(id) };
  },
  createFromRequest(request) {
    const id = httpContext.get(HTTP_CONTEXT_KEYS.ID);
    const key = {
      id: id,
      method: request.method,
      targetHost: request.uri.host,
      path: request.uri.path,
    };
    const hash = this.createHash(key);

    return { _id: new ObjectId(hash) };
  },
  createFromResponse(response) {
    const id = httpContext.get(HTTP_CONTEXT_KEYS.ID);
    const key = {
      id: id,
      method: response.request.method,
      targetHost: response.request.uri.host,
      path: response.request.uri.path,
    };
    const hash = this.createHash(key);
    return { _id: new ObjectId(hash) };
  },
  createHash(key) {
    let hash = shortHash(JSON.stringify(key));

    while (hash.length < 12) {
      hash += "0";
    }

    return hash;
  },
};

export default queryBuilder;
