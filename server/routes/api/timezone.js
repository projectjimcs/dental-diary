import express from 'express';
const router = express.Router();

// Need to add permissions for this api after
import * as timezoneController from '../../controllers/api/timezoneController.js';

router.get('/', timezoneController.getTimezones);

export default router;