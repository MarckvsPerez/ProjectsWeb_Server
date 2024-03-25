import express from 'express';
import * as UserControlelr from '../controllers/user';

const router = express.Router();

router.get('/getme', (req, res, next) => {
	UserControlelr.getMe(req, res).catch(next);
});

export default router;
