import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';
import {
	createAccesToken,
	createRefreshToken,
	decodeToken,
} from '../utils/jwt';

import { type IRegisteredUser } from '../types/IUser';

export async function register(req: Request, res: Response): Promise<void> {
	const { firstname, lastname, email, password } = req.body;

	const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(password as string, salt);

	try {
		const user = new User({
			firstName: firstname,
			lastName: lastname,
			email: email.toLowerCase(),
			password: hashPassword,
			role: 'user',
			active: false,
		});
		const response = await user.save();

		if (response === null)
			res.status(404).send({ success: false, msg: 'User not created' });
		else
			res.status(200).send({
				success: true,
				msg: 'User created succesfully',
				data: response,
			});
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(500).send({ success: false, msg: error.message });
		} else {
			res.status(500).send({ success: false, msg: 'Internal server error' });
		}
	}
}

export async function login(req: Request, res: Response): Promise<void> {
	const { email, password }: { email: string; password: string } = req.body;

	if (email === undefined) {
		res.status(400).send({ success: false, msg: 'Email is required' });
		return;
	}
	if (password === undefined) {
		res.status(400).send({ success: false, msg: 'Pass is required' });
	}

	const emailLowerCase = email.toLowerCase();

	try {
		const userStore: IRegisteredUser | null = await User.findOne({
			email: emailLowerCase,
		});

		if (userStore === null) {
			res.status(404).send({ success: false, msg: 'Usuario no encontrado' });
			return;
		}

		const check = await bcrypt.compare(password, userStore.password);
		if (!check) {
			res.status(401).send({ success: false, msg: 'Contraseña incorrecta' });
			return;
		}

		if (!userStore.active) {
			res.status(402).send({ success: false, msg: 'Usuario no activo' });
			return;
		}

		res.status(200).send({
			success: true,
			msg: 'Ok',
			access: createAccesToken(userStore),
			refresh: createRefreshToken(userStore),
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(500).send({ success: false, msg: error.message });
		} else {
			res
				.status(500)
				.send({ success: false, msg: 'ExtendedError interno del servidor' });
		}
	}
}

export async function refreshAccessToken(
	req: Request,
	res: Response,
): Promise<void> {
	const { token }: { token: string | null } = req.body;

	if (token !== null) {
		const decodedToken = decodeToken(token);

		if (decodedToken !== null && typeof decodedToken === 'object') {
			const id: string = decodedToken.id;
			try {
				const userStore: IRegisteredUser | null = await User.findOne({
					_id: id,
				});

				if (userStore === null)
					res
						.status(400)
						.send({ success: false, msg: 'Usuario no encontrado' });
				else
					res.status(200).send({
						success: true,
						msg: 'Ok',
						accessToken: createAccesToken(userStore),
					});
			} catch (error) {
				if (error instanceof Error) {
					console.error(error.message);
					res.status(500).send({ success: false, msg: error.message });
				} else {
					res.status(500).send({
						success: false,
						msg: 'ExtendedError interno del servidor',
					});
				}
			}
		}
	} else {
		res.status(400).send({ success: false, msg: 'Token requerido' });
	}
}
