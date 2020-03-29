import responseBuilder from '../builders/response-builder';

const entryController = {
  handle: async (req, res) => {
    switch (req.method) {
      case 'POST':
        return responseBuilder.handleQueryRequest(req, res);
      case 'PUT':
        return responseBuilder.handleUpdateRequest(req, res);
      default:
        return res.status(404).send();
    }
  },
};

export default entryController;
