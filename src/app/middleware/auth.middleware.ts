import { SECRET } from '../../infrastructure/constants/constants';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const decoded = jwt.verify(req.headers.authorization, SECRET);

    req.headers.user = decoded.id;
    next();
  }
}
