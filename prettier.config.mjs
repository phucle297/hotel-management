/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
	printWidth: 80,
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
	arrowParens: 'always',
	bracketSameLine: false,
	bracketSpacing: true,
	experimentalTernaries: false,
	jsxSingleQuote: true,
	quoteProps: 'as-needed',
	singleAttributePerLine: false,
	htmlWhitespaceSensitivity: 'css',
	proseWrap: 'preserve',
	insertPragma: false,
	requirePragma: false,
	embeddedLanguageFormatting: 'auto',
	endOfLine: 'lf',
	plugins: ['prettier-plugin-tailwindcss'],
	tailwindFunctions: ['clsx', 'cn'],
};

export default config;
