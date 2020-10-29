var Scope = function () {
    var canvas, ctx, limitsX, limitsY,
        scale, setLimit, limitsFromString;

    scale = function (p, limits, trueSize) {
        return trueSize / ((p + limits.offset) / limits.size);
    };

    setLimit = function (min, max) {
        return {
            'size': max - min,
            'offset': min
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
            limitsY = setLimit(yMin, yMax);
        },
        'drawLine': function (x1, y1, x2, y2) {
            ctx.beginPath();
            ctx.moveTo(
                scale(x1, limitsX, htmlCanvas.width),
                scale(y1, limitsY, htmlCanvas.height)
            );
            ctx.lineTo(
                scale(x2, limitsX, htmlCanvas.width),
                scale(y2, limitsY, htmlCanvas.height)
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

var vm = new Vue({ el: '#example' });


