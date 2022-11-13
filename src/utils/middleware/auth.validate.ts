import { SECRET } from '../constats';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';

export function authValidate(token) {
  const decoded = jwt.verify(token, SECRET);

  return decoded;
}
