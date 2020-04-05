import crypto from 'crypto';
import httpContext from 'express-http-context';
import { HTTP_CONTEXT_KEYS } from './constants';

const algorithm = 'aes-256-ctr';
const inputEncoding = 'utf-8';
const outputEncoding = 'hex';

const encrypt = (obj) => {
  const text = JSON.stringify(obj);
  const config = httpContext.get(HTTP_CONTEXT_KEYS.CONFIG);
  let cipher = crypto.createCipher(algorithm, config.settings.encryptionKey);
  let crypted = cipher.update(text, inputEncoding, outputEncoding);
  crypted += cipher.final(outputEncoding);
  return crypted;
}
 
const decrypt = (text) => {
  const config = httpContext.get(HTTP_CONTEXT_KEYS.CONFIG);
  let decipher = crypto.createDecipher(algorithm, config.settings.encryptionKey);
  let dec = decipher.update(text,outputEncoding, inputEncoding);
  dec += decipher.final(inputEncoding);
  return JSON.parse(dec);
}

export {
    encrypt,
    decrypt
};
