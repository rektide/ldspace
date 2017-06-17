import { default as rollupConfig } from ".rollup.js"

export const swOptions= {
	entry: "sw/index.js",
	dest: "build/sw.js",
	format: "iife",
	moduleName: "serviceWorker"
}

export default Object.assign({}, rollupConfig, swOptions)
