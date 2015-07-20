// var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path'),
    ROOT_PATH = path.resolve(__dirname);

module.exports = {
    entry: path.resolve(ROOT_PATH, 'src/main.js'),
    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: 'bundle.js'
    },
    // devtool: "source-map",
    module: {
        loaders: [
            {
                test: /src\/.+\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /src\/.+\.jsx$/,
                exclude: /node_modules/,
                loaders: ["react-hot-loader", "babel-loader"]
            },
            {
                test: /src\/.+.scss$/,
                // loader: ExtractTextPlugin.extract(
                //     'css?sourceMap!sass?sourceMap'
                // ),
                loader: 'style!css!sass'
            }
        ]
    }
    // plugins: [
    //     new ExtractTextPlugin("bundle.css")
    // ]
}
