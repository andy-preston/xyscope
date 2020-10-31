const buffer = require('../src/buffer');

test('buffer is correct size and contains zeroed elements', function () {
    [10, 20, 30].forEach(function (size) {
        const elements = buffer(size).elements();

        expect(elements.length).toBe(size);
        // If an element is "undefined" forEach will not "see" it.
        for (let i = 0; i < size; i++) {
            expect(elements[i]).toEqual([0, 0]);
        }
    });
});

test("pushing an element doesn't change the size of the buffer", function () {
    const testBuffer = buffer(5);
    for (let i = 1; i <= 10; i++) {
        testBuffer.push(i, i);
        expect(testBuffer.elements().length).toBe(5);
    };
});

test('pushed element is always at top of buffer, followed by others in order', function () {
    var elements, expected;
    const testBuffer = buffer(5);
    for (let i = 1; i <= 10; i++) {
        testBuffer.push(i, i);
        elements = testBuffer.elements();
        for (let j = 0; j < 5; j++) {
            expected = i - j;
            if (expected < 0) {
                expected = 0;
            }
            console.warn(j, expected);
            expect(elements[j]).toEqual([expected, expected]);
        }
    };
});
