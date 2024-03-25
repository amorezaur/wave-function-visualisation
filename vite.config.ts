import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

const portNumber: number = 3000;
export default defineConfig({
	plugins: [react()],
	server: {
		port: portNumber,
		open: `http://localhost:${portNumber}/`,
	},
});
