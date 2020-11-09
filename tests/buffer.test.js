/* eslint-env jest */

import { Buffer } from '../src/buffer.js';

test('buffer is correct size and contains zeroed elements', () => {
    [10, 20, 30].forEach((size) => {
        const buffer = Buffer(size);
        expect(buffer.size()).toBe(size);
        // If an element is "undefined" forEach will not "see" it.
        for (let idx = 0; idx < size; idx++) {
            let element = buffer.element(idx);
            expect(element.x).toBe(0);
            expect(element.y).toBe(0);
        }
    });
});

test("can't request an item beyond end of buffer", () => {
    const buffer = Buffer(5);
    expect(() => { buffer.element(6); }).toThrow();
    expect(() => { buffer.element(-1); }).toThrow();
});

test('pushed element is always first, followed by others in push order', () => {
    const buffer = Buffer(5);
    for (let item = 1; item <= 10; item++) {
        buffer.push({ 'x': item, 'y': item });
        // eslint-disable-next-line no-unused-vars
        buffer.forEach((idx, actual, prev) => {
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
    const buffer = Buffer(5);
    buffer.push({ 'x': 4, 'y': 5 });
    const actual = buffer.element(0);
    expect(actual.x).toBe(4);
    expect(actual.y).toBe(5);
});
