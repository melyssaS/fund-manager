import { Request, Response } from "express";
import OpenFund from "../schemas/open-fund.schema";

export const getOpenFunds = async (req: Request, res: Response) => {
  try {
    const openFunds = await OpenFund.find().populate("fund");
    res.json(openFunds);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener fondos abiertos", error });
  }
};
