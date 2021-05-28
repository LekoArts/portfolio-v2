module.exports = {
  preset: `ts-jest`,
  verbose: true,
  globals: {
    __PATH_PREFIX__: ``,
    __BASE_PATH__: ``,
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [2322],
      },
    },
  },
  transform: {
    "^.+\\.[jt]sx?$": `<rootDir>/jest/jest-preprocess.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  setupFiles: [`<rootDir>/jest/jest-setup.js`],
  moduleNameMapper: {
    "^@reach/router(.*)": `<rootDir>/node_modules/@gatsbyjs/reach-router$1`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/jest/__mocks__/file-mock.js`,
  },
}
