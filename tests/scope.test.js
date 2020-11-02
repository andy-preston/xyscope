/* eslint-env jest */

const scope = require('../src/scope');

const mockScaler = () => {
    var xMin, yMin, xMax, yMax;
    return {
        'setLimits': (xi, yi, xx, yx) => {
            xMin = xi;
            yMin = yi;
            xMax = xx;
            yMax = yx;
        },
        'checkLimits': () => {
            return { 'xMin': xMin, 'yMin': yMin, 'xMax': xMax, 'yMax': yMax };
        }
    }
};

test('setLimits passes data as expected', () => {
    const scaler = mockScaler();
    const testScope = scope(undefined, scaler);
    ['1,2,3,4', '1, 2, 3, 4'].forEach((limitString) => {
        testScope.setLimits('1,2,3,4');
        actual = scaler.checkLimits();
        expect(actual.xMin).toBe(1);
        expect(actual.yMin).toBe(2);
        expect(actual.xMax).toBe(3);
        expect(actual.yMax).toBe(4);
    });
});

test('validateLimits allows ONLY a string with 4 numerics', () => {
    const testScope = scope();
    expect(testScope.validateLimits('1,2,3,4')).toBe(true);
    expect(testScope.validateLimits(' 1, 2, 3, 4 ')).toBe(true);
    expect(testScope.validateLimits(' 1, 2, 3')).toBe(false);
    expect(testScope.validateLimits(' 1, 2, 3,4,5')).toBe(false);
    expect(testScope.validateLimits('not,even,numbers,here')).toBe(false);
    expect(testScope.validateLimits('not even a list')).toBe(false);
});

//////////////////////////////////////////////////////////////////
//                                                              //
// I don't think there's any value in trying to test bindCanvas //
//                                                              //
//////////////////////////////////////////////////////////////////
