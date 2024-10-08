import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/test/**/*.test.ts", "**/src/test/**/*.spec.ts"], // Ajusta la ruta según tu estructura de archivos
};

export default config;
