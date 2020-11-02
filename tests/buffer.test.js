/* eslint-env jest */

const buffer = require('../src/buffer');

test('buffer is correct size and contains zeroed elements', () => {
    [10, 20, 30].forEach((size) => {
        const testBuffer = buffer(size);
        expect(testBuffer.size()).toBe(size);
        // If an element is "undefined" forEach will not "see" it.
        for (let idx = 0; idx < size; idx++) {
            let element = testBuffer.element(idx);
            expect(element.x).toBe(0);
            expect(element.y).toBe(0);
        }
    });
});

test("can't request an item beyond end of buffer", () => {
    const testBuffer = buffer(5);
    expect(() => {
        testBuffer.element(6);
    }).toThrow();
    expect(() => {
        testBuffer.element(-1);
    }).toThrow();
});

test('pushed element is always first in buffer, followed by others in push order', () => {
    const testBuffer = buffer(5);
    for (let item = 1; item <= 10; item++) {
        testBuffer.push({ 'x': item, 'y': item });
        testBuffer.forEach((idx, actual) => {
            let expected = item - idx;
            if (expected < 0) {
                expected = 0;
            }
            expect(actual.x).toBe(expected);
            expect(actual.y).toBe(expected);
        });
    }
});

test('pushed element comes out in the order it went in', () => {
    const testBuffer = buffer(5);
    testBuffer.push({ 'x': 4, 'y': 5 });
    const actual = testBuffer.element(0);
    expect(actual.x).toBe(4);
    expect(actual.y).toBe(5);
});
