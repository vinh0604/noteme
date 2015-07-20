var path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    }
}
