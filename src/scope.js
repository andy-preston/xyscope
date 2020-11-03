/**
 * @function Buffer function constructor for the circular buffer object
 * @param {number} size the number of items the buffer should hold
 */
const Buffer = require('./buffer');

/**
 * @function Scaler function constructor for scaler object
 */
const Scaler = require('./scaler');

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

    /**
     * @member {CSSStyleDeclaration} style computed style of the canvas
     */
    var style;

    /**
     * @constant {object} buffer object constructed by ./buffer.js or a mock
     */
    const buffer = typeof buf == 'undefined' ? Buffer(600) : buf;

    /**
     * @constant {object} scaler object constructed by ./scaler.js or a mock
     */
    const scaler = typeof scl == 'undefined' ? Scaler() : scl;

    /**
     * @constant requestDataEvent event to request data
     */
    const requestDataEvent = new Event('request-data');

    /**
     * @function requestRepaint request that browser updates canvas next repaint
     */
    const requestRepaint = () => {
        window.requestAnimationFrame(
            /**
             * @function
             * @param {number} timestamp DOMHighResTimeStamp
             */
            (timestamp) => { // eslint-disable-line no-unused-vars
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                scaler.scale(canvas, ctx);
                // TODO: lineWidth should be dynamically calculated based on scale
                ctx.lineWidth = 0.4;
                ctx.strokeStyle = style.getPropertyValue('color');
                ctx.beginPath();
                buffer.forEach((idx, element) => {
                    if (idx == 0) {
                        ctx.moveTo(element.x, element.y);
                    } else {
                        ctx.lineTo(element.x, element.y);
                    }
                });
                ctx.stroke();
                canvas.dispatchEvent(requestDataEvent);
            }
        );
    };

    return {
        /**
         * @function start start the process
         * @param {object} htmlCanvas the canvas to draw on
         */
        'start': (htmlCanvas) => {
            canvas = htmlCanvas;
            ctx = canvas.getContext('2d');
            style = window.getComputedStyle(canvas);
            requestRepaint();
        },

        /**
         * @function setLimits call this before `start` to set up axes
         * @param {string} limitStr "xMin, yMin, xMax, yMax"
         */
        'setLimits': (limitStr) => {
            const [xMin, yMin, xMax, yMax] = limitStr.split(',').map(x => +x);
            scaler.setLimits(xMin, yMin, xMax, yMax);
        },

        /**
         * @function validateLimits validate a string for `setLimits`
         * @param {string} limitStr "xMin, yMin, xMax, yMax"
         * @returns {boolean} true = validated, false = invalid
         */
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

        /**
         * @function pushData respond to a requestDataEvent
         * @param {object} data the x,y pair (``{'x': 23, 'y': 42}``)
         */
        'pushData': (data) => {
            buffer.push(data);
            requestRepaint();
        }
    };
};
