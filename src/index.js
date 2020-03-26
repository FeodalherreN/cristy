import proxy from './proxy';
import configService from './services/config-service';

const config = configService.getSettings();

proxy.listen(config.settings.port, () => console.log(`Proxy started and listening on port ${config.settings.port}`));
