import { AxiosResponse } from "axios";
import axios from "./axios";

export const getBalance = async (): Promise<AxiosResponse<number>> =>
  await axios.get("/balance");
