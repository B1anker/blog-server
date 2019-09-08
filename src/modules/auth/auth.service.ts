import * as bcrypt from 'bcrypt';
import * as NodeRSA from 'node-rsa';

import { AUTH } from '@/app.config';
import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SecretsService } from '../secrets/secrets.service';
import { Users } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwtPayload';

const SALT_WORK_FACTOR: number = 10;

@Injectable()
export class AuthService {
  private rsa: NodeRSA;
  private privateKey: string;
  private publicKey: string;
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => SecretsService))
    private readonly secretsService: SecretsService,
    private readonly jwt: JwtService
  ) {
    this.rsa = new NodeRSA({
      b: 1024
    });
    this.rsa.setOptions({
      encryptionScheme: 'pkcs1'
    });
    this.rsa.importKey(AUTH.publicKey);
    this.rsa.importKey(AUTH.privateKey);
    this.publicKey = AUTH.publicKey;
    this.privateKey = AUTH.privateKey;
  }

  public getPrivateKey(): string {
    return this.privateKey;
  }

  public getPublicKey(): string {
    return this.publicKey;
  }

  public async verify(account: string, password: string): Promise<boolean> {
    const decryptedRSAPassword: string = this.decryptRSA(password);
    const user: Users = await this.userService.find(account);
    return await this.compare(decryptedRSAPassword, user.password);
  }

  public createJwt(user: JwtPayload): string {
    return this.jwt.sign(user);
  }

  public decodeJwt(jwt: string) {
    return this.jwt.decode(jwt);
  }

  public verifyJwt(jwt: string) {
    return this.jwt.verify(jwt);
  }

  public encrypt(password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
          return reject(err);
        }
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) {
            return reject(error);
          }
          resolve(hash);
        });
      });
    });
  }

  public encryptRSA(password: string): string {
    const encrypted = this.rsa.encrypt(password, 'base64');
    return encrypted;
  }

  public decryptRSA(encryptedRSAPassword: string): string {
    const decrypted = this.rsa.decrypt(encryptedRSAPassword, 'utf8');
    return decrypted;
  }

  public async validateBearer(token: string) {
    const bearerToken = await this.secretsService.getSecret('BEARER_TOKEN');
    if (!bearerToken) {
      throw new UnauthorizedException({
        message: `Has no token`
      });
    }
    try {
      return this.compare(token, bearerToken.value);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private compare(
    password: string,
    encryptedPassword: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, encryptedPassword, (err, isMatch) => {
        if (!err) {
          resolve(isMatch);
        } else {
          reject(err);
        }
      });
    });
  }
}
