import { Document } from "mongoose";

export enum FundType {
  FPV = "FPV",
  FIC = "FIC",
}

export interface IFund extends Document {
  name: string;
  type: FundType;
  minAmount: number;
}
