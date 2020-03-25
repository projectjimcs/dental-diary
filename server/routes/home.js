import express from 'express';
const router = express.Router();

import * as homeController from '../controllers/homeController.js';
import * as loginController from '../controllers/loginController.js';

/* GET home page */
router.get('/', homeController.index);

/* Authentication Routes */
router.post('/login', loginController.login);

export default router;
