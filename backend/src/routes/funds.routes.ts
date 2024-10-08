import { Router } from 'express';
import { allFunds } from '../controllers/fund.controller';

const router = Router();

router.get('/all', allFunds);

export default router;