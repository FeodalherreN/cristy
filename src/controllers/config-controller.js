import responseBuilder from '../builders/response-builder';

const configController = {
  get: async (req, res) => responseBuilder.handleConfigRequest(req, res),
  put: async (req, res) => responseBuilder.handleConfigUpdateRequest(req, res),
};

export default configController;
