import express from 'express';
import { getExpenses, postExpenses, deleteExpense, updateExpense } from '../controllers/expense.controller.js';
import { verifytoken } from '../middleware/verifytoken.js';

const router = express.Router();

router.get('/', verifytoken, getExpenses);
router.post('/', verifytoken, postExpenses);
router.delete('/:id', verifytoken, deleteExpense);
router.put('/:id', verifytoken, updateExpense);

export default router;