import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    dir: "./",
});

const config ={
    coverageProvider: "v8",
    testEnvironment: "jest-environment-jsdom",
};

export default createJestConfig(config);