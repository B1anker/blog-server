import { pathResolve } from '@/utils/path';
import * as fs from 'fs';

export const ENV = process.env.NODE_ENV;
let privateKeyPath = pathResolve('../../confs/private.key');
let publicKeyPath = pathResolve('../../confs/public.key');

if (ENV === 'production') {
  privateKeyPath = '/root/confs/private.key';
  publicKeyPath = '/root/confs/public.key';
}

const getPrivateKey = (): string => {
  try {
    return fs.readFileSync(privateKeyPath).toString();
  } catch (err) {
    return '';
  }
};

const getPublicKey = (): string => {
  try {
    return fs.readFileSync(publicKeyPath).toString();
  } catch (err) {
    return '';
  }
};

export const updateAUTH = () => {
  AUTH.privateKey = getPrivateKey();
  AUTH.publicKey = getPublicKey();
};

export const staticAssetsPath =
  ENV === 'development' ? pathResolve('../../../blog/dist') : '/root/blog/dist';

export const AUTH = {
  expiresIn: 1000 * 60 * 15,
  renew: 300,
  privateKey: getPrivateKey(),
  publicKey: getPublicKey(),
  privateKeyPath,
  publicKeyPath,
  defaultAccount: 'admin',
  defaultPassword: 'admin',
  defaultRoles: ['ADMIN', 'VISITOR']
};

export const API = {
  prefix: '/api/v1'
};
