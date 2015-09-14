var webpack = require('webpack');

var build = process.env.BUILD_MODE || 'release';
var compati = process.env.COMPATI || 'no';
var es6 = process.env.ES6 || 'no';

var config = {
    entry: './index.js',
    output: {
        path: './dist',
        filename: 'pars.js'
    },
    plugins: [],
    loaders: []
};

if (compati == 'compatiable') {
    config.output.filename = 'pars-compati.js';

    config.plugins.push(new webpack.DefinePlugin({
        OPT: JSON.stringify('compatible')
    }));

    config.plugins.push(new webpack.NormalModuleReplacementPlugin(/pars/, function (res) {
        // when after resolved assign request property will throw resource not found
        if (!('resource' in res)) {
            res.request = 'babel!./lib/compati-pars';
        }
    }));
}

if (build == 'release') {
    // ignore 'debug' module resolving
    config.plugins.push(new webpack.IgnorePlugin(/debug/));
    // all compressed and minimal build
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
}

// must apply babel loader
if ('no' == es6) {
    config.loaders.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    });
}

module.exports = config;