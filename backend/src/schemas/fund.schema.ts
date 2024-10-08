import mongoose from 'mongoose';
import { FundType, IFund } from '../models/fund.model';

const FundSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: Object.values(FundType), required: true },
    minAmount: { type: Number, required: true }
});

export default mongoose.model<IFund>('Fund', FundSchema);