import { Router } from 'express';
import fundRoutes from './funds.routes';
import openFunds from './open-funds.routes'
import transactions from './transaction.routes'
import balance from './balance.routes'

const router = Router();

router.use('/funds', fundRoutes);
router.use('/open-funds', openFunds);
router.use('/transacctions', transactions);
router.use('/balance', balance);


export default router;