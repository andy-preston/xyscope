import { fromString, fromRgba } from 'css-color-converter';

/**
 * @function
 * @returns {object} an initialised color manager object
 */
export const Colour = () => {
    /** @member {Array} nextColour an RGBA array of the next colour */
    var nextColour;

    /** @member {Array} increments separate increments for each step */
    var increments;

    /** @member {number} step current step round */
    var step;

    return {
        /**
         * Initialise the current colours from a CSSStyleDeclaration object
         * or a mock.
         *
         * @param {CSSStyleDeclaration} style computed style of the canvas
         * @param {number} steps integer number of steps
         */
        'start': (style, steps) => {
            const foregroundColour = fromString(
                style.getPropertyValue('color')
            ).toRgbaArray();
            nextColour = fromString(
                style.getPropertyValue('background-color')
            ).toRgbaArray();
            step = 0;
            increments = nextColour.map(
                /**
                 * @param {number} bgComp the background colour component
                 * @param {number} idx the index of the bg, fg and inc. array
                 * @returns {number} component of increments array
                 */
                (bgComp, idx) => {
                    return (foregroundColour[idx] - bgComp) / (steps - 1);
                }
            );
        },

        /**
         * Get the current iteration of the colour fade
         *
         * @returns {string} rgb or rgba CSS string
         */
        'style': () => {
            if (step > 0) {
                nextColour = nextColour.map(
                    /**
                     * @param {number} comp the background colour component
                     * @param {number} idx the index of the bg, fg and inc. array
                     * @returns {number} component of increments array
                     */
                    (comp, idx) => {
                        return comp + increments[idx];
                    }
                );
            }
            step = step + 1;
            return fromRgba(nextColour).toRgbString();
        }
    };
};
