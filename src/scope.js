
/**
 * An object to display an x-y vectorscope on an HTML canvas
 * This is a functional constructor, no "new" is required
 * (e.g. `const scope = require('scope')();`)
 *
 * @function Scope
 * @param {object} buf no need to pass a buffer object unless it's a test mock
 * @param {object} scl no need to pass a scaler object unless it's a test mock
 * @returns {object} the scope object constructed
 */
module.exports = (buf, scl) => {
    /**
     * @member {object} canvas an HTMLCanvas to render to
     */
    var canvas;

    /**
     * @member {object} ctx the device context of the canvas
     */
    var ctx;
    const buffer = typeof buf == 'undefined' ? require('./buffer')(600) : buf;
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

        'push': (x, y) => {
            buffer.push(x, y);

            // This needs to by async
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            buffer.forEach((idx, element) => {
                const scaledX = scaler.scale(element.x, 'x', canvas.width);
                const scaledY = scaler.scale(element.y, 'y', canvas.height);
                if (idx == 0) {
                    ctx.moveTo(scaledX, scaledY);
                } else {
                    ctx.lineTo(scaledX, scaledY);
                }
            });
            ctx.stroke();
        }
    };
};
