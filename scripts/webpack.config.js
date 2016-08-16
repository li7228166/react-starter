module.exports = {
    extensions: ['', '.js', '.jsx'],
    alias: {},
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url',
            query: {
                name: 'assets/images/[hash:8].[ext]',
                limit: 8192
            }
        }, {
            test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
                name: 'assets/fonts/[hash:8].[ext]',
                limit: 10000
            }
        }]
    }
};
