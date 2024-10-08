import mongoose, { Schema } from "mongoose";
import { IOpenFund } from "../models/open-fund.model";

const OpenFundSchema = new Schema<IOpenFund>({
  fund: { type: mongoose.Schema.Types.ObjectId, ref: "Fund", required: true },
  name: { type: String, required: true },
  amountInvested: { type: Number, required: true, min: 0 },
});

export default mongoose.model<IOpenFund>("OpenFund", OpenFundSchema);
