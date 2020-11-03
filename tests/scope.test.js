/* eslint-env jest */

import { Scope } from '../src/scope.js';

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

test('validateLimits returns true on any string of 4 numerics', () => {
    const scope = Scope();
    expect(scope.validateLimits('1,2,3,4')).toBe(true);
    expect(scope.validateLimits(' 1, 2, 3, 4 ')).toBe(true);
});

test('validateLimits fails on less than 4 numerics', () => {
    const scope = Scope();
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    expect(scope.validateLimits(' 1, 2, 3')).toBe(false);
    expect(console.warn).toHaveBeenCalled();
});

test('validateLimits fails on more than 4 numerics', () => {
    const scope = Scope();
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    expect(scope.validateLimits(' 1, 2, 3,4,5')).toBe(false);
    expect(console.warn).toHaveBeenCalled();
});

test('validateLimits fails on no numerics', () => {
    const scope = Scope();
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    expect(scope.validateLimits('not,even,numbers,here')).toBe(false);
    expect(console.warn).toHaveBeenCalled();
});

test('validateLimits fails on plain old bad string', () => {
    const scope = Scope();
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    expect(scope.validateLimits('not even a list')).toBe(false);
    expect(console.warn).toHaveBeenCalled();
});
