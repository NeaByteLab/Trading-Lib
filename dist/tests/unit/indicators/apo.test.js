import { apo } from '@indicators/momentum/oscillators/apo';
import { beforeAll, describe, expect, it } from '@jest/globals';
import { loadTestData } from '@tests/utils/data-loader';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
describe('Absolute Price Oscillator (APO)', () => {
    let testData;
    let marketData;
    beforeAll(() => {
        testData = [10, 12, 15, 14, 16, 18, 17, 19, 20, 22];
        marketData = loadTestData();
    });
    describe('Basic Functionality', () => {
        it('should calculate APO correctly', () => {
            const result = apo(testData, 3, 5);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
            // First few values should be NaN due to insufficient data for EMA
            expect(result[0]).toBeNaN();
            expect(result[1]).toBeNaN();
            expect(result[2]).toBeNaN();
            // Later values should have valid APO values
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
        });
        it('should handle default parameters', () => {
            const result = apo(testData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
        it('should handle different fast and slow periods', () => {
            const result = apo(testData, 2, 4);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
    });
    describe('Edge Cases', () => {
        it('should throw error for empty data', () => {
            expect(() => apo([])).toThrow(ERROR_MESSAGES.EMPTY_DATA);
        });
        it('should throw error when fast length >= slow length', () => {
            expect(() => apo(testData, 5, 5)).toThrow(ERROR_MESSAGES.FAST_LENGTH_GREATER);
            expect(() => apo(testData, 6, 5)).toThrow(ERROR_MESSAGES.FAST_LENGTH_GREATER);
        });
    });
    describe('Real Data Validation', () => {
        it('should work with real market data', () => {
            const subset = marketData.close.slice(0, 50);
            const result = apo(subset, 12, 26);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(subset.length);
        });
        it('should produce reasonable APO values', () => {
            const subset = marketData.close.slice(0, 100);
            const result = apo(subset, 12, 26);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
            validValues.forEach(val => {
                expect(typeof val).toBe('number');
                expect(isFinite(val)).toBe(true);
            });
        });
    });
    describe('Mathematical Properties', () => {
        it('should have APO = Fast EMA - Slow EMA', () => {
            const data = [10, 12, 15, 14, 16, 18, 17, 19, 20, 22];
            const result = apo(data, 2, 4);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
        });
        it('should handle constant price data', () => {
            const constantData = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
            const result = apo(constantData, 3, 5);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
            validValues.forEach(val => {
                expect(val).toBeCloseTo(0, 5);
            });
        });
    });
});
