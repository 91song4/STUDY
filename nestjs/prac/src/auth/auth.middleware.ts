import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: any, res: any, next: Function) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('JWT not found');
    }

    // let token: string;
    const token: string = authHeader.split(' ')[1];
    try {
      const payload = await this.jwtService.verify(token);
      // TODO - req, res, authHeader, payload 확인해보기
      req.user = payload;
      next();
    } catch (error) {
      throw new UnauthorizedException(`Invalid JWT: ${token}`);
    }
  }
}
