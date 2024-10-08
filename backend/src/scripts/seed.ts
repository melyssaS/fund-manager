import mongoose from "mongoose";
import "../database";
import Fund from "../schemas/fund.schema";
import Transaction from "../schemas/transaction.schema";
import Balance from "../schemas/balance.schema";
import { FundType } from "../models/fund.model";
import OpenFund from "../schemas/open-fund.schema";

const seedData = async () => {
  try {
    // Eliminar datos anteriores
    await Fund.deleteMany({});
    await Transaction.deleteMany({});
    await OpenFund.deleteMany({});
    await Balance.deleteMany({});

    // Insertar data de ejemplo
    await Fund.insertMany([
      {
        name: "FPV_BTG_PACTUAL_RECAUDADORA",
        type: FundType.FPV,
        minAmount: 75000,
      },
      {
        name: "FPV_BTG_PACTUAL_ECOPETROL",
        type: FundType.FPV,
        minAmount: 125000,
      },
      { name: "DEUDAPRIVADA", type: FundType.FIC, minAmount: 50000 },
      { name: "FDO-ACCIONES", type: FundType.FIC, minAmount: 250000 },
      {
        name: "FPV_BTG_PACTUAL_DINAMICA",
        type: FundType.FPV,
        minAmount: 100000,
      },
    ]);
    console.log("Fondos insertados");

    await Balance.insertMany([{ amount: 500000 }]);
    console.log("Balance insertado");

    // Desconectar de MongoDB
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  } catch (error) {
    console.error("Error al insertar datos de semillas:", error);
    process.exit(1);
  }
};

seedData();
