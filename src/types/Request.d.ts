import { type JwtPayload } from 'jsonwebtoken';
import { type Request } from 'express';

interface AuthRequest extends Request {
	user?: JwtPayload;
}
