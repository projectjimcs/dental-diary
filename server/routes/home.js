import express from 'express';
const router = express.Router();

import * as homeController from '../controllers/homeController.js';

/* GET home page. */
router.get('/', homeController.index);

export default router;
