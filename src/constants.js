const ERRORS = {
  MISSING_ID_HEADER: 'Missing id from header.',
  INVALID_BODY: 'Missing request body.',
};
const HEADERS_TO_EXCLUDE = [
  'host',
];
const HTTP_CONTEXT_KEYS = {
  CONFIG: 'config',
  ID: 'id',
  URL: 'url',
};
const RESPONSE_TYPE = {
  OK: 'OK',
  SERVER_ERROR: 'SERVER_ERROR',
  OFFLINE: 'OFFLINE',
};
const ROUTES = {
  HIDDEN_ROUTE: '/super-secret-route',
};

export {
  ERRORS,
  HEADERS_TO_EXCLUDE,
  HTTP_CONTEXT_KEYS,
  RESPONSE_TYPE,
  ROUTES,
};
