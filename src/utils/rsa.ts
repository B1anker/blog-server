import * as fs from 'fs';
import * as NodeRSA from 'node-rsa';

import { AUTH } from '@/app.config';

import { pathResolve } from './path';

export const generateRsa = () => {
  try {
    fs.statSync(AUTH.privateKeyPath);
  } catch (err) {
    const rsa = new NodeRSA({b: 1024});
    rsa.setOptions({encryptionScheme: 'pkcs1'});
    const publicKey = rsa.exportKey('pkcs8-public');
    const privateKey = rsa.exportKey('pkcs8-private');
    fs.writeFileSync(AUTH.privateKeyPath, privateKey);
    fs.writeFileSync(AUTH.publicKeyPath, publicKey);
  }
};
