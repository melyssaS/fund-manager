import app from "./app";
import config from './config';
import './database'

async function main() {
  app.listen(config.PORT);
  console.log("Server on port ", config.PORT);
}

main();