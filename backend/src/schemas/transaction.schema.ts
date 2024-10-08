import mongoose from "mongoose";
import { ITransaction, TransactionType } from "../models/transaction.model";

const TransactionSchema = new mongoose.Schema({
  fund: { type: mongoose.Schema.Types.ObjectId, ref: "Fund", required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: Object.values(TransactionType), required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
