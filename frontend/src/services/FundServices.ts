import axios from "./axios";
import { AxiosResponse } from "axios";
import { Fund } from "../models/models";

export const getFunds = async (): Promise<AxiosResponse<Fund[]>> =>
  await axios.get("/funds/all");
