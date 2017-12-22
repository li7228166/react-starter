var path = require('path');

module.exports = {
    resolve: {
        alias: {
            js: path.join(__dirname, "..", "app/js"),
            style: path.join(__dirname, "..", "app/style"),
            assets: path.join(__dirname, "..", "app/assets"),

            components: path.join(__dirname, "..", "app/js/components"),
            service: path.join(__dirname, "..", "app/js/service"),
            stores: path.join(__dirname, "..", "app/js/stores"),
            view: path.join(__dirname, "..", "app/js/view"),

            util: path.join(__dirname, "..", "app/js/util.js"),
            config: path.join(__dirname, "..", "app/js/config.js")
        },
        extensions: ['.js', 'json']
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.(png|jpg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: 'assets/images/[hash:8].[ext]',
                    limit: 8192
                }
            }
        }, {
            test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
            use: {
                loader: "url-loader",
                options: {
                    name: 'assets/fonts/[hash:8].[ext]',
                    limit: 10000
                }
            }
        }]
    }
};
