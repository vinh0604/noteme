// var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path'),
    merge = require('webpack-merge'),
    TARGET = process.env.TARGET,
    ROOT_PATH = path.resolve(__dirname);

var common = {
    entry: path.resolve(ROOT_PATH, 'src/main.js'),
    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: 'bundle.js'
    },
    // devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(ROOT_PATH, 'src'),
                    path.resolve(ROOT_PATH, 'test')
                ],
                loader: "babel-loader"
            },
            {
                test: /\.jsx$/,
                include: [
                    path.resolve(ROOT_PATH, 'src'),
                    path.resolve(ROOT_PATH, 'test')
                ],
                loaders: ["react-hot-loader", "babel-loader"]
            },
            {
                test: /.scss$/,
                // loader: ExtractTextPlugin.extract(
                //     'css?sourceMap!sass?sourceMap'
                // ),
                include: path.resolve(ROOT_PATH, 'src'),
                loader: 'style!css!sass'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
    // plugins: [
    //     new ExtractTextPlugin("bundle.css")
    // ]
};

if (TARGET === 'build') {
    module.exports = common;
}

if (TARGET === 'dev') {
    module.exports = common;
}
