import mongoose from 'mongoose';
import { IBalance } from '../models/balance.model';

const BalanceSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    updateAt: { type: Date, default: Date.now },

});

export default mongoose.model<IBalance>('Balance', BalanceSchema);