import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.ts",
		coverage: {
			reporter: ["text", "json", "html"],
			include: ["src/**/*.{js,jsx,ts,tsx}"],
			exclude: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}", "src/setupTests.ts"],
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
