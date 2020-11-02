/* global Vue */

Vue.component('xyscope', {
    'template': '<div class="xyscope">' +
        '<canvas id="canvas" style="width: 100%; height: 100%"></canvas>' +
        '</div>',
    'props': {
        'limits': {
            'type': String,
            'required': true,
            'validator': (value) => {
                return this.scope.validateLimits(value);
            }
        }
    },
    'data': () => {
        return {
        }
    },
    'watch': {
        'limits': {
            'immediate': true,
            // eslint-disable-next-line no-unused-vars
            'handler': (val, oldVal) => {
                this.scope.setLimits(val);
            }
        }
    },
    'methods': {
        'push': (x, y) => {
            this.scope.push(x, y);
        }
    },
    'beforeCreate': () => {
        this.scope = require('../src/scope')();
    },
    'mounted': () => {
        this.scope.bindCanvas(document.getElementById('canvas'));
    }

});
