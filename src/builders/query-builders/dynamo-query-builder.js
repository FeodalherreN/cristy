import httpContext from 'express-http-context';
import { HTTP_CONTEXT_KEYS } from '../../constants';

const queryBuilder = {
  createFromRequest(request) {
    const id = httpContext.get(HTTP_CONTEXT_KEYS.ID);
    const query = JSON.stringify({
      id,
      'request.method': request.method,
      'request.uri.host': request.uri.host,
      'request.uri.path': request.uri.path,
    });

    return query;
  },
  createFromResponse(response) {
    const id = httpContext.get(HTTP_CONTEXT_KEYS.ID);
    const query = JSON.stringify({
      id,
      'request.method': response.request.method,
      'request.uri.host': response.request.uri.host,
      'request.uri.path': response.request.uri.path,
    });

    return query;
  },
  createDatabaseQuery(obj) {
    const query = {
      KeyConditionExpression: '',
      ExpressionAttributeValues: {},
    };

    Object.keys(obj).forEach((key) => {
      query.KeyConditionExpression += `${key} = :${key} `;
      query.ExpressionAttributeValues[`:${key}`] = obj[key];
    });

    query.KeyConditionExpression = query.KeyConditionExpression.slice(0, -1);
    return query;
  },
};

export default queryBuilder;
