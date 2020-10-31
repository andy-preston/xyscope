module.exports = function (size) {
    var head = size;
    const buffer = new Array(size).fill([0, 0]);

    return {
        'push': function (x, y) {
            if (head == 0) {
                head = size;
            }
            head = head - 1;
            buffer[head] = [x, y];
        },
        'elements': function () {
            return buffer.slice(head).concat(
                buffer.slice(0, head));
        }
    };
}