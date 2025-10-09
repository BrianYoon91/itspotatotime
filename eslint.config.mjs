import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		ignores: [
			"node_modules/**",
			".next/**",
			"out/**",
			"build/**",
			"next-env.d.ts",
		],
		rules: {
			// ✅ Allow `any`, but show a warning instead of failing build
			"@typescript-eslint/no-explicit-any": "warn",

			// Optional: downgrade other annoying ones
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],
			"@next/next/no-img-element": "warn",
			"jsx-a11y/alt-text": "warn",
		},
	},
];

export default eslintConfig;
