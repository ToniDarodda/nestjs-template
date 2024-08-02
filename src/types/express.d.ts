import { JwtPayload } from 'src/types/auth';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}
