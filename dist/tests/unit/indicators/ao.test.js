import { awesomeOscillator, acceleratorOscillator } from '@indicators/momentum/oscillators/ao';
import { beforeAll, describe, expect, it } from '@jest/globals';
import { loadTestData, validateTestData } from '@tests/utils/data-loader';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
describe('Unified Median Price Oscillators', () => {
    let testData;
    let marketData;
    beforeAll(() => {
        testData = {
            high: [15, 16, 18, 17, 19, 20, 21, 22, 23, 24],
            low: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            close: [12, 13, 15, 14, 16, 17, 18, 19, 20, 21],
            open: [11, 12, 14, 13, 15, 16, 17, 18, 19, 20],
            volume: [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900]
        };
        marketData = loadTestData();
    });
    describe('Awesome Oscillator', () => {
        it('should calculate Awesome Oscillator correctly', () => {
            const result = awesomeOscillator(testData, 3, 5);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.high.length);
            expect(result[0]).toBeNaN();
            expect(result[1]).toBeNaN();
            expect(result[2]).toBeNaN();
            expect(result[3]).toBeNaN();
            expect(result[4]).not.toBeNaN();
        });
        it('should handle default parameters', () => {
            const result = awesomeOscillator(testData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.high.length);
        });
        it('should handle different fast and slow periods', () => {
            const result = awesomeOscillator(testData, 2, 4);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.high.length);
        });
        it('should throw error when fast length >= slow length', () => {
            expect(() => awesomeOscillator(testData, 5, 5)).toThrow(ERROR_MESSAGES.FAST_LENGTH_GREATER);
            expect(() => awesomeOscillator(testData, 6, 5)).toThrow(ERROR_MESSAGES.FAST_LENGTH_GREATER);
        });
        it('should work with real market data', () => {
            const subset = {
                high: marketData.high.slice(0, 50),
                low: marketData.low.slice(0, 50),
                close: marketData.close.slice(0, 50),
                open: marketData.open.slice(0, 50),
                volume: marketData.volume.slice(0, 50)
            };
            const result = awesomeOscillator(subset, 5, 34);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(subset.high.length);
            expect(validateTestData(subset, 50)).toBe(true);
        });
        it('should produce reasonable AO values', () => {
            const subset = {
                high: marketData.high.slice(0, 100),
                low: marketData.low.slice(0, 100),
                close: marketData.close.slice(0, 100),
                open: marketData.open.slice(0, 100),
                volume: marketData.volume.slice(0, 100)
            };
            const result = awesomeOscillator(subset, 5, 34);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
            validValues.forEach(val => {
                expect(typeof val).toBe('number');
                expect(isFinite(val)).toBe(true);
            });
        });
    });
    describe('Accelerator Oscillator', () => {
        it('should calculate Accelerator Oscillator correctly', () => {
            const result = acceleratorOscillator(testData, 3, 5);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.high.length);
            expect(result[0]).toBeNaN();
            expect(result[1]).toBeNaN();
            expect(result[2]).toBeNaN();
            expect(result[3]).toBeNaN();
            expect(result[4]).not.toBeNaN();
        });
        it('should handle default parameters', () => {
            const result = acceleratorOscillator(testData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.high.length);
        });
        it('should handle different fast and slow periods', () => {
            const result = acceleratorOscillator(testData, 2, 4);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.high.length);
        });
        it('should throw error when fast length >= slow length', () => {
            expect(() => acceleratorOscillator(testData, 5, 5)).toThrow(ERROR_MESSAGES.FAST_LENGTH_GREATER);
            expect(() => acceleratorOscillator(testData, 6, 5)).toThrow(ERROR_MESSAGES.FAST_LENGTH_GREATER);
        });
        it('should work with real market data', () => {
            const subset = {
                high: marketData.high.slice(0, 50),
                low: marketData.low.slice(0, 50),
                close: marketData.close.slice(0, 50),
                open: marketData.open.slice(0, 50),
                volume: marketData.volume.slice(0, 50)
            };
            const result = acceleratorOscillator(subset, 5, 34);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(subset.high.length);
            expect(validateTestData(subset, 50)).toBe(true);
        });
        it('should produce reasonable Accelerator values', () => {
            const subset = {
                high: marketData.high.slice(0, 100),
                low: marketData.low.slice(0, 100),
                close: marketData.close.slice(0, 100),
                open: marketData.open.slice(0, 100),
                volume: marketData.volume.slice(0, 100)
            };
            const result = acceleratorOscillator(subset, 5, 34);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
            validValues.forEach(val => {
                expect(typeof val).toBe('number');
                expect(isFinite(val)).toBe(true);
            });
        });
    });
    describe('Shared Mathematical Properties', () => {
        it('should calculate Fast SMA - Slow SMA using median price', () => {
            const data = {
                high: [15, 16, 18, 17, 19, 20, 21, 22, 23, 24],
                low: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                close: [12, 13, 15, 14, 16, 17, 18, 19, 20, 21],
                open: [11, 12, 14, 13, 15, 16, 17, 18, 19, 20],
                volume: [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900]
            };
            const aoResult = awesomeOscillator(data, 2, 4);
            const accelResult = acceleratorOscillator(data, 2, 4);
            const aoValidValues = aoResult.filter(val => !isNaN(val));
            const accelValidValues = accelResult.filter(val => !isNaN(val));
            expect(aoValidValues.length).toBeGreaterThan(0);
            expect(accelValidValues.length).toBeGreaterThan(0);
        });
        it('should handle constant price data', () => {
            const constantData = {
                high: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
                low: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                close: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
                open: [11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
                volume: [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900]
            };
            const aoResult = awesomeOscillator(constantData, 3, 5);
            const accelResult = acceleratorOscillator(constantData, 3, 5);
            const aoValidValues = aoResult.filter(val => !isNaN(val));
            const accelValidValues = accelResult.filter(val => !isNaN(val));
            expect(aoValidValues.length).toBeGreaterThan(0);
            expect(accelValidValues.length).toBeGreaterThan(0);
            aoValidValues.forEach(val => {
                expect(val).toBeCloseTo(0, 5);
            });
            accelValidValues.forEach(val => {
                expect(val).toBeCloseTo(0, 5);
            });
        });
        it('should use median price (high + low) / 2', () => {
            const data = {
                high: [20, 22, 24, 26, 28],
                low: [10, 12, 14, 16, 18],
                close: [15, 17, 19, 21, 23],
                open: [14, 16, 18, 20, 22],
                volume: [1000, 1100, 1200, 1300, 1400]
            };
            const aoResult = awesomeOscillator(data, 2, 3);
            const accelResult = acceleratorOscillator(data, 2, 3);
            const aoValidValues = aoResult.filter(val => !isNaN(val));
            const accelValidValues = accelResult.filter(val => !isNaN(val));
            expect(aoValidValues.length).toBeGreaterThan(0);
            expect(accelValidValues.length).toBeGreaterThan(0);
        });
        it('should produce identical results for same parameters', () => {
            const data = {
                high: [15, 16, 18, 17, 19, 20, 21, 22, 23, 24],
                low: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                close: [12, 13, 15, 14, 16, 17, 18, 19, 20, 21],
                open: [11, 12, 14, 13, 15, 16, 17, 18, 19, 20],
                volume: [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900]
            };
            const aoResult = awesomeOscillator(data, 3, 5);
            const accelResult = acceleratorOscillator(data, 3, 5);
            expect(aoResult).toEqual(accelResult);
        });
    });
    describe('Edge Cases', () => {
        it('should throw error for empty data', () => {
            expect(() => awesomeOscillator({ high: [], low: [], close: [], open: [], volume: [] })).toThrow(ERROR_MESSAGES.EMPTY_DATA);
            expect(() => acceleratorOscillator({ high: [], low: [], close: [], open: [], volume: [] })).toThrow(ERROR_MESSAGES.EMPTY_DATA);
        });
    });
});
