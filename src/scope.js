module.exports = () => {
    var canvas, ctx;
    const buffer = require('./buffer')(100);
    const scaler = require('./scaler')();

    return {
        'bindCanvas': (htmlCanvas) => {
            canvas = htmlCanvas;
            ctx = canvas.getContext('2d');
        },
        'setLimits': (limits) => {
            const [xMin, yMin, xMax, yMax] = limits.split(',');
            scaler.setLimits(xMin, yMin, xMax, yMax);
        },
        'validateLimits': (limits) => {
            if (limits.length != 4 || limits.some(isNaN)) {
                console.warn(
                    limits,
                    'limits should be 4 numerics separated by commas'
                );
                return false;
            }
            return true;
        },
        'drawLine': (x1, y1, x2, y2) => {
            ctx.beginPath();
            ctx.moveTo(
                scaler.scale(x1, 'x', canvas.width),
                scaler.scale(y1, 'y', canvas.height)
            );
            ctx.lineTo(
                scaler.scale(x2, 'x', canvas.width),
                scaler.scale(y2, 'y', canvas.height)
            );
            ctx.stroke();
        }
    };
};
