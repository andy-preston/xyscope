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
         * @function scale scale a position on an axis (use setLimits first)
         * @param {number} p the value to scale
         * @param {string} axis 'x' or 'y'
         * @param {number} trueSize the screen size of the axis in pixels
         * @returns {number} the scaled value
         */
        'scale': (p, axis, trueSize) => {
            return trueSize / (
                limits[axis].size / (p + limits[axis].offset)
            );
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
