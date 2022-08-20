module.exports = {
  parser: `@typescript-eslint/parser`, // Specifies the ESLint parser
  extends: [`airbnb`, `plugin:prettier/recommended`],
  plugins: [`@typescript-eslint`, `prettier`, `react-hooks`],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: `module`, // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  globals: {
    cy: true,
    Cypress: true,
    JSX: true,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        argsIgnorePattern: `res|next|stage|^err|on|config|e|_`,
      },
    ],
    "arrow-body-style": [2, `as-needed`],
    "no-param-reassign": [
      2,
      {
        props: false,
      },
    ],
    "no-unused-expressions": [
      1,
      {
        allowTaggedTemplates: true,
      },
    ],
    quotes: `off`,
    "@typescript-eslint/quotes": [
      2,
      `backtick`,
      {
        avoidEscape: true,
      },
    ],
    "@typescript-eslint/prefer-interface": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/ban-types": [
      `error`,
      {
        extendDefaults: true,
        types: {
          "{}": {
            fixWith: `Record<string, unknown>`,
          },
          object: {
            fixWith: `Record<string, unknown>`,
          },
        },
      },
    ],
    "@typescript-eslint/naming-convention": [
      `error`,
      {
        selector: `default`,
        format: [`camelCase`],
      },
      {
        selector: `variable`,
        format: [`camelCase`, `UPPER_CASE`, `PascalCase`],
        leadingUnderscore: `allowSingleOrDouble`,
        trailingUnderscore: `allowSingleOrDouble`,
      },
      {
        selector: `function`,
        format: [`camelCase`, `PascalCase`],
        leadingUnderscore: `allow`,
      },
      {
        selector: `parameter`,
        format: [`camelCase`, `PascalCase`, `snake_case`],
        leadingUnderscore: `allowSingleOrDouble`,
      },
      {
        selector: `enumMember`,
        format: [`camelCase`, `UPPER_CASE`, `PascalCase`],
      },
      {
        selector: `typeLike`,
        format: [`PascalCase`],
      },
      {
        selector: `typeAlias`,
        format: [`camelCase`, `PascalCase`],
      },
      {
        selector: `property`,
        format: [`PascalCase`, `UPPER_CASE`, `camelCase`, `snake_case`],
        leadingUnderscore: `allowSingleOrDouble`,
      },
      {
        selector: `objectLiteralProperty`,
        format: null,
      },
      {
        selector: `enum`,
        format: [`PascalCase`, `UPPER_CASE`],
      },
      {
        selector: `method`,
        format: [`PascalCase`, `camelCase`],
        leadingUnderscore: `allowSingleOrDouble`,
      },
      {
        selector: `interface`,
        format: [`PascalCase`],
        prefix: [`I`],
      },
    ],
    "@typescript-eslint/array-type": [`error`, { default: `generic` }],
    "no-console": [`warn`, { allow: [`warn`] }],
    "spaced-comment": [2, `always`, { exceptions: [`-`, `+`], markers: [`/`] }],
    "no-use-before-define": 0,
    "no-plusplus": 0,
    "no-continue": 0,
    "linebreak-style": 0,
    "consistent-return": 0,
    import: 0,
    camelcase: 1,
    "import/no-unresolved": 0,
    "func-names": 0,
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "import/no-default-export": 2,
    "import/no-cycle": 0,
    "space-before-function-paren": 0,
    "import/extensions": 0,
    "import/no-anonymous-default-export": 2,
    "react/jsx-one-expression-per-line": 0,
    "react/no-danger": 0,
    "react/display-name": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-uses-react": 1,
    "react/require-default-props": 0,
    "react/forbid-prop-types": 0,
    "react/no-unescaped-entities": 0,
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-fragments": 0,
    "react/jsx-curly-brace-presence": 0,
    "react/jsx-pascal-case": 0,
    "react/function-component-definition": 0,
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [`.js`, `.jsx`, `.tsx`],
      },
    ],
    "react/jsx-no-useless-fragment": [2, { allowExpressions: true }],
    "react-hooks/rules-of-hooks": `error`,
    "react-hooks/exhaustive-deps": `warn`,
    indent: [`error`, 2, { SwitchCase: 1 }],
    "prettier/prettier": [
      `error`,
      {
        trailingComma: `es5`,
        semi: false,
        singleQuote: false,
        printWidth: 120,
      },
    ],
    "jsx-a11y/href-no-hash": `off`,
    "jsx-a11y/anchor-is-valid": [
      `warn`,
      {
        aspects: [`invalidHref`],
      },
    ],
  },
  overrides: [
    {
      files: [
        `www/src/pages/**/*.tsx`,
        `playwright.config.ts`,
        `vitest.config.ts`,
        `www/src/templates/*.tsx`,
        `**/gatsby-config.ts`,
        `www/src/@chakra-ui/gatsby-plugin/theme.ts`,
      ],
      rules: {
        "import/no-default-export": 0,
      },
    },
  ],
}
