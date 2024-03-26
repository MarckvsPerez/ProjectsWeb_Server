import express from 'express';
import * as UserControlelr from '../controllers/user';
import * as md_auth from '../middlewares/authenticated';
import { type Request, type Response, type NextFunction } from 'express';

const router = express.Router();

router.get('/getme', [md_auth.asureAuth], (req: Request, res: Response, next: NextFunction) => {
	UserControlelr.getMe(req, res).catch(next);
});

export default router;
