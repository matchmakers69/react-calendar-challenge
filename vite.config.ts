import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
	resolve: {
		alias: {
			"@assets": path.resolve(__dirname, "src/assets"),
			"@app": path.resolve(__dirname, "src/app"),
			"@features": path.resolve(__dirname, "src/features"),
			"@shared": path.resolve(__dirname, "src/shared"),
			"@utils": path.resolve(__dirname, "src/utils"),
		},
	},
	optimizeDeps: {
		include: [],
	},
	plugins: [react(), tailwindcss(), tsconfigPaths()],
	build: {
		assetsInlineLimit: 0,
		outDir: "dist",
		rollupOptions: {
			input: {
				app: "./index.html",
			},
		},
	},
});
