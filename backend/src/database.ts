import mongoose from "mongoose";
import config from "./config";

(async () => {
  try {
    const db = await mongoose.connect(config.MONGODB_URI);
    console.log('database is connected to:', db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();