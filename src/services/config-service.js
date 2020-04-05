import fs from 'fs';
import logger from '../logger';

const configPath = './config.json';
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const configService = {
  loadConfig() {
    return config;
  },
  setConfig(config) {
    const json = JSON.stringify(config, null, 2);
    return fs.writeFile(configPath, json, (error) => {
      if (error) {
        logger.error(error);
        return false;
      }
      return true;
    });
  },
};

export default configService;
