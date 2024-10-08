import { Router } from 'express';
import { subscribeToFund, cancelSubscription, getTransactions } from '../controllers/transaction.controller';

const router = Router();

router.post('/subscribe', subscribeToFund);
router.post('/cancel', cancelSubscription);
router.get('/all', getTransactions);

export default router;