import https from 'https';
import proxy from './proxy';
import sslLoader from './security/ssl-loader';

const port = 3000;
const sslOptions = sslLoader.loadOptions();
const proxyInstance = proxy;

https.createServer(sslOptions, proxyInstance).listen(port, () => console.log(`Proxy started and listening on port ${port}!`));
