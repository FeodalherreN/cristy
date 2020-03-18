import fs from 'fs';

const sslLoader = {
  loadOptions() {
    const sslOptions = {
      key: fs.readFileSync('./certificates/cert.key'),
      cert: fs.readFileSync('./certificates/cert.pem'),
    };

    return sslOptions;
  },
};

export default sslLoader;
