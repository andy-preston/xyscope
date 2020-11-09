import { Buffer } from './buffer.js';
import { Colour } from './colour.js';
import { Scaler } from './scaler.js';

/**
 * An object to display an x-y vectorscope on an HTML canvas
 * This is a functional constructor, no "new" is required
 * (e.g. `const scope = Scope();`)
 *
 * @function Scope
 * @param {object} buf no need to pass a buffer object unless it's a test mock
 * @param {object} scl no need to pass a scaler object unless it's a test mock
 * @param {object} col no need to pass a colour manager unless it's a test mock
 * @returns {object} the scope object constructed
 */
export const Scope = (buf, scl, col) => {
    /**
     * @member {object} canvas an HTMLCanvas to render to
     */
    var canvas;

    /**
     * @member {object} ctx the device context of the canvas
     */
    var ctx;

    /**
     * @constant {object} buffer object constructed by ./buffer.js or a mock
     */
    const buffer = typeof buf == 'undefined' ? Buffer(200) : buf;

    /**
     * @constant {object} scaler object constructed by ./scaler.js or a mock
     */
    const scaler = typeof scl == 'undefined' ? Scaler() : scl;

    /**
     * @constant {object} color object constructed by ./colour.js or a mock
     */
    const colour = typeof col == 'undefined' ? Colour() : col;

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
                colour.start(
                    window.getComputedStyle(canvas),
                    buffer.size()
                );
                buffer.forEach((idx, element, prev) => {
                    ctx.strokeStyle = colour.style();
                    ctx.beginPath();
                    ctx.moveTo(prev.x, prev.y);
                    ctx.lineTo(element.x, element.y);
                    ctx.stroke();
                });
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
                console.warn(
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
