var path = require('path');
var fs = require("fs");
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var webpackConfig = require('./webpack.config.js');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');


/*获得vendor文件*/
var vendorUrl = '';
var files = fs.readdirSync(path.join(__dirname, '..', 'dll'));
files.forEach(function (val) {
	var exc = new RegExp(/vendor.*.js$/ig);
	if (exc.test(val)) {
		vendorUrl = val;
	}
});


module.exports = merge(webpackConfig, {
	entry: {
		'app': path.join(__dirname, '..', 'app', 'js', 'index')
	},
	output: {
		path: path.join(__dirname, '..', 'dist'),
		filename: 'script/app.[hash:8].js',
		publicPath: './'
	},
	module: {
		loaders: [{
			test: /\.css/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader", {
				publicPath: '../'
			})
		}, {
			test: /\.less/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader", {
				publicPath: '../'
			})
		}]
	},
	postcss: function () {
		return [precss, autoprefixer];
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			},
			__PROXY__: process.env.PROXY || false
		}),
		new webpack.DllReferencePlugin({
			context: path.join(__dirname),
			manifest: require(path.join(__dirname, '..', 'dll', 'manifest.json'))
		}),
		new ExtractTextPlugin("style/app.[hash:8].css"),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin({
			minSizeReduce: 1.5,
			moveToParents: true
		}),
		new HtmlWebpackPlugin({
			title: 'react通用开发环境',
			filename: 'index.html',
			template: path.join(__dirname, '..', 'app', 'index.html'),
			favicon: path.join(__dirname, '..', 'app', 'assets', 'images', 'favicon.ico')
		}),
		new AddAssetHtmlPlugin([
			{
				filepath: require.resolve(path.join(__dirname, '..', 'dll', vendorUrl)),
				outputPath: '../dist/script',
				publicPath: './script',
				includeSourcemap: false
			}
		])
	]
});
