import express from 'express';
import * as AuthController from '../controllers/auth';

const router = express.Router();

router.post('/auth/register', AuthController.register);

export default router;
