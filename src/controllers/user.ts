import { type Response } from 'express';
import { type AuthRequest } from '../types/Request';
import User from '../models/user';

export async function getMe(req: AuthRequest, res: Response): Promise<void> {
	if (req.user !== undefined) {
		const { id } = req.user;

		const response = await User.findById(id);
		if (response === null) res.status(400).send({ msg: 'User not found' });
		res.status(200).send({ msg: 'ok', response });
	} else {
		res.status(400).send({ msg: "Server error: User don't send" });
	}
}
