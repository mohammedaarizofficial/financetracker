import { checkUser, getUsers, dashboardData} from '../controllers/users.controller.js';
import express from 'express';
import { verifytoken } from '../middleware/verifytoken.js';
const router = express.Router();

/* GET users listing. */
router.get('/', getUsers);
router.post('/login', checkUser);
router.get('/dashboard-data', verifytoken, dashboardData)
export default router;
