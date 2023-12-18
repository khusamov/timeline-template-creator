import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		topLevelAwait({
			// Top-level await is not available in the configured target environment ("chrome87", "edge88", "es2020", "firefox78", "safari14" + 2 overrides)
			// The export name of top-level await promise for each chunk module
			promiseExportName: "__tla",
			// The function to generate import names of top-level await promise in each chunk module
			promiseImportName: i => `__tla_${i}`
		})
	],
	// build: {
	// 	target: 'esnext'
	// },
	// esbuild: {
	// 	supported: {
	// 		'top-level-await': true
	// 	}
	// }
})
