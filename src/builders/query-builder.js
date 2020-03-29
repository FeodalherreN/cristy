import httpContext from 'express-http-context';
import { HTTP_CONTEXT_KEYS } from '../constants';
import dynamoQueryBuilder from './query-builders/dynamo-query-builder';
import mongoQueryBuilder from './query-builders/mongo-query-builder';

const getQueryBuilder = () => {
  const config = httpContext.get(HTTP_CONTEXT_KEYS.CONFIG);
  if (config.settings.database === 'mongodb') {
    return mongoQueryBuilder;
  }
  if (config.settings.database === 'dynamodb') {
    return dynamoQueryBuilder;
  }

  throw new Error('NO_DATABASE_SET_IN_CONFIG');
};

const queryBuilder = {
  createFromRequest(request) {
    const queryBuilderInstance = getQueryBuilder();
    return queryBuilderInstance.createFromRequest(request);
  },
  createFromResponse(response) {
    const queryBuilderInstance = getQueryBuilder();
    return queryBuilderInstance.createFromResponse(response);
  },
  createDatabaseQuery(obj) {
    const queryBuilderInstance = getQueryBuilder();
    return queryBuilderInstance.createDatabaseQuery(obj);
  },
};

export default queryBuilder;
