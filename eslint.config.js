const eslint = require("@eslint/js");
const globals = require("globals");

module.exports = [
    {
        ignores: [
            "node_modules/**",
            "scripts/tools/process_ygo_*.js"
        ]
    },
    {
        files: [
            "server.js",
            "api/**/*.js",
            "eslint.config.js",
            "scripts/tools/**/*.js",
            "test/**/*.js"
        ],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: globals.node
        },
        rules: {
            ...eslint.configs.recommended.rules,
            "no-useless-escape": "off",
            "no-unused-vars": ["warn", {
                argsIgnorePattern: "^_",
                caughtErrors: "none",
                varsIgnorePattern: "^_"
            }]
        }
    },
    {
        files: ["vite.config.mjs"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.node
        },
        rules: {
            ...eslint.configs.recommended.rules
        }
    },
    {
        files: [
            "index.js",
            "scripts/components/**/*.js",
            "scripts/pages/**/*.js"
        ],
        ignores: ["scripts/pages/inventory-filters.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "script",
            globals: globals.browser
        },
        rules: {
            ...eslint.configs.recommended.rules,
            "no-useless-escape": "off",
            "no-unused-vars": ["warn", {
                argsIgnorePattern: "^_",
                caughtErrors: "none",
                varsIgnorePattern: "^_"
            }]
        }
    },
    {
        files: [
            "scripts/pages/inventory-filters.js",
            "scripts/state/**/*.mjs"
        ],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.browser
        },
        rules: {
            ...eslint.configs.recommended.rules,
            "no-useless-escape": "off",
            "no-unused-vars": ["warn", {
                argsIgnorePattern: "^_",
                caughtErrors: "none",
                varsIgnorePattern: "^_"
            }]
        }
    }
];
