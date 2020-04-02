import express from 'express';
const router = express.Router();

import * as companyController from '../../controllers/api/companyController.js';
import { verifyToken } from '../../services/auth.js';
import { isAdministrator } from '../../filters/permissions.js';

router.use([verifyToken, isAdministrator]);

router.get('/', companyController.getCompanies);
router.post('/create', companyController.create);
router.post('/:companyUuid/update', companyController.update);

export default router;