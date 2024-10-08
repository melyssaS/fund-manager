import mongoose, { Document } from "mongoose";
import { Request } from "express";

export enum TransactionType {
  SUBSCRIPTION = "subscription",
  CANCELLATION = "cancellation",
}

export interface ITransaction extends Document {
  fund: mongoose.Schema.Types.ObjectId;
  amount: number;
  type: TransactionType;
  date: Date;
}

export interface SubscribeRequestBody extends Request {
  body: {
    fundId: mongoose.Schema.Types.ObjectId;
    amount: number;
  };
}

export interface CancelRequestBody extends Request {
  body: {
    fundId: mongoose.Schema.Types.ObjectId;
  };
}
