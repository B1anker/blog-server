import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as NodeRSA from 'node-rsa';

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Users } from '../user/user.entity';
import { UsersService } from '../user/user.service';
import { JwtPayload } from './jwtPayload';

const SALT_WORK_FACTOR: number = 10;

@Injectable()
export class AuthService {
  private rsa: NodeRSA;
  private privateKey: string;
  private publicKey: string;
  constructor (
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    private readonly jwt: JwtService) {
    this.rsa = new NodeRSA({b: 1024});
    this.rsa.setOptions({encryptionScheme: 'pkcs1'});
    this.publicKey = this.rsa.exportKey('pkcs8-public');
    this.privateKey = this.rsa.exportKey('pkcs8-private');
    fs.writeFileSync('./private.key', this.privateKey);
    fs.writeFileSync('./public.key', this.publicKey);
  }

  public getPrivateKey (): string {
    return this.privateKey;
  }

  public getPublicKey (): string {
    return this.publicKey;
  }

  public async verify (usernname: string, password: string): Promise<boolean> {
    const decryptedRSAPassword: string = this.decryptRSA(password);
    const user: Users = await this.usersService.find(usernname);
    return await this.compare(decryptedRSAPassword, user.password);
  }

  public createJwt (user: JwtPayload): string {
    return this.jwt.sign(user);
  }

  public decodeJwt (jwt: string) {
    return this.jwt.decode(jwt);
  }

  public verifyJwt (jwt: string) {
    return this.jwt.verify(jwt);
  }

  public encrypt (password: string): Promise<string> {
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

  public encryptRSA (password: string): string {
    const encrypted = this.rsa.encrypt(password, 'base64');
    return encrypted;
  }

  public decryptRSA (encryptedRSAPassword: string): string {
    const decrypted = this.rsa.decrypt(encryptedRSAPassword, 'base64');
    return decrypted;
  }

  private compare (password: string, encryptedPassword: string): Promise<boolean> {
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
