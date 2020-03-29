import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const configService = {
  loadConfig() {
    return config;
  },
};

export default configService;
