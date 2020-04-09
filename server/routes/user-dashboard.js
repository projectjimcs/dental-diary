import express from 'express';
const router = express.Router();

import * as userDashboardController from '../controllers/userDashboardController.js';
import { verifyToken } from '../services/auth.js';

router.get('/', [verifyToken], userDashboardController.index);

export default router;
