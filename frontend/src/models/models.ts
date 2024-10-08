export interface Fund {
  _id: string;
  name: string;
  type: "FPV" | "FIC";
  minAmount: number;
}

export interface OpenFund {
  _id: string;
  fund: Fund;
  amountInvested: number;
}

export interface Transaction {
  _id: string;
  fund: Fund;
  amount: number;
  type: "subscription" | "cancellation";
  date: string;
}
