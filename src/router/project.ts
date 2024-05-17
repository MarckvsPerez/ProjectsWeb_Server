import express, { type Request, type Response, type NextFunction } from 'express';

import * as ProjectController from '../controllers/projects';
import * as md_auth from '../middlewares/authenticated';
import * as md_upload from '../middlewares/upload';

const router = express.Router();

router.post(
	'/',
	[md_auth.asureAuth, md_upload.upload.single('miniature')],
	(req: Request, res: Response, next: NextFunction) => {
		ProjectController.createProject(req, res).catch(next);
	},
);

export default router;
