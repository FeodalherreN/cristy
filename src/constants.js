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

export {
  ERRORS,
  HEADERS_TO_EXCLUDE,
  HTTP_CONTEXT_KEYS,
};
