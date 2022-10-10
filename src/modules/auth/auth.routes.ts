import express, { Router } from 'express';
import { AuthController } from './auth.controller';

const router: Router = express.Router();

router.post('/register', AuthController.registerHandler);
export default router;
