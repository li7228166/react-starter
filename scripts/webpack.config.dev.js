var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = require('./webpack.config.js');
var merge = require('webpack-merge');
var autoprefixer = require('autoprefixer');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = merge(webpackConfig, {
    devtool: 'source-map',
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        path.join(__dirname, '..', 'app', 'js', 'index')
    ],
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.css/,
            use: ["style-loader", {
                loader: "css-loader",
                options: {
                    sourceMap: true
                }
            }, {
                loader: "less-loader",
                options: {
                    sourceMap: true
                }
            }]
        }, {
            test: /\.less/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: {
                    sourceMap: true
                }
            }, {
                loader: "less-loader",
                options: {
                    sourceMap: true
                }
            }]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            },
            __PROXY__: process.env.PROXY || false
        }),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname),
            manifest: require(path.join(__dirname, '..', 'dll', 'manifest.json'))
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: 'react通用开发环境',
            filename: 'index.html',
            template: path.join(__dirname, '..', 'app', 'index.html')
        }),
        new AddAssetHtmlPlugin([
            {
                filepath: require.resolve(path.join(__dirname, '..', 'dll', require('./util').vendorUrl)),
                includeSourcemap: false
            }
        ])
    ]
});