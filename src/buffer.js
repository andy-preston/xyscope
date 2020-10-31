module.exports = (size) => {
    const bufSize = size * 2;
    var head = bufSize;
    const buffer = new Array(bufSize).fill(0);

    const getElement = (idx) => {
        if (idx < 0 || idx >= size) {
            throw ('index out of range');
        }
        const internalIdx = (head + (2 * idx)) % bufSize;
        return { 'x': buffer[internalIdx], 'y': buffer[internalIdx + 1] };
    }

    return {
        'push': (x, y) => {
            if (head == 0) {
                head = bufSize;
            }
            head = head - 1;
            buffer[head] = y;
            head = head - 1;
            buffer[head] = x;
        },
        'size': () => {
            return buffer.length / 2;
        },
        'forEach': (callback) => {
            for (let idx = 0; idx < size; idx++) {
                callback(idx, getElement(idx));
            }
        },
        'element': getElement
    };
}