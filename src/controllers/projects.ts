import fs from 'fs';

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

	try {
		const response = await project.save();
		if (response === null) res.status(404).send({ success: false, msg: 'Project creation failed' });
		else res.status(200).send({ success: true, msg: 'Project created succesfully', data: response });
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
			res.status(500).send({ success: false, msg: 'Internal server error' });
		}
	}
}
