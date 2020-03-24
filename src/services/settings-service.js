import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const settingsService = {
  getSettings() {
    return config;
  },
};

export default settingsService;
