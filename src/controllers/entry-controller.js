import responseBuilder from '../builders/response-builder';

const entryController = {
  put: async (req, res) => responseBuilder.handleUpdateRequest(req, res),
  get: async (req, res) => responseBuilder.handleGetEntryRequest(req, res),
  getMany: async (req, res) => responseBuilder.handleGetManyEntriesRequest(req, res),
};

export default entryController;
