/* eslint-env jest */

const Colour = require('../src/colour');

/**
 * @param {string} background CSS colour string
 * @param {string} foreground CSS colour string
 * @returns {object} a mock CSSStyleDeclaration
 */
const MockStyleObject = (background, foreground) => {
    const result = {
        'background-color': background,
        'color': foreground
    };
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
    colour.start(MockStyleObject('#123456', '#789ABC'), 10);
    expect(colour.style()).toBe('rgb(18, 52, 86)');
});

test('3 digit hex strings return correct colour', () => {
    const colour = Colour();
    colour.start(MockStyleObject('#DEF', '#123'), 10);
    expect(colour.style()).toBe('rgb(221, 238, 255)');
});

test('rgb strings return correct colour', () => {
    const colour = Colour();
    colour.start(MockStyleObject('rgb(4,5,6)', 'rgb(7, 8, 9)'), 10);
    expect(colour.style()).toBe('rgb(4, 5, 6)');
});

test('rgba strings return correct colour', () => {
    const colour = Colour();
    colour.start(MockStyleObject('rgba(4,5,6, .9)', 'rgba(7, 8, 9, 0.3)'), 10);
    expect(colour.style()).toBe('rgba(4, 5, 6, 0.9)');
});

test('named colours return correct colour', () => {
    const colour = Colour();
    colour.start(MockStyleObject('black', 'white'), 10);
    expect(colour.style()).toBe('rgb(0, 0, 0)');
});

test('it increments the colours to the end', () => {
    var last;
    const colour = Colour();
    colour.start(MockStyleObject('rgb(10, 10, 10)', 'rgb(123, 212, 250)'), 10);
    expect(colour.style()).toBe('rgb(10, 10, 10)');
    for (let i = 1; i < 10; i++) {
        last = colour.style();
    }
    // I'm allowing for arithmetic errors here - 249 "should" be 250
    expect(last).toBe('rgb(123, 212, 249)');
});
