import express from 'express';
const router = express.Router();

import * as userController from '../../controllers/api/userController.js';
import { verifyToken } from '../../services/auth.js';
import { isAdministrator } from '../../filters/permissions.js';

router.use([verifyToken, isAdministrator]);

router.post('/create', userController.create);

export default router;