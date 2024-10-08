import { ITransaction } from "../models/transaction.model";
import Transaction from "../schemas/transaction.schema";
import { CustomError } from "../utils/CustomError";

export const addTransaction = async (
  transaction: Partial<ITransaction>
): Promise<ITransaction> => {
  const newTransaction = new Transaction(transaction);
  return await (await newTransaction.save()).populate("fund");
};
