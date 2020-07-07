'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
module.exports = {
	dev: {
		// Paths
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: [
			{
				context: ['/oaApi', '/user-service', '/vibe-web', '/norb-service'],
				// target:'http://192.168.1.50:8080' //预警报警调试用
				// target: 'http://192.168.1.88:9001' // 罗布林卡二期接口调试 
				target: 'http://192.168.1.48:9001' 
				// target: 'http://39.101.191.171:9003'
				// target: 'http://39.98.130.147:9001'
				/* changeOrigin: true,//是否允许跨越*/
				/* pathRewrite: {
					'/user-service': ''
					} */
			}
		],

		// Various Dev Server settings
		host: '0.0.0.0', // can be overwritten by process.env.HOST
		port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
		autoOpenBrowser: false,
		errorOverlay: true,

		notifyOnErrors: true,
		poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

		/**
     * Source Maps
     */

		// https://webpack.js.org/configuration/devtool/#development
		devtool: 'cheap-module-eval-source-map',

		// If you have problems debugging vue-files in devtools,
		// set this to false - it *may* help
		// https://vue-loader.vuejs.org/en/options.html#cachebusting
		cacheBusting: true,

		cssSourceMap: true
	},

	build: {
		// Template for index.html
		index: path.resolve(__dirname, '../dist/index.html'),

		// Paths
		//不同文件名对应不同服务
		assetsRoot: path.resolve(__dirname, `../dist`),
		assetsSubDirectory: 'static',
		assetsPublicPath: './',

		/**
     * Source Maps
     */

		productionSourceMap: true,
		// https://webpack.js.org/configuration/devtool/#production
		devtool: '#source-map',

		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],

		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report
	}
};
