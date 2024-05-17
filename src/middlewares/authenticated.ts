import { type AuthRequest } from '../types/Request';
import { decodeToken } from '../utils/jwt';
import { type Response, type RequestHandler, type NextFunction } from 'express';

export const asureAuth: RequestHandler = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	if (req.headers.authorization === undefined) {
		res
			.status(403)
			.send({ msg: 'La petición no tiene la cabecera de autenticación' });
	} else {
		const token: string = req.headers.authorization.replace('Bearer ', '');

		try {
			const payload = decodeToken(token);
			if (payload !== null && typeof payload === 'object') {
				const { exp } = payload;
				const currentDate: number = new Date().getTime();

				if (exp !== undefined) {
					if (exp <= currentDate) {
						res.status(400).send({ msg: 'El token ha expirado' });
					} else {
						req.user = payload;
						next();
					}
				}
			}
		} catch (error) {
			res.status(400).send({ msg: 'Token invalido' });
		}
	}
};
