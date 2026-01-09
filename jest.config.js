module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/dist/",
    ],
    moduleNameMapper: {
        "^src/(.*)$": "<rootDir>/src/$1"
    }
};
