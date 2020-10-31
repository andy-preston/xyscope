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
            'handler': (val, oldVal) => {
                this.scope.setLimits(val);
            }
        }
    },
    'methods': {
        // This isn't going to be JUST draw-a-line for long.
        // For it to work like a real X-Y scope (which is what I want)
        // we're going to need some better method of injecting data
        // that data  will then persist for a while and then fade from
        // the display.
        'drawLine': (x1, y1, x2, y2) => {
            this.scope.drawLine(x1, y1, x2, y2);
        }
    },
    'beforeCreate': () => {
        this.scope = require('../src/scope')();
    },
    'mounted': () => {
        this.scope.bindCanvas(document.getElementById('canvas'));
    }

});

var vm = new Vue({ 'el': '#example' });

setTimeout(function () {
    vm.$refs.scope.drawLine(5, 5, 15, 15);
}, 5000);

