import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';

export function register(req: Request, res: Response): void {
	const { firstname, lastname, email, password } = req.body;

	if (email === undefined) res.status(400).send({ msg: 'Email is required' });
	if (password === undefined) res.status(400).send({ msg: 'Pass is required' });

	const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(password as string, salt);

	const user = new User({
		firstname,
		lastname,
		email: email.toLowerCase(),
		password: hashPassword,
		role: 'user',
		active: false,
	});

	try {
		const userStorage = user.save();
		res.status(200).send(userStorage);
	} catch (error) {
		res.status(400).send({ msg: 'User already exists' });
	}
}
