import express from 'express';
const router = express.Router();

import * as adminDashboardController from '../controllers/adminDashboardController.js';
import { verifyToken } from '../services/auth.js';
import { isAdministrator } from '../filters/permissions.js';

router.get('/', [verifyToken, isAdministrator], adminDashboardController.index);

export default router;
