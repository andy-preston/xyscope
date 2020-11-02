/* global Vue */

(() => {
    const scope = require('../src/scope')();

    Vue.component('xyscope', {
        'template': '<div class="xyscope">' +
            '<canvas id="canvas" style="width: 100%; height: 100%"></canvas>' +
            '</div>',
        'props': {
            /**
             * @member {string} limits "xMin, yMin, xMax, yMax"
             */
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
            /**
             * Push data is a method rather than a watcher on a property because
             * two consecutive data items could well be the same as each other
             * at which point the watcher won't be triggered.
             * When the parent receives a 'request-data' event it should respond
             * by passing data to this method.
             *
             * @function pushData
             * @param {object} data the x,y pair (``{'x': 23, 'y': 42}``)
             */
            'pushData': (data) => {
                scope.pushData(data);
            }
        },
        'mounted': () => {
            scope.start(document.getElementById('canvas'));
        }

    });

})();
