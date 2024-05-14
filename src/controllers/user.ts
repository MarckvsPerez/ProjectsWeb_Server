import { type Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';

import { type AuthRequest } from '../types/Request';
import { getFilePath } from '../utils/image';

export async function getMe(req: AuthRequest, res: Response): Promise<void> {
	if (req.user !== undefined) {
		const { id } = req.user;

		try {
			const response = await User.findById(id);
			if (response === null) res.status(400).send({ success: false, msg: 'User not found' });
			res.status(200).send({ success: true, msg: 'ok', response });
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
				res.status(500).send({ success: false, msg: error.message });
			}
			res.status(500).send({ success: false, msg: 'Unknown error' });
		}
	} else {
		res.status(400).send({ success: false, msg: "Server error: User don't send" });
	}
}

export async function getUsers(req: AuthRequest, res: Response): Promise<void> {
	const { active } = req.query;

	try {
		if (active === undefined) {
			const response = await User.find();
			res.status(200).send({ msg: 'Ok', data: response });
		} else {
			const response = await User.find({ active });
			res.status(200).send({ msg: 'Ok', data: response });
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(500).send({ success: false, msg: error.message });
		}
		res.status(500).send({ success: false, msg: 'Unknown error' });
	}
}

export async function createUser(req: AuthRequest, res: Response): Promise<void> {
	const { password } = req.body;

	const user = new User({ ...req.body, active: false });
	const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(password as string, salt);

	try {
		user.password = hashPassword;
		if (req.file !== undefined) {
			const filePath = getFilePath(req.file);
			user.avatar = filePath;
		}
		await user.save();
		res.status(200).send({ success: true, msg: 'Usuario creado con exito' });
	} catch (error: any) {
		if (error.code === 11000) {
			res.status(400).send({ success: false, msg: 'El usuario ya existe' });
		} else {
			console.error('Error while saving user:', error);
			res.status(500).send({ success: false, msg: 'Error interno del servidor' });
		}
	}
}
