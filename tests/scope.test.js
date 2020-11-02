/* eslint-env jest */

const Scope = require('../src/scope');

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
    const scope = Scope(undefined, scaler);
    ['1,2,3,4', '1, 2, 3, 4'].forEach((limitString) => {
        scope.setLimits(limitString);
        const actual = scaler.checkLimits();
        expect(actual.xMin).toBe(1);
        expect(actual.yMin).toBe(2);
        expect(actual.xMax).toBe(3);
        expect(actual.yMax).toBe(4);
    });
});

test('validateLimits allows ONLY a string with 4 numerics', () => {
    const scope = Scope();
    expect(scope.validateLimits('1,2,3,4')).toBe(true);
    expect(scope.validateLimits(' 1, 2, 3, 4 ')).toBe(true);
    expect(scope.validateLimits(' 1, 2, 3')).toBe(false);
    expect(scope.validateLimits(' 1, 2, 3,4,5')).toBe(false);
    expect(scope.validateLimits('not,even,numbers,here')).toBe(false);
    expect(scope.validateLimits('not even a list')).toBe(false);
});

//////////////////////////////////////////////////////////////////
//                                                              //
// I don't think there's any value in trying to test bindCanvas //
//                                                              //
//////////////////////////////////////////////////////////////////
