var webpack = require("webpack");

// browserfs

module.exports = {
	target: "webworker",
	target: function(){},
	resolve: {
		// Use our versions of Node modules.
		alias: {
			"any-promise": "any-promise-native",
			"browserfs-esnext": "browserfs-esnext/build/temp/library/ts",
			"stream": "stream-browserify",
			"constants": "constants-browserify",
			"fs": "browserfs/dist/shims/fs.js",
			"buffer": "browserfs/dist/shims/buffer.js",
			"path": "browserfs/dist/shims/path.js",
			"processGlobal": "browserfs/dist/shims/process.js",
			"bufferGlobal": "browserfs/dist/shims/bufferGlobal.js",
			"bfsGlobal": require.resolve("browserfs")
		}
	},
	plugins: [
		// Expose BrowserFS, process, and Buffer globals.
		// NOTE: If you intend to use BrowserFS in a script tag, you do not need
		// to expose a BrowserFS global.
		new webpack.ProvidePlugin({
			BrowserFS: "bfsGlobal",
			process: "processGlobal",
			Buffer: "bufferGlobal"
		})
	],

	//resolve: {
	//	// Use our versions of Node modules.
	//	alias: {
	//		"browserfs": "browserfs-esnext/build/temp/library/ts",
	//		"fs": "browserfs/dist/shims/fs.js",
	//		"buffer": "bfs-buffer",
	//		"path": "bfs-path"
	//	}
	//},
	//plugins: [
	//	// Expose BrowserFS, process, and Buffer globals.
	//	// NOTE: If you intend to use BrowserFS in a script tag, you do not need
	//	// to expose a BrowserFS global.
	//	new webpack.ProvidePlugin({
	//		//fs: ["fs/singleton", "default"],
	//		browserfs: ["browserfs-esnext/build/temp/library/ts"],
	//		BrowserFS: ["browserfs-esnext/build/temp/library/ts"],
	//		process: ["bfs-process"],
	//		Buffer: ["bfs-buffer", "Buffer"]
	//	})
	//],
	// DISABLE Webpack"s built-in process and Buffer polyfills!
	node: {
		process: false,
		Buffer: false
	}
};

//// ts-loader-base
//// https://github.com/TypeStrong/ts-loader/tree/master/examples/react-babel-karma-gulp
///* eslint-disable no-var, strict, prefer-arrow-callback */
//"use strict";
//
//var path = require("path");
//var webpack = require("webpack");
//
//var packageJson = require("./package.json");
//var vendorDependencies = Object.keys(packageJson["dependencies"]);
//
//var babelOptions = {
//  "presets": [
//    "react",
//    [
//      "es2015",
//      {
//        "modules": false
//      }
//    ],
//    "es2016"
//  ]
//};
//
//module.exports = {
//  cache: true,
//  entry: {
//    main: "./src/main.tsx",
//    vendor: vendorDependencies
//  },
//  output: {
//    path: path.resolve(__dirname, "./dist/scripts"),
//    filename: "[name].js",
//    chunkFilename: "[chunkhash].js"
//  },
//  module: {
//    rules: [{
//      test: /\.ts(x?)$/,
//      exclude: /node_modules/,
//      use: [
//        {
//          loader: "babel-loader",
//          options: babelOptions
//        },
//        {
//          loader: "ts-loader"
//        }
//      ]
//    }, {
//      test: /\.js$/,
//      exclude: /node_modules/,
//      use: [
//        {
//          loader: "babel-loader",
//          options: babelOptions
//        }
//      ]
//    }]
//  },
//  resolve: {
//    // Add `.ts` and `.tsx` as a resolvable extension.
//    extensions: [".ts", ".tsx", ".js"]
//  },
//};
//
//// ts-loader-prod
//
///* eslint-disable no-var, strict, prefer-arrow-callback */
//"use strict";
//
//var path = require("path");
//var webpack = require("webpack");
//
//var packageJson = require("./package.json");
//var vendorDependencies = Object.keys(packageJson["dependencies"]);
//
//var babelOptions = {
//  "presets": [
//    "react",
//    [
//      "es2015",
//      {
//        "modules": false
//      }
//    ],
//    "es2016"
//  ]
//};
//
//module.exports = {
//  cache: true,
//  entry: {
//    main: "./src/main.tsx",
//    vendor: vendorDependencies
//  },
//  output: {
//    path: path.resolve(__dirname, "./dist/scripts"),
//    filename: "[name].js",
//    chunkFilename: "[chunkhash].js"
//  },
//  module: {
//    rules: [{
//      test: /\.ts(x?)$/,
//      exclude: /node_modules/,
//      use: [
//        {
//          loader: "babel-loader",
//          options: babelOptions
//        },
//        {
//          loader: "ts-loader"
//        }
//      ]
//    }, {
//      test: /\.js$/,
//      exclude: /node_modules/,
//      use: [
//        {
//          loader: "babel-loader",
//          options: babelOptions
//        }
//      ]
//    }]
//  },
//  resolve: {
//    // Add `.ts` and `.tsx` as a resolvable extension.
//    extensions: [".ts", ".tsx", ".js"]
//  },
//};
//
//
//// ts-sample
//// https://github.com/Microsoft/TypeScriptSamples/tree/master/react-flux-babel-karma
//// 