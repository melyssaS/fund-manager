import mongoose, { Document } from "mongoose";

export interface IOpenFund extends Document {
  fund: mongoose.Schema.Types.ObjectId;
  name: string;
  amountInvested: number;
}
