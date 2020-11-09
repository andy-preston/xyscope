import { fromString, fromRgba } from 'css-color-converter';

/**
 * @function
 * @returns {object} an initialised color manager object
 */
export const Colour = () => {
    /** @member {Array} nextColour an RGBA array of the next colour */
    var next;

    /** @member {number} increment increment for each step */
    var increment;

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
            next = fromString(style.getPropertyValue('color')).toRgbaArray();
            next[3] = 0;
            step = 0;
            increment = 1 / steps;
        },

        /**
         * Get the current iteration of the colour fade
         *
         * @returns {string} rgb or rgba CSS string
         */
        'style': () => {
            if (step > 0) {
                next[3] = next[3] + increment;
            }
            step = step + 1;
            return fromRgba(next).toRgbString();
        }
    };
};
