import entryService from '../services/entry-service';

const entryController = {
  put: async (req, res) => {
    const result = await entryService.updateEntry(req.body);
    res.status(result ? 200 : 400).end();
  },
  get: async (req, res) => {
    const query = {
      id: req.params.id,
      method: req.params.method,
      host: req.params.host,
      path: req.params.path,
    };

    const result = entryService.getEntryByObject(query);
    if(result){
      res.json(result);
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  },
  getMany: async (req, res) => {
    const { id } = req.params;
    const result = await entryService.getEntries(id);
    res.json(result);
    res.status(200).end();
  },
};

export default entryController;
