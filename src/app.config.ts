import * as fs from 'fs';
import * as path from 'path';

const AUTH = {
  expiresIn: 3600,
  privateKey: fs.readFileSync(path.resolve(__dirname, '../private.key')).toString()
};

export default {
  AUTH
};
