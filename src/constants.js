const ERRORS = {
  MISSING_CONNECT_HEADER: 'Missing connectid from header.',
  INVALID_BODY: 'Missing request body.',
};
const HEADERS_TO_EXCLUDE = [
  'host',
];
const HTTP_CONTEXT_KEYS = {
  CONNECT_ID: 'connectid',
};
const MONGO = {
  CONNECTION_URL: 'mongodb://localhost:27017',
  DATABASE: 'cristy',
  ENTRY_COLLECTION: 'entries',
  SETTINGS_COLLECTION: 'settings',
};

export {
  ERRORS,
  HEADERS_TO_EXCLUDE,
  HTTP_CONTEXT_KEYS,
  MONGO,
};
