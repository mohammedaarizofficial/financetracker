import express from 'express';
import { getIncome, postIncome,deleteIncome,updateIncome } from '../controllers/income.controller.js';
import { verifytoken } from '../middleware/verifytoken.js';

const router = express.Router();

router.get('/', verifytoken, getIncome);
router.post('/', verifytoken, postIncome);
router.delete('/:id', verifytoken, deleteIncome)
router.put('/:id', verifytoken, updateIncome);

export default router;