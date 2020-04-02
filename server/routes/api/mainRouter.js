import express from 'express';
const router = express.Router();

import companyApiRouter from './company.js';
import timezoneApiRouter from './timezone.js';

router.use('/company', companyApiRouter);
router.use('/timezone', timezoneApiRouter);

export default router;