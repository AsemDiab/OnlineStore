import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  clearMocks: true,
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [151002],
      },
    },
  },
};

export default config;
