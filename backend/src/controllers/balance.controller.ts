import { Request, Response } from "express";
import * as balanceService from "../services/balance.service";

export const getBalance = async (req: Request, res: Response) => {
  try {
    const balance = await balanceService.getBalance();
    res.json(balance.amount);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener fondos abiertos", error });
  }
};
