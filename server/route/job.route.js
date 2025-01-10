import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { getAdminjobs, getAllJobs, getJobByid, postJob } from '../controller/job.controller.js';

const router = express.Router();

router.use(isAuthenticated);

router.route('/post').post(postJob);
router.route('/getalljob').get(getAllJobs);
router.route('/getalljob/:id').get(getJobByid);
router.route('/getadminjob').get(getAdminjobs);

export default router;