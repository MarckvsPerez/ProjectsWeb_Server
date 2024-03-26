import dotenv from 'dotenv';
import { sign, verify, type JwtPayload } from 'jsonwebtoken';
import { type IRegisteredUser } from '../types/IUser';

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_ACCES_HOUR = process.env.JWT_ACCES_HOUR;
const JWT_REFRESH_MONTH = process.env.JWT_REFRESH_MONTH;

export function createAccesToken(user: IRegisteredUser): string {
	const expToken = new Date();
	expToken.setHours(expToken.getHours() + Number(JWT_ACCES_HOUR));

	const payload = {
		token_type: 'access',
		id: user._id,
		email: user.email,
		iat: Date.now(),
		exp: expToken.getTime(),
	};
	if (JWT_SECRET_KEY !== undefined) {
		return sign(payload, JWT_SECRET_KEY);
	} else throw new Error('No JWT key available');
}

export function createRefreshToken(user: IRegisteredUser): string {
	const expToken = new Date();
	expToken.setMonth(expToken.getMonth() + Number(JWT_REFRESH_MONTH));

	const payload = {
		token_type: 'refresh',
		id: user._id,
		email: user.email,
		iat: Date.now(),
		exp: expToken.getTime(),
	};
	if (JWT_SECRET_KEY !== undefined) {
		return sign(payload, JWT_SECRET_KEY);
	} else throw new Error('No JWT key available');
}

export function decodeToken(token: string): string | JwtPayload {
	try {
		if (JWT_SECRET_KEY !== undefined) {
			return verify(token, JWT_SECRET_KEY);
		} else {
			throw new Error('No JWT key available');
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error('Error decoding token: ' + error.message);
		} else {
			throw new Error('Unknown error decoding token');
		}
	}
}
