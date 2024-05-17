import Project from '../models/project';

import { getFilePath } from '../utils/image';

import { type Response } from 'express';
import { type AuthRequest } from '../types/Request';

export async function createProject(req: AuthRequest, res: Response): Promise<void> {
	const project = new Project(req.body);
	project.created_at = new Date();

	if (req.file !== undefined) {
		const filePath = getFilePath(req.file);
		project.miniature = filePath;
	}

	const response = await project.save();

	if (response === null) res.status(404).send({ success: false, msg: 'Users not created' });
	else res.status(200).send({ success: true, msg: 'Usuario creado con exito' });
}
