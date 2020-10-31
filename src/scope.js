// You only need to pass anything to this "constructor" in the test environment
// During normal usage, don't pass anything and it'll work out it's own
// dependencies
module.exports = (buf, scl) => {
    var canvas, ctx;

    const buffer = typeof buf == 'undefined' ? require('./buffer')(100) : buf;
    const scaler = typeof scl == 'undefined' ? require('./scaler')() : scl;

    return {

        'bindCanvas': (htmlCanvas) => {
            canvas = htmlCanvas;
            ctx = canvas.getContext('2d');
        },

        'setLimits': (limitStr) => {
            const [xMin, yMin, xMax, yMax] = limitStr.split(',').map(x => +x);
            scaler.setLimits(xMin, yMin, xMax, yMax);
        },

        'validateLimits': (limitStr) => {
            const limits = limitStr.split(',');
            if (limits.length != 4 || limits.some(isNaN)) {
                console.log(
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
