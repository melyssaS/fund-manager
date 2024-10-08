import { IOpenFund } from "../models/open-fund.model";
import OpenFund from "../schemas/open-fund.schema";

export const addOpenFund = async (
  fundData: Partial<IOpenFund>
): Promise<IOpenFund> => {
  const newFund = new OpenFund(fundData);
  return (await newFund.save()).populate("fund");
};

export const removeOpenFund = async (
  fundId: string
): Promise<IOpenFund | null> => {
  return await OpenFund.findOneAndDelete({ fund: fundId });
};

export const allOpenFunds = async (): Promise<IOpenFund[]> => {
  return await OpenFund.find().populate("fund");
};
