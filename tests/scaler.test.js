const scaler = require('../src/scaler');

test('scales correctly with positive coordinates', () => {
    const testScaler = scaler();
    testScaler.setLimits(0, 0, 20, 10);
    expect(testScaler.scale(5, 'x', 20)).toBe(5);
    expect(testScaler.scale(5, 'x', 40)).toBe(10);
    expect(testScaler.scale(5, 'y', 10)).toBe(5);
    expect(testScaler.scale(5, 'y', 40)).toBe(20);
});

test('scales correctly with negative coordinates', () => {
    const testScaler = scaler();
    testScaler.setLimits(-20, -10, 0, 0);
    expect(testScaler.scale(-15, 'x', 20)).toBe(5);
    expect(testScaler.scale(-15, 'x', 40)).toBe(10);
    expect(testScaler.scale(-5, 'y', 10)).toBe(5);
    expect(testScaler.scale(-5, 'y', 40)).toBe(20);
});

test('scales correctly with mixed coordinates', () => {
    const testScaler = scaler();
    testScaler.setLimits(-10, -5, 10, 5);
    expect(testScaler.scale(5, 'x', 20)).toBe(15);
    expect(testScaler.scale(5, 'x', 40)).toBe(30);
    expect(Math.abs(testScaler.scale(5, 'y', 10))).toBe(0);
    expect(testScaler.scale(0, 'y', 40)).toBe(20);
});

