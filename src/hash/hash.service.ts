import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashService {
  createHash(string: string): Promise<string> {
    const salt = 10;
    return hash(string, salt);
  }

  async compareHash(compareString: string, hash: string): Promise<boolean> {
    return compare(compareString, hash);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const newHashedPassword = await this.createHash(password);
    return hashedPassword === newHashedPassword;
  }
}
