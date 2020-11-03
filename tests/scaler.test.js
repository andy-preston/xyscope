/* eslint-env jest */

import { Scaler } from '../src/scaler.js';

test('scales correctly with positive coordinates', () => {
    const scaler = Scaler();
    scaler.setLimits(0, 0, 20, 10);
    expect(scaler.scale(5, 'x', 20)).toBe(5);
    expect(scaler.scale(5, 'x', 40)).toBe(10);
    expect(scaler.scale(5, 'y', 10)).toBe(5);
    expect(scaler.scale(5, 'y', 40)).toBe(20);
});

test('scales correctly with negative coordinates', () => {
    const scaler = Scaler();
    scaler.setLimits(-20, -10, 0, 0);
    expect(scaler.scale(-15, 'x', 20)).toBe(5);
    expect(scaler.scale(-15, 'x', 40)).toBe(10);
    expect(scaler.scale(-5, 'y', 10)).toBe(5);
    expect(scaler.scale(-5, 'y', 40)).toBe(20);
});

test('scales correctly with mixed coordinates', () => {
    const scaler = Scaler();
    scaler.setLimits(-10, -5, 10, 5);
    expect(scaler.scale(5, 'x', 20)).toBe(15);
    expect(scaler.scale(5, 'x', 40)).toBe(30);
    expect(Math.abs(scaler.scale(5, 'y', 10))).toBe(0);
    expect(scaler.scale(0, 'y', 40)).toBe(20);
});

