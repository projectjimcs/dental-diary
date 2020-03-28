import express from 'express';
const router = express.Router();

import * as companyController from '../../controllers/companyController.js';
import { verifyToken } from '../../services/auth.js';
import { isAdministrator } from '../../filters/permissions.js';

router.post('/create', [verifyToken, isAdministrator], companyController.create);

export default router;