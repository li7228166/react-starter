/**
 * Created by lxp on 2016/8/25.
 */
var http = require("http");
var querystring = require("query-string");
var config = require('../config.json');

exports.proxy = function (req, res) {
	// 获取 /api/ 之后的的 URL 路径
	var path = req.path.replace(/^\/api/, "");
	// 获取请求参数
	var contents = querystring.stringify(req.querystring);
	var options = {
		host: config.proxy.host,
		port: config.proxy.port,
		path: path,
		method: req.method,
		headers: req.headers
	};

	// 作为 http 客户端向服务器端发送请求
	var body = '';
	var request = http.request(options, function (response) {
		response.setEncoding('UTF-8');
		if (response.statusCode != 200) {
			res.status(response.statusCode).end();
			return;
		}
		response.on('data', function (data) {
			body += data;
		}).on('end', function () {
			var obj = JSON.parse(body);
			res.contentType('json');
			res.send(JSON.stringify(obj));
		});
	});
	request.on('error', function (e) {
		console.log('problem with request: ' + e.message);
	});

	// 向服务器发送请求
	request.write(contents);
	request.end();

};