import express from 'express';
import * as AuthController from '../controllers/auth';

const router = express.Router();

router.post('/register', (req, res, next) => {
	AuthController.register(req, res).catch(next);
});
router.post('/login', (req, res, next) => {
	AuthController.login(req, res).catch(next);
});
router.post('/refresh', (req, res, next) => {
	AuthController.refreshAccessToken(req, res).catch(next);
});

export default router;
