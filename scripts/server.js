var path = require('path');
var express = require('express');
var webpack = require('webpack');
var host = "localhost";
var port = process.env.PORT || 8080;
var open = require("open");

var app = express();
if (process.env.NODE_ENV === 'development') {
    port = 3000;
    var webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackDevConfig = require('./webpack.config.dev.js');

    var compiler = webpack(webpackDevConfig);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackDevConfig.output.publicPath,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));
} else {
    app.use(express.static(path.join(__dirname, '..', 'dist')))
}

app.listen(port, host, function () {
    console.log('Listening at http://' + host + ':' + port + '\n');
    open("http://" + host + ':' + port);
});
