import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/timeline-template-creator',
	build: {
		outDir: 'docs'
	},
	define: {
		// https://stackoverflow.com/questions/75319602/exposing-build-date-with-vite-react
		BUILD_DATE: JSON.stringify(new Date().toLocaleDateString())
	},
	plugins: [
		react({
			babel: {
				plugins: [
					[
						// Добавлена поддержка TypeScript-декораторов.
						// https://babeljs.io/docs/babel-plugin-proposal-decorators
						// https://stackoverflow.com/questions/66395054/how-do-i-enable-babel-plugin-proposal-decorators-with-vite
						'@babel/plugin-proposal-decorators',
						{
							version: '2022-03'
						}
					]
				]
			}
		}),
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
