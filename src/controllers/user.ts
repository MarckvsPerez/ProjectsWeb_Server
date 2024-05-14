import { type Response } from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
import User from '../models/user';

import { type AuthRequest } from '../types/Request';
import { getFilePath } from '../utils/image';
import { type IUser } from '../types/IUser';

export async function getMe(req: AuthRequest, res: Response): Promise<void> {
	if (req.user !== undefined) {
		const { id } = req.user;

		try {
			const response = await User.findById(id);
			if (response === null) res.status(404).send({ success: false, msg: 'User not found' });
			else res.status(200).send({ success: true, msg: 'ok', response });
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
				res.status(500).send({ success: false, msg: error.message });
			} else {
				res.status(500).send({ success: false, msg: 'ExtendedError interno del servidor' });
			}
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

			if (response === null) res.status(404).send({ success: false, msg: 'Users not found' });
			else res.status(200).send({ success: true, msg: 'ok', response });
		} else {
			const response = await User.find({ active });

			if (response === null) res.status(404).send({ success: false, msg: 'Users not found' });
			else res.status(200).send({ success: true, msg: 'ok', response });
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			res.status(500).send({ success: false, msg: error.message });
		} else {
			res.status(500).send({ success: false, msg: 'ExtendedError interno del servidor' });
		}
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
		const response = await user.save();

		if (response === null) res.status(404).send({ success: false, msg: 'Users not created' });
		else res.status(200).send({ success: true, msg: 'Usuario creado con exito' });
	} catch (error) {
		if (req.file !== undefined) {
			const filePath = getFilePath(req.file);
			const fullPath = 'src/uploads/' + filePath;
			if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
		}
		if (error instanceof Error) {
			console.error(error.message);
			res.status(500).send({ success: false, msg: error.message });
		} else {
			res.status(500).send({ success: false, msg: 'ExtendedError interno del servidor' });
		}
	}
}

export async function updateUser(req: AuthRequest, res: Response): Promise<void> {
	const { id } = req.params;
	const userData: IUser = req.body;

	try {
		if (typeof userData.password === 'string') {
			const salt = bcrypt.genSaltSync(10);
			const hashPassword = bcrypt.hashSync(userData.password, salt);
			userData.password = hashPassword;
		}

		if (req.file !== undefined) {
			const user = await User.findById({ _id: id });

			if (user !== null) {
				const fullOldPath = 'src/uploads/' + user.avatar;
				if (fs.existsSync(fullOldPath)) fs.unlinkSync(fullOldPath);

				const filePath = getFilePath(req.file);
				userData.avatar = filePath;
			} else {
				const filePath = getFilePath(req.file);
				const fullPath = 'src/uploads/' + filePath;
				if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
			}
		}

		const response = await User.findByIdAndUpdate({ _id: id }, userData);

		if (response === null) res.status(404).send({ success: false, msg: 'User not found' });
		else res.status(200).send({ success: true, msg: 'User updated succesfully' });
	} catch (error) {
		if (req.file !== undefined) {
			const filePath = getFilePath(req.file);
			const fullPath = 'src/uploads/' + filePath;
			if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
		}

		if (error instanceof Error) {
			console.error(error.message);
			res.status(500).send({ success: false, msg: error.message });
		} else {
			res.status(500).send({ success: false, msg: 'ExtendedError interno del servidor' });
		}
	}
}
