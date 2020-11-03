/* global __dirname */

const path = require('path');

module.exports = {
    'entry': './src/vue-xyscope.js',
    'mode': 'development',
    'output': {
        'filename': 'vue-xyscope.js',
        'path': path.resolve(__dirname, 'build'),
    },
    'module': {
        'rules': [{
            'test': /\.js$/,
            'exclude': [],
            'use': {
                'loader': 'babel-loader',
                'options': {
                    'presets': ['@babel/preset-env']
                }
            }
        }]
    }
}