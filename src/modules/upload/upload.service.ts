import { Injectable } from '@nestjs/common';
import * as qiniu from 'qiniu';
import { qiniuConfACCESS_KEY, qiniuConfSECRET_KEY } from '../../../confs/qiniu';

const options = {
  scope: 'cdn-server'
};

@Injectable()
export class UploadService {
  public async getQiniuToken() {
    const mac = new qiniu.auth.digest.Mac(
      qiniuConfACCESS_KEY,
      qiniuConfSECRET_KEY
    );
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
  }
}
