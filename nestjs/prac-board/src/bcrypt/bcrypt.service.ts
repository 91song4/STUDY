import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  constructor(private readonly configService: ConfigService) {}

  async hash(password: string): Promise<string> {
    return bcrypt.hash(
      password,
      Number.parseInt(this.configService.get<string>('BCRYPT_ROUND'), 10),
    );
  }

  hashSync(password: string) {
    return bcrypt.hashSync(
      password,
      Number.parseInt(this.configService.get<string>('BCRYPT_ROUND'), 10),
    );
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
