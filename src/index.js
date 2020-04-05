import dotenv from 'dotenv';
import api from './api';
import logger from './logger';
import proxy from './proxy';

dotenv.config();

api.listen(4000, () => logger.debug('Api started and listening on port 4000'));
proxy.listen(3000, () => logger.debug('Proxy started and listening on port 3000'));
