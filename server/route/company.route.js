import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controller/company.controller.js';

const router = express.Router();

router.use(isAuthenticated);

router.route('/register').post(registerCompany);
router.route('/getcompany').get(getCompany);
router.route('/getcompany/:id').get(getCompanyById);
router.route('/update/:id').put(updateCompany);

export default router;