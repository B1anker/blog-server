import * as fs from 'fs';

import { pathResolve } from '@/utils/path';

const getPrivateKey = (): string => {
  try {
    return fs.readFileSync(pathResolve('../private.key')).toString();
  } catch (err) {
    return '';
  }
};

const getPublicKey = (): string => {
  try {
    return fs.readFileSync(pathResolve('../public.key')).toString();
  } catch (err) {
    return '';
  }
};

export const updateAUTH = () => {
  AUTH.privateKey = getPrivateKey();
  AUTH.publicKey = getPublicKey();
};

export const AUTH = {
  expiresIn: 1000 * 60 * 15,
  renew: 300,
  privateKey: getPrivateKey(),
  publicKey: getPublicKey(),
  privateKeyPath: pathResolve('../private.key'),
  publicKeyPath: pathResolve('../public.key'),
  defaultAccount: 'admin',
  defaultPassword: 'admin'
};

export const API = {
  prefix: '/api/v1'
};
