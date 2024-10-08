import { NextFunction, Request, Response } from "express";
import Fund from "../schemas/fund.schema";
import Transaction from "../schemas/transaction.schema";
import { CustomError } from "../utils/CustomError";
import * as transacctionModel from "../models/transaction.model";
import * as transacctionService from "../services/transaction.service";
import * as openFundService from "../services/open-fund.service";
import * as balanceService from "../services/balance.service";

export const subscribeToFund = async (
  req: transacctionModel.SubscribeRequestBody,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fundId, amount } = req?.body;

    const fund = await Fund.findById(fundId);

    if (!fund) {
      throw new CustomError("Fondo no encontrado", 404);
    }

    const openFund = await openFundService.addOpenFund({
      fund: fundId,
      name: fund?.name,
      amountInvested: amount,
    });

    const transaction = await transacctionService.addTransaction({
      fund: fundId,
      amount,
      type: transacctionModel.TransactionType.SUBSCRIPTION,
    });

    const balance = await balanceService.decreaseBalance(amount);

    // sendNotification(notificationType, `Suscripción exitosa al fondo ${fund.name}`);
    // transaction.notificationSent = true;
    // await transaction.save();

    res.json({ transaction, openFund, balance: balance?.amount });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (
  req: transacctionModel.CancelRequestBody,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fundId } = req.body;
    const fund = await Fund.findById(fundId);

    if (!fund) {
      throw new CustomError("Fondo no encontrado", 404);
    }

    const openFund = await openFundService.removeOpenFund(fundId.toString());

    if (!openFund) {
      throw new CustomError("Fondo no encontrado", 404);
    }
    const amount = openFund?.amountInvested;

    const transaction = await transacctionService.addTransaction({
      fund: fundId,
      amount,
      type: transacctionModel.TransactionType.CANCELLATION,
    });

    const balance = await balanceService.increaseBalance(amount);
    // sendNotification(notificationType, `Cancelación exitosa del fondo ${fund.name}`);
    // transaction.notificationSent = true;
    // await transaction.save();

    const openFunds = await openFundService.allOpenFunds();

    res.json({ transaction, openFunds, balance: balance?.amount });
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  const transactions = await Transaction.find().populate("fund");
  res.json(transactions);
};
