const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const merge = require('webpack-merge');
const packageConfig = require('../package.json');

module.exports = merge(webpackConfig, {
    output: {
        path: path.join(__dirname, '..', 'dll'),
        filename: '[name].[hash:8].js',
        library: '[name]'
    },
    entry: {
        vendor: Object.keys(packageConfig.dependencies)
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '..', 'dll', 'manifest.json'),
            name: '[name]',
            context: path.join(__dirname)
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: false,
            compressor: {
                warnings: false
            }
        })
    ]
});