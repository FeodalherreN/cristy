import entryService from "../services/entry-service";

const entryController = {
  put: async (req, res) => {
    const result = await entryService.updateEntry(req.body);
    res.status(result ? 200 : 400).end();
  },
  get: async (req, res) => {
    const result = await entryService.getEntryById(req.params.id);
    if (result) {
      res.json(result);
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  },
  getMany: async (req, res) => {
    const query = req.body;
    const result = await entryService.getEntries(query);
    if (result) {
      res.json(result);
    }
    res.status(200).end();
  },
};

export default entryController;
