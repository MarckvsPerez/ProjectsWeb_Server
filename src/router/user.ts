import express, { type Request, type Response, type NextFunction } from 'express';
import multer from 'multer';
import path from 'path';

import * as UserControlelr from '../controllers/user';
import * as md_auth from '../middlewares/authenticated';

const router = express.Router();
const mdUpload = multer({
	dest: 'src/uploads/avatar',
	storage: multer.diskStorage({
		destination: (_req, _file, cb) => {
			cb(null, 'src/uploads/avatar');
		},
		filename: (_req, file, cb) => {
			const ext = path.extname(String(file.originalname));
			cb(null, file.fieldname + '-' + Date.now() + ext);
		},
	}),
});

router.get('/getme', [md_auth.asureAuth], (req: Request, res: Response, next: NextFunction) => {
	UserControlelr.getMe(req, res).catch(next);
});

router.get('/users', [md_auth.asureAuth], (req: Request, res: Response, next: NextFunction) => {
	UserControlelr.getUsers(req, res).catch(next);
});

router.post(
	'/users',
	[md_auth.asureAuth, mdUpload.single('avatar')],
	(req: Request, res: Response, next: NextFunction) => {
		UserControlelr.createUser(req, res).catch(next);
	},
);

export default router;
