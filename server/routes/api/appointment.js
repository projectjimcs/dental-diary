import express from 'express';
const router = express.Router();

import * as appointmentController from '../../controllers/api/appointmentController.js';
import { verifyToken } from '../../services/auth.js';

router.use([verifyToken]);

router.get('/', appointmentController.getAllAppointments);
// router.post('/create', companyController.create);
// router.post('/:companyUuid/update', companyController.update);

export default router;