var Scope = function () {
    var canvas, ctx, limitsX, limitsY,
        scale, setLimit, limitsFromString;

    scale = function (p, limits, trueSize) {
        return trueSize / (
            limits.size / (p + limits.offset)
        );
    };

    setLimit = function (min, max) {
        return {
            'size': max - min,
            'offset': 0 - min
        }
    };

    return {
        'bindCanvas': function (htmlCanvas) {
            canvas = htmlCanvas;
            ctx = canvas.getContext('2d');
        },
        'setLimits': function (limits) {
            const [xMin, yMin, xMax, yMax] = limits.split(',');
            limitsX = setLimit(xMin, xMax);
            // reversed y-axis to get a more "mathematically normal" view.
            limitsY = setLimit(yMax, yMin);
        },
        'drawLine': function (x1, y1, x2, y2) {
            ctx.beginPath();
            ctx.moveTo(
                scale(x1, limitsX, canvas.width),
                scale(y1, limitsY, canvas.height)
            );
            ctx.lineTo(
                scale(x2, limitsX, canvas.width),
                scale(y2, limitsY, canvas.height)
            );
            ctx.stroke();
        }
    };
};

Vue.component('xyscope', {
    'template': '<div class="xyscope">' +
        '<canvas id="canvas" style="width: 100%; height: 100%"></canvas>' +
        '</div>',
    'props': {
        'limits': {
            'type': String,
            'required': true,
            'validator': function (value) {
                // I would like to have this validated in this.scope
                // so that this code could be shared between various
                // components... but in the validate function "this"
                // is bound to Window not the Vue.component and I can't see
                // any straightforward way to access this.scope
                const limits = value.split(',');
                if (limits.length != 4 || limits.some(isNaN)) {
                    // Vue property validation seems to leave a lot to be
                    // desired... the ability to pass error messages for one.
                    console.warn(
                        limits,
                        'limits should be 4 numerics separated by commas'
                    );
                    return false;
                }
                return true;
            }
        }
    },
    'data': function () {
        return {
        }
    },
    'watch': {
        'limits': {
            'immediate': true,
            'handler': function (val, oldVal) {
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
        'drawLine': function (x1, y1, x2, y2) {
            this.scope.drawLine(x1, y1, x2, y2);
        }
    },
    'beforeCreate': function () {
        this.scope = Scope();
    },
    'mounted': function () {
        this.scope.bindCanvas(document.getElementById('canvas'));
    }

});

var vm = new Vue({ 'el': '#example' });

setTimeout(function () {
    vm.$refs.scope.drawLine(5, 5, 15, 15);
}, 5000);
