import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: any, res: any, next: Function) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('권한이 없습니다!');
    }

    let token: string;

    try {
      token = authHeader.split(' ')[1];
      const payload = await this.jwtService.verify(token);
      req.user = payload;
      next();
    } catch (err) {
      throw new UnauthorizedException('인증기한이 만료 되었습니다.');
    }
  }
}
