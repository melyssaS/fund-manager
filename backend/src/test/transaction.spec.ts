import { Request, Response, NextFunction } from "express";
import {
  subscribeToFund,
  cancelSubscription,
  getTransactions,
} from "../controllers/transaction.controller";
import Fund from "../schemas/fund.schema";
import Transaction from "../schemas/transaction.schema";
import { CustomError } from "../utils/CustomError";
import * as openFundService from "../services/open-fund.service";
import * as transacctionService from "../services/transaction.service";
import * as balanceService from "../services/balance.service";
import * as transacctionModel from "../models/transaction.model";

jest.mock("../schemas/fund.schema");
jest.mock("../schemas/transaction.schema");
jest.mock("../services/open-fund.service");
jest.mock("../services/transaction.service");
jest.mock("../services/balance.service");

describe("Fund Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { body: {} };
    res = { json: jest.fn() };
    next = jest.fn();
  });

  describe("subscribeToFund", () => {
    it("should subscribe to a fund successfully", async () => {
      req.body = { fundId: "fund123", amount: 1000 };

      (Fund.findById as jest.Mock).mockResolvedValue({
        id: "fund123",
        name: "Test Fund",
      });
      (openFundService.addOpenFund as jest.Mock).mockResolvedValue({
        id: "openFund123",
        amountInvested: 1000,
      });
      (transacctionService.addTransaction as jest.Mock).mockResolvedValue({
        id: "transaction123",
        amount: 1000,
      });
      (balanceService.decreaseBalance as jest.Mock).mockResolvedValue({
        amount: 5000,
      });

      await subscribeToFund(
        req as transacctionModel.SubscribeRequestBody,
        res as Response,
        next
      );

      expect(Fund.findById).toHaveBeenCalledWith("fund123");
      expect(openFundService.addOpenFund).toHaveBeenCalledWith({
        fund: "fund123",
        name: "Test Fund",
        amountInvested: 1000,
      });
      expect(transacctionService.addTransaction).toHaveBeenCalledWith({
        fund: "fund123",
        amount: 1000,
        type: transacctionModel.TransactionType.SUBSCRIPTION,
      });
      expect(balanceService.decreaseBalance).toHaveBeenCalledWith(1000);
      expect(res.json).toHaveBeenCalledWith({
        transaction: { id: "transaction123", amount: 1000 },
        openFund: { id: "openFund123", amountInvested: 1000 },
        balance: 5000,
      });
    });

    it("should return an error if fund is not found", async () => {
      req.body = { fundId: "invalidFund", amount: 1000 };
      (Fund.findById as jest.Mock).mockResolvedValue(null);

      await subscribeToFund(
        req as transacctionModel.SubscribeRequestBody,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(
        new CustomError("Fondo no encontrado", 404)
      );
    });
  });

  describe("cancelSubscription", () => {
    it("should cancel a fund subscription successfully", async () => {
      req.body = { fundId: "fund123" };

      (Fund.findById as jest.Mock).mockResolvedValue({
        id: "fund123",
        name: "Test Fund",
      });
      (openFundService.removeOpenFund as jest.Mock).mockResolvedValue({
        id: "openFund123",
        amountInvested: 1000,
      });
      (transacctionService.addTransaction as jest.Mock).mockResolvedValue({
        id: "transaction456",
        amount: 1000,
      });
      (balanceService.increaseBalance as jest.Mock).mockResolvedValue({
        amount: 6000,
      });
      (openFundService.allOpenFunds as jest.Mock).mockResolvedValue([
        { id: "openFund123" },
      ]);

      await cancelSubscription(
        req as transacctionModel.CancelRequestBody,
        res as Response,
        next
      );

      expect(Fund.findById).toHaveBeenCalledWith("fund123");
      expect(openFundService.removeOpenFund).toHaveBeenCalledWith("fund123");
      expect(transacctionService.addTransaction).toHaveBeenCalledWith({
        fund: "fund123",
        amount: 1000,
        type: transacctionModel.TransactionType.CANCELLATION,
      });
      expect(balanceService.increaseBalance).toHaveBeenCalledWith(1000);
      expect(res.json).toHaveBeenCalledWith({
        transaction: { id: "transaction456", amount: 1000 },
        openFunds: [{ id: "openFund123" }],
        balance: 6000,
      });
    });

    it("should return an error if open fund is not found", async () => {
      req.body = { fundId: "fund123" };
      (Fund.findById as jest.Mock).mockResolvedValue({
        id: "fund123",
        name: "Test Fund",
      });
      (openFundService.removeOpenFund as jest.Mock).mockResolvedValue(null);

      await cancelSubscription(
        req as transacctionModel.CancelRequestBody,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(
        new CustomError("Fondo no encontrado", 404)
      );
    });
  });

  describe("getTransactions", () => {
    it("should return a list of transactions", async () => {
      const mockTransactions = [
        { id: "transaction123", fund: { name: "Test Fund" }, amount: 1000 },
      ];

      (Transaction.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockTransactions),
      });

      await getTransactions(req as Request, res as Response);

      expect(Transaction.find).toHaveBeenCalledWith();
      expect(res.json).toHaveBeenCalledWith(mockTransactions);
    });
  });
});
