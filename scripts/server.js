const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
let port = process.env.PORT || 8080;
const open = require("open");
const config = require('../config.json');

/*
 * 初始化
 * */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*
 * 路由配置
 * */
app.get("/api/*", require("./proxy").proxy);
app.post("/api/*", require("./proxy").proxy);

/*
 * 处理开发模式和生产模式
 * */
if (process.env.NODE_ENV === 'development') {
    port = 4000;
    const webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackDevConfig = require('./webpack.config.dev.js');

    const compiler = webpack(webpackDevConfig);
    app.use(webpackDevMiddleware(compiler, {
        logLevel: 'error',
        publicPath: webpackDevConfig.output.publicPath,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));
} else {
    app.use(express.static(path.join(__dirname, '..', 'dist')))
}

/*
 * 开启服务
 * */
app.listen(port, function () {
    console.log('Local http://localhost:' + port + '/\nExternal http://' + require('./util').localIp + ':' + port + '/\n');
    //open("http://localhost:" + port);
});
