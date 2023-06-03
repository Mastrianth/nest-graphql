import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET = 'your-secret-key';

  generateToken(userId: string): string {
    const payload = { userId };
    return sign(payload, this.JWT_SECRET, { expiresIn: '1h' });
  }

  verifyToken(token: string): { userId: string } {
    return verify(token, this.JWT_SECRET) as { userId: string };
  }
}
