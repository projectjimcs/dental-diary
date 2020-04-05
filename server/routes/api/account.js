import express from 'express';
const router = express.Router();

import * as accountController from '../../controllers/api/accountController.js';
import { verifyToken } from '../../services/auth.js';
import { isAdministrator } from '../../filters/permissions.js';

router.use([verifyToken, isAdministrator]);

router.get('/types', accountController.getAccountTypes);
router.get('/roles', accountController.getRoles);

export default router;