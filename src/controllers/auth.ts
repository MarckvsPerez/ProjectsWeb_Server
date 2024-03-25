import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';

export async function register(req: Request, res: Response): Promise<void> {
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
		await user.save();
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
