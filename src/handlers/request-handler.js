import request from 'request';
import { HEADERS_TO_EXCLUDE } from '../constants';
import responseHandler from './response-handler';

const requestHandler = {
  getRequest(req, url, sslOptions) {
    const headers = [];
    Object.entries(req.headers).forEach(([key, val]) => {
      if (!HEADERS_TO_EXCLUDE.includes(key)) {
        headers.push({ key: val });
      }
    });

    const agentOptions = {
      cert: sslOptions.cert,
      key: sslOptions.key,
      headers,
    };

    let r = null;
    if (req.method === 'POST') {
      r = request.post({ uri: url, agentOptions, json: req.body }, responseHandler.handle);
    } else if (req.method === 'GET' || req.method === 'HEAD') {
      r = request.get(url, agentOptions, responseHandler.handle);
    } else if (req.method === 'PUT') {
      r = request.put({ url, agentOptions, json: req.body }, responseHandler.handle);
    } else if (req.method === 'DELETE') {
      r = request.delete(url, agentOptions, responseHandler);
    } else if (req.method === 'PATCH') {
      r = request.patch({ url, agentOptions, json: req.body }, responseHandler.handle);
    } else {
      r = request(url, agentOptions, responseHandler.handle);
    }

    return r;
  },
};

export default requestHandler;
