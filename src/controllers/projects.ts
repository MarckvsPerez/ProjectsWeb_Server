import fs from 'fs';

import Project from '../models/project';

import { getFilePath } from '../utils/image';

import { type Response } from 'express';
import { type AuthRequest } from '../types/Request';

export async function createProject(
	req: AuthRequest,
	res: Response,
): Promise<void> {
	const project = new Project(req.body);
	project.created_at = new Date();

	if (req.file !== undefined) {
		const filePath = getFilePath(req.file);
		project.miniature = filePath;
	}

	try {
		const response = await project.save();
		if (response === null) {
			res.status(404).send({ success: false, msg: 'Project creation failed' });
		} else {
			res.status(200).send({
				success: true,
				msg: 'Project created succesfully',
				data: response,
			});
		}
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

export async function getProjects(
	req: AuthRequest,
	res: Response,
): Promise<void> {
	const {
		page = 1,
		limit = 100,
		stack,
	} = req.query as {
		page?: string;
		limit?: string;
		stack?: string;
	};

	const query: { stack?: { $in: string[] } } = {};

	if (stack !== undefined) {
		const stackArray = stack.split(',');
		query.stack = { $in: stackArray };
	}

	const options = {
		query,
		page: parseInt(String(page)),
		limit: parseInt(String(limit)),
		sort: { created_at: 'desc' },
	};

	try {
		const projectsSorted = await Project.paginate(options);
		res.status(200).send({
			success: true,
			msg: 'Data retrieved successfully',
			data: projectsSorted,
		});
	} catch (error) {
		res
			.status(400)
			.send({ success: false, msg: 'Error al obtener los ejercicios' });
	}
}
