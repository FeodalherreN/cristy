import responseBuilder from '../builders/response-builder';

const configController = {
  handle: async (req, res) => {
    switch (req.method) {
      case 'GET':
        return responseBuilder.handleConfigRequest(req, res);
      case 'PUT':
        return responseBuilder.handleConfigUpdateRequest(req, res);
      default:
        return res.status(404).send();
    }
  },
};

export default configController;
