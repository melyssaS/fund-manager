import axios from "./axios";
import { AxiosResponse } from "axios";
import { OpenFund } from "../models/models";

export const getOpenFunds = async (): Promise<AxiosResponse<OpenFund[]>> =>
  await axios.get("/open-funds/all");
