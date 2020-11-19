import Vue from 'vue';
import { Scope } from './scope.js';

const scope = Scope();

// eslint-disable-next-line vue/component-definition-name-casing
Vue.component('xyscope', {
    'props': {
        /**
         * @member {string} limits "xMin, yMin, xMax, yMax"
         */
        'limits': {
            'type': String,
            'required': true,
            'validator': scope.validateLimits
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
    'mounted': () => {
        scope.start(document.getElementById('canvas'));
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
        'pushData': scope.pushData
    },
    'template': '<div class="xyscope">' +
        '<canvas id="canvas" style="width: 100%; height: 100%"' +
        " v-on:request-data=\"$emit('request-data')\"> " +
        '</canvas></div>'
});
