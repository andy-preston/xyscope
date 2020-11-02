/**
 * A fixed size buffer to hold data for the xyscope. As data is "pushed" onto
 * the head of the buffer, it "falls off" the tail.
 * Data consists of x, y coordinate pairs.
 * This is a functional constructor, no "new" is required
 * (e.g. `const aBuffer = require('buffer')(10);`)
 *
 * @function
 * @param {number} size an integer indicating the number of pairs to store
 * @returns {object} an initialised buffer object
 */
module.exports = (size) => {
    /**
     * @constant {number} bufSize the actual length of the buffer array
     */
    const bufSize = size * 2;

    /**
     * @member {number} head idx in the array that the next item will be pushed
     */
    var head = bufSize;

    /**
     * @member {Array} buffer array that holds the data - initialised to zeros
     */
    const buffer = new Array(bufSize).fill(0);

    /**
     * @function getElement
     * @param {number} idx integer index into the buffer
     * @returns {object} x, y pair in a simple object
     */
    const getElement = (idx) => {
        if (idx < 0 || idx >= size) {
            throw ('index out of range');
        }
        const internalIdx = (head + (2 * idx)) % bufSize;
        return { 'x': buffer[internalIdx], 'y': buffer[internalIdx + 1] };
    }

    return {
        /**
         * @function push
         * @param {object} pair an x,y pair in a simple object
         */
        'push': (pair) => {
            if (head == 0) {
                head = bufSize;
            }
            head = head - 1;
            buffer[head] = pair.y;
            head = head - 1;
            buffer[head] = pair.x;
        },

        /**
         * @function size
         * @returns {number} the number of pairs that this buffer will hold
         */
        'size': () => {
            return buffer.length / 2;
        },

        /**
         * @function forEach iterator over items in buffer
         * @param {Function} callback function with (idx, item) params
         */
        'forEach': (callback) => {
            for (let idx = 0; idx < size; idx++) {
                callback(idx, getElement(idx));
            }
        },

        /**
         * @function element
         * @param {number} idx integer index into the buffer
         * @returns {object} x, y pair in a simple object
         */
        'element': getElement
    };
};
