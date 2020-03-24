const ERRORS = {
  MISSING_ID_HEADER: 'Missing id from header.',
  INVALID_BODY: 'Missing request body.',
};
const HEADERS_TO_EXCLUDE = [
  'host',
];
const HTTP_CONTEXT_KEYS = {
  ID: 'id',
};
const RESPONSE_TYPE = {
  OK: 0,
  SERVER_ERROR: 1,
  OFFLINE: 2,
};

export {
  ERRORS,
  HEADERS_TO_EXCLUDE,
  HTTP_CONTEXT_KEYS,
  RESPONSE_TYPE,
};
