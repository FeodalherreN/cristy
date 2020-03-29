import logger from './logger';
import proxy from './proxy';

proxy.listen(3000, () => logger.debug('Proxy started and listening on port 3000'));
