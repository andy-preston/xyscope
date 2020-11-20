'use strict'
/* eslint-env node */

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    'entry': './example/example.js',
    'mode': 'development',
    'resolve': { 'alias': { 'vue$': 'vue/dist/vue.esm.js' } },
    'output': {
        'filename': 'example.js',
        'path': path.resolve(__dirname, 'example/build')
    },
    'module': {
        'rules': [{
            'test': /\.js$/,
            'use': [{
                'loader': 'babel-loader',
                'options': { 'presets': ['@babel/preset-env'] }
            }]
        }, {
            'test': /\.vue$/,
            'use': ['vue-loader']
        }, {
            'test': /\.css$/,
            'use': [
                'style-loader',
                'css-loader'
            ]
        }]
    },
    'plugins': [new VueLoaderPlugin()]
}