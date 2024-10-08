import { config } from "dotenv";
config();

export default {
  PORT: process.env.PORT || 8080,
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/btg_pactual_funds",
};
