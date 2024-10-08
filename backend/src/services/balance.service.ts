import { IBalance } from "../models/balance.model";
import Balance from "../schemas/balance.schema";

export const getBalance = async (): Promise<IBalance> => {
  const balance = await Balance.findOne();
  if (!balance) {
    throw new Error("No hay balance.");
  }
  return balance;
};

export const increaseBalance = async (
  amount: number
): Promise<IBalance | null> => {
  const updatedBalance = await Balance.findOneAndUpdate(
    {},
    { $inc: { amount: amount } },
    { new: true }
  );

  return updatedBalance;
};

export const decreaseBalance = async (
  amount: number
): Promise<IBalance | null> => {
  const currentBalance = await getBalance();

  if (currentBalance && currentBalance.amount < amount) {
    throw new Error("Balance insuficiente para realizar la operación.");
  }

  const updatedBalance = await Balance.findOneAndUpdate(
    {},
    { $inc: { amount: -amount } },
    { new: true }
  );

  return updatedBalance;
};
