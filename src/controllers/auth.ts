import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { createAccesToken, createRefreshToken } from '../utils/jwt';
import { type IRegisteredUser } from '../types/IUser';

export function register(req: Request, res: Response): void {
	const { firstname, lastname, email, password } = req.body;

	if (email === undefined) {
		res.status(400).send({ msg: 'Email is required' });
		return;
	}
	if (password === undefined) {
		res.status(400).send({ msg: 'Pass is required' });
		return;
	}

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
		void user.save();
		res.status(200).send(user);
	} catch (error: any) {
		if (error.code === 11000) {
			res.status(400).send({ msg: 'El usuario ya existe' });
		} else {
			console.error('Error while saving user:', error);
			res.status(500).send({ msg: 'Error interno del servidor' });
		}
	}
}

export function login(req: Request, res: Response): void {
	const { email, password }: { email: string; password: string } = req.body;

	if (email === undefined) {
		res.status(400).send({ msg: 'Email is required' });
		return;
	}
	if (password === undefined) {
		res.status(400).send({ msg: 'Pass is required' });
	}

	const emailLowerCase = email.toLowerCase();

	try {
		void handleLogin(emailLowerCase, password, res);
	} catch (error) {
		res.status(500).send({ msg: 'Error del servidor' });
	}
}

async function handleLogin(email: string, password: string, res: Response): Promise<void> {
	const userStore: IRegisteredUser | null = await User.findOne({ email });

	if (userStore === null) {
		res.status(400).send({ msg: 'Usuario no encontrado' });
		return;
	}

	const check = await bcrypt.compare(password, userStore.password);
	if (!check) {
		res.status(401).send({ msg: 'Contraseña incorrecta' });
		return;
	}

	if (!userStore.active) {
		res.status(402).send({ msg: 'Usuario no activo' });
		return;
	}

	res.status(200).send({ msg: 'Ok', access: createAccesToken(userStore), refresh: createRefreshToken(userStore) });
}
