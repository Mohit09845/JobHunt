import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { applyJob, getApplicants, getappliedjob, updateStatus } from '../controller/application.controller.js';

const router = express.Router();

router.use(isAuthenticated);

router.route('/apply/:id').post(applyJob);
router.route('/get').get(getappliedjob);
router.route('/:id/applicants').get(getApplicants);
router.route('/status/:id/update').put(updateStatus);

export default router;