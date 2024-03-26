import { type Request, type Response } from 'express';

export async function getMe(_req: Request, res: Response): Promise<void> {
	res.status(200).send({ msg: 'OK' });
}
