import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const settingsService = {
  getSettings() {
    const { settings } = config;

    return settings;
  },
};

export default settingsService;
