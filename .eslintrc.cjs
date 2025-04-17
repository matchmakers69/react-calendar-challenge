module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"eslint-config-prettier",
		"plugin:testing-library/react",
		"plugin:import/typescript",
		"prettier",
		"prettier/@typescript-eslint",
		"prettier/react",
		"plugin:import/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	settings: { react: { version: "18.2" } },
	plugins: ["react-refresh", "import", "react", "@typescript-eslint", "jest-dom", "react-hooks", "prettier"],
	rules: {
		"@typescript-eslint/no-explicit-any": 0,
		"react-hooks/exhaustive-deps": 2,
		"react-hooks/rules-of-hooks": 2,
		"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
		"import/newline-after-import": ["error", { count: 1 }],
		"import/no-unresolved": [2, { caseSensitive: false }],
		"import/order": [
			"error",
			{
				groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "type"],
				pathGroups: [
					{
						pattern: "react",
						group: "external",
						position: "before",
					},
					{
						pattern: "@/**",
						group: "internal",
					},
				],
				pathGroupsExcludedImportTypes: ["react"],
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
				"newlines-between": "always",
			},
		],
	},
};
