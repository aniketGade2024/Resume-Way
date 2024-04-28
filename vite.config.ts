import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import { fileURLToPath } from 'url';


// https://vitejs.dev/config/
export default defineConfig({
	envDir: 'envs',
	plugins: [
		react(),
	],
	resolve: {
		alias: {
			'@': path.resolve(fileURLToPath(new URL('./src', import.meta.url))),
			'~': path.resolve(process.cwd(), 'node_modules'),
			src: path.resolve(process.cwd(), 'src'),
		},
	},

	server: {
		port: 8080,
	},
	preview: {
		port: 8080,
	},

	build: {
		chunkSizeWarningLimit: 5000,
	},
	optimizeDeps: {
		entries: ['./src/**/*.tsx'],
	},
});
