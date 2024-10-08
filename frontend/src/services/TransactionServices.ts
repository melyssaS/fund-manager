import axios from "./axios";
import { AxiosResponse } from "axios";
import { OpenFund, Transaction } from "../models/models";

export const getTransactions = async (): Promise<
  AxiosResponse<Transaction[]>
> => await axios.get("/transacctions/all");

export const subscribe = async (
  fundId: string,
  amount: number
): Promise<
  AxiosResponse<{
    transaction: Transaction;
    openFund: OpenFund;
    balance: number;
  }>
> => await axios.post("/transacctions/subscribe", { fundId, amount });

export const cancel = async (
  fundId: string
): Promise<
  AxiosResponse<{
    transaction: Transaction;
    openFunds: OpenFund[];
    balance: number;
  }>
> => await axios.post("/transacctions/cancel", { fundId });
