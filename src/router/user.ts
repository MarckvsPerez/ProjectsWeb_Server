import express, { type Request, type Response, type NextFunction } from 'express';

import * as UserControlelr from '../controllers/user';
import * as md_auth from '../middlewares/authenticated';
import * as md_upload from '../middlewares/upload';

const router = express.Router();

router.get('/getme', [md_auth.asureAuth], (req: Request, res: Response, next: NextFunction) => {
	UserControlelr.getMe(req, res).catch(next);
});

router.get('/users', [md_auth.asureAuth], (req: Request, res: Response, next: NextFunction) => {
	UserControlelr.getUsers(req, res).catch(next);
});

router.post(
	'/users',
	[md_auth.asureAuth, md_upload.uploadAvatar.single('avatar')],
	(req: Request, res: Response, next: NextFunction) => {
		UserControlelr.createUser(req, res).catch(next);
	},
);

router.patch(
	'/users/:id',
	[md_auth.asureAuth, md_upload.uploadAvatar.single('avatar')],
	(req: Request, res: Response, next: NextFunction) => {
		UserControlelr.updateUser(req, res).catch(next);
	},
);

export default router;
