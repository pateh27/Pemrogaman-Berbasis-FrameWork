import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    dir: "./",
});

const config ={
    testEnvironment: "jsdom",
    modulePaths: ["<rootDir>/src/"],
    // coverageProvider: "v8",
    // testEnvironment: "jest-environment-jsdom",
    collectCoverage: true,
    collectCoverageFrom: [
        '**/*.{ts,tsx}',
        '**/*.d.ts',
        '!**/node_modules/**',
        '!**/.next/**',
        '!**/coverage/**',
        '!**/jest.config.mjs',
        '!**/next.config.js',
        '!**/postcss.config.js',
        '!**/tailwind.config.js',
        '!**/types/**',
        '!**/views/**',
        '!**/pages/api/**',
    ],
};

export default createJestConfig(config);