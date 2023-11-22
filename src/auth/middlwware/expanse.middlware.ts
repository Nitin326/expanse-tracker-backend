import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class ExpanseMiddleware implements NestMiddleware {

  constructor(private readonly authService: AuthService) { }
  use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      try {
        const token = authorizationHeader.substring(7);
        const decodedToken = this.authService.decodeToken(token);

        if (decodedToken && typeof decodedToken === 'object' && 'id' in decodedToken) {
          const userId = decodedToken.id;
          req.body.userId = userId;
        }
      } catch (err) {
        throw new UnauthorizedException('Invalid or Experied Token');
      }
    }
    next();
  }
}