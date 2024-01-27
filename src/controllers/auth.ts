import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';

export async function register(req: Request, res: Response): Promise<void> {
	const { firstname, lastname, email, password } = req.body;

	if (email === undefined) res.status(400).send({ msg: 'El email es obligatorio' });
	if (password === undefined) res.status(400).send({ msg: 'La contraseña es obligatoria' });

	const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(password, salt);

	const user = new User({
		firstname,
		lastname,
		email: email.toLowerCase(),
		password: hashPassword,
		role: 'user',
		active: false,
	});

	try {
		const userStorage = await user.save();
		res.status(200).send(userStorage);
	} catch (error) {
		res.status(400).send({ msg: 'El usuario ya existe' });
	}
}
