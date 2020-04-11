import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 8;
const OUTPUT_ENCODING = "hex";
const SEPERATOR = ":";

const encrypt = (obj) => {
  const text = JSON.stringify(obj);
  const iv = crypto.randomBytes(IV_LENGTH).toString(OUTPUT_ENCODING);
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(process.env.SETTINGS_ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString(OUTPUT_ENCODING)}${SEPERATOR}${encrypted.toString(
    OUTPUT_ENCODING
  )}`;
  ß;
};

const decrypt = (text) => {
  const textParts = text.split(SEPERATOR);
  const iv = Buffer.from(textParts.shift(), OUTPUT_ENCODING).toString(
    OUTPUT_ENCODING
  );
  const encryptedText = Buffer.from(textParts.join(SEPERATOR), OUTPUT_ENCODING);
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(process.env.SETTINGS_ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return JSON.parse(decrypted.toString());
};

export { encrypt, decrypt };
