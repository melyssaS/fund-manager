import { Router } from 'express';
import { getOpenFunds } from '../controllers/open-funds.controller';

const router = Router();

router.get('/all', getOpenFunds);

export default router;