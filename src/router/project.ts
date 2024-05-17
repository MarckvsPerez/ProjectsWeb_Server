import express, { type Request, type Response, type NextFunction } from 'express';

import * as md_auth from '../middlewares/authenticated';
import * as md_upload from '../middlewares/upload';
import * as md_fields from '../middlewares/fields';

import * as projectsFields from '../validations/ProjectsFields';
import * as ProjectController from '../controllers/projects';

const router = express.Router();

router.post(
	'/',
	[
		md_auth.asureAuth,
		md_upload.uploadMiniature.single('miniature'),
		md_fields.validateFields(projectsFields.createFields),
	],
	(req: Request, res: Response, next: NextFunction) => {
		ProjectController.createProject(req, res).catch(next);
	},
);

export default router;
