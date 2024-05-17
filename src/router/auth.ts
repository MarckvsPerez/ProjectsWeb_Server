import express, {
	type NextFunction,
	type Response,
	type Request,
} from 'express';

import * as AuthController from '../controllers/auth';
import * as md_fields from '../middlewares/fields';

import * as authFields from '../validations/AuthFields';

const router = express.Router();

router.post(
	'/register',
	[md_fields.validateFields(authFields.registerFields)],
	(req: Request, res: Response, next: NextFunction) => {
		AuthController.register(req, res).catch(next);
	},
);

router.post(
	'/login',
	[md_fields.validateFields(authFields.loginFields)],
	(req: Request, res: Response, next: NextFunction) => {
		AuthController.login(req, res).catch(next);
	},
);

router.post(
	'/refresh',
	[md_fields.validateFields(authFields.refreshFields)],
	(req: Request, res: Response, next: NextFunction) => {
		AuthController.refreshAccessToken(req, res).catch(next);
	},
);

export default router;
