import express from 'express';
const router = express.Router();

import companyApiRouter from './company.js';
import timezoneApiRouter from './timezone.js';
import accountApiRouter from './account.js';
import userApiRouter from './user.js';
import appointmentApiRouter from './appointment.js';

router.use('/company', companyApiRouter);
router.use('/timezone', timezoneApiRouter);
router.use('/account', accountApiRouter);
router.use('/user', userApiRouter);
router.use('/appointment', appointmentApiRouter);

export default router;