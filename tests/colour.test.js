/* eslint-env jest */

import { Colour } from '../src/colour.js';

/**
 * @param {string} colour CSS colour string
 * @returns {object} a mock CSSStyleDeclaration
 */
const MockStyleObject = (colour) => {
    const result = { 'color': colour };

    return {
        /**
         * @param {string} property to get
         * @returns {string} CSS colour string
         */
        'getPropertyValue': (property) => {
            return result[property];
        }
    }
}

test('6 digit hex strings return correct colour', () => {
    const colour = Colour();
    colour.start(MockStyleObject('#123456'), 10);
    expect(colour.style()).toBe('rgba(18, 52, 86, 0)');
});

test('3 digit hex strings return correct colour', () => {
    const colour = Colour();
    colour.start(MockStyleObject('#DEF'), 10);
    expect(colour.style()).toBe('rgba(221, 238, 255, 0)');
});

test('rgb strings return correct colour', () => {
    const colour = Colour();
    colour.start(MockStyleObject('rgb(4,5,6)'), 10);
    expect(colour.style()).toBe('rgba(4, 5, 6, 0)');
});

test('rgba strings return correct colour', () => {
    const colour = Colour();
    colour.start(MockStyleObject('rgba(4,5,6, .9)'), 10);
    expect(colour.style()).toBe('rgba(4, 5, 6, 0)');
});

test('named colours return correct colour', () => {
    const colour = Colour();
    colour.start(MockStyleObject('white'), 10);
    expect(colour.style()).toBe('rgba(255, 255, 255, 0)');
});

test('it increments the colours to the end', () => {
    var last;
    const colour = Colour();
    colour.start(MockStyleObject('rgb(10, 10, 10)'), 10);
    expect(colour.style()).toBe('rgba(10, 10, 10, 0)');
    for (let i = 1; i <= 10; i++) {
        last = colour.style();
    }
    // alpha should be "1" but we've got some arithmetic errors
    expect(last).toBe('rgba(10, 10, 10, 0.9999999999999999)');
});
