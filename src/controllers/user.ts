import { type Request, type Response } from 'express';

export async function getMe(req: Request, res: Response): Promise<void> {
	console.log(req);

	res.status(200).send({ msg: 'OK' });
}
