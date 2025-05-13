import { propertyOrdering, selectorOrdering } from 'stylelint-semantic-groups';

/** @type {import('stylelint').Config} */
export default {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-css-modules',
		'stylelint-config-tailwindcss',
		'@stylistic/stylelint-plugin',
	],
	plugins: ['stylelint-order'],
	ignoreFiles: ['**/dist/**', '**/*.{js,jsx,ts,tsx}', 'src/stories/*.css'],
	rules: {
		'order/order': selectorOrdering,
		'order/properties-order': propertyOrdering,
		'max-nesting-depth': [
			3,
			{
				ignore: ['blockless-at-rules'],
			},
		],
		'declaration-empty-line-before': null,
		'no-descending-specificity': null,
		'declaration-block-no-redundant-longhand-properties': [
			true,
			{
				ignoreShorthands: ['/^grid.*/', '/place.*/'],
			},
		],
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'variants',
					'responsive',
					'screen',
					'layer',
					'theme',
					'custom-variant', // 👈 Add your custom variant here
				],
			},
		],
		'at-rule-no-deprecated': [
			true,
			{
				ignoreAtRules: ['apply'],
			},
		],
	},
};
