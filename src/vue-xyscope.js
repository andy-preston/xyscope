/* global Vue */

(() => {
    const scope = require('../src/scope')();

    Vue.component('xyscope', {
        'template': '<div class="xyscope">' +
            '<canvas id="canvas" style="width: 100%; height: 100%"></canvas>' +
            '</div>',
        'props': {
            'limits': {
                'type': String,
                'required': true,
                'validator': (value) => {
                    return scope.validateLimits(value);
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
                    scope.setLimits(val);
                }
            }
        },
        'methods': {
            'pushData': (data) => {
                scope.pushData(data);
            }
        },
        'mounted': () => {
            scope.start(document.getElementById('canvas'));
        }

    });

})();
