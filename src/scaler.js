/**
 * An object to scale our required axis range to fit the canvas.
 * TODO: can this be done through the canvas API?
 * This is a functional constructor, no "new" is required
 * (e.g. `const scaler = require('scaler')();`)
 *
 * @function Scaler
 * @returns {object} an initialised scaler object
 */
module.exports = () => {
    /**
     * A pair of limits for each axis
     * Each limit will be an object with members 'size' and 'offset'
     *
     * @constant {object} limits
     */
    const limits = {
        'x': undefined,
        'y': undefined
    };

    return {
        /**
         * @function scale rescale the canvas before drawing
         * @param {object} canvas the canvas we're scaling
         * @param {object} ctx the rendering context we're using
         */
        'scale': (canvas, ctx) => {
            ctx.scale(
                canvas.width / limits.x.size,
                canvas.height / limits.y.size
            );
            ctx.translate(limits.x.offset, limits.y.offset);
            // TODO: lineWidth should be dynamically calculated based on scale
            ctx.lineWidth = 0.4;
        },

        /**
         * @function setLimits
         * @param {number} xMin the minimum point of the x axis
         * @param {number} yMin the minimum point of the y axis
         * @param {number} xMax the maximum point pf the x axis
         * @param {number} yMax the maximum point of the y axis
         */
        'setLimits': (xMin, yMin, xMax, yMax) => {
            const setLimit = (min, max) => {
                return { 'size': max - min, 'offset': 0 - min };
            };

            limits.x = setLimit(xMin, xMax);
            // reversed y-axis to get a more "mathematically normal" view.
            limits.y = setLimit(yMax, yMin);
        }
    };
}
