/**
 * An object to scale our required axis range to fit the canvas.
 * TODO: can this be done through the canvas API?
 * This is a functional constructor, no "new" is required
 * (e.g. `const scaler = Scaler();`)
 *
 * @function Scaler
 * @returns {object} an initialised scaler object
 */
export const Scaler = () => {
    var xSize, xOffset, ySize, yOffset;

    const getScale = (canvas) => {
        return [canvas.width / xSize, canvas.height / ySize];
    };

    const getOffsets = () => {
        return [xOffset, yOffset];
    };

    return {
        // These two are only exported to help with testing.
        'getScale': getScale,
        'getOffsets': getOffsets,

        /**
         * @function scale rescale the canvas before drawing
         * @param {object} canvas the canvas we're scaling
         * @param {object} ctx the rendering context we're using
         */
        'scale': (canvas, ctx) => {
            ctx.scale(...getScale(canvas));
            ctx.translate(...getOffsets());
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
            xSize = xMax - xMin;
            xOffset = 0 - xMin;
            // reversed y-axis to get a more "mathematically normal" view.
            ySize = yMin - yMax;
            yOffset = 0 - yMax;
        }

    };
}
