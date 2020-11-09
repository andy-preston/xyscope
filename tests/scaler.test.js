/* eslint-env jest */

import { Scaler } from '../src/scaler.js';

const canvas = { 'width': 400, 'height': 300 };

test('scales correctly with positive coordinates', () => {
    const scaler = Scaler();
    scaler.setLimits(0, 0, 20, 10);
    expect(scaler.getScale(canvas)).toEqual([20, -30]);
    expect(scaler.getOffsets()).toEqual([0, -10]);
});

test('scales correctly with negative coordinates', () => {
    const scaler = Scaler();
    scaler.setLimits(-20, -10, 0, 0);
    expect(scaler.getScale(canvas)).toEqual([20, -30]);
    expect(scaler.getOffsets()).toEqual([20, 0]);
});

test('scales correctly with mixed coordinates', () => {
    const scaler = Scaler();
    scaler.setLimits(-10, -5, 10, 5);
    expect(scaler.getScale(canvas)).toEqual([20, -30]);
    expect(scaler.getOffsets()).toEqual([10, -5]);
});

test('scales correctly with a different scale to the other tests', () => {
    const scaler = Scaler();
    scaler.setLimits(-10, -5, 30, 25);
    expect(scaler.getScale(canvas)).toEqual([10, -10]);
    expect(scaler.getOffsets()).toEqual([10, -25]);
});
