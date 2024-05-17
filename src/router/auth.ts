import express, { type NextFunction, type Response, type Request } from 'express';

import * as AuthController from '../controllers/auth';
import * as md_fields from '../middlewares/fields';

import { registerFields } from '../validations/AuthFields';

const router = express.Router();

router.post(
	'/register',
	[md_fields.validateFields(registerFields)],
	(req: Request, res: Response, next: NextFunction) => {
		AuthController.register(req, res).catch(next);
	},
);

router.post('/login', (req, res, next) => {
	AuthController.login(req, res).catch(next);
});

router.post('/refresh', (req, res, next) => {
	AuthController.refreshAccessToken(req, res).catch(next);
});

export default router;
