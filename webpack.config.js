const path = require('path');

module.exports = {
    'entry': './src/example.js',
    'mode': 'development',
    'output': {
        'filename': 'vue-xyscope.js',
        'path': path.resolve(__dirname, 'build'),
    },
    'module': {
        'rules': [
            {
                'test': /\.js$/,
                'exclude': /node_modules/,
                'use': {
                    'loader': 'babel-loader'
                }
            }
        ]
    }
}