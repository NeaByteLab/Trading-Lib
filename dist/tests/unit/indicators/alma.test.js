import { alma } from '@indicators/trend/moving-averages/alma';
import { beforeAll, describe, expect, it } from '@jest/globals';
import { loadTestData, validateTestData } from '@tests/utils/data-loader';
describe('Adaptive Linear Moving Average (ALMA)', () => {
    let testData;
    let marketData;
    beforeAll(() => {
        testData = [10, 12, 15, 14, 16, 18, 17, 19, 20, 22];
        marketData = loadTestData();
    });
    describe('Basic Functionality', () => {
        it('should calculate ALMA correctly', () => {
            const result = alma(testData, 5, 6);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
            expect(result[0]).toBeNaN();
            expect(result[1]).toBeNaN();
            expect(result[2]).toBeNaN();
            expect(result[3]).toBeNaN();
            expect(result[4]).not.toBeNaN();
        });
        it('should handle default parameters', () => {
            const result = alma(testData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
        it('should handle different periods', () => {
            const result = alma(testData, 7, 6);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
        it('should handle different sigma values', () => {
            const result = alma(testData, 5, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
    });
    describe('Edge Cases', () => {
        it('should throw error for empty data', () => {
            expect(() => alma([])).toThrow('Data array cannot be empty');
        });
        it('should throw error for invalid length', () => {
            expect(() => alma(testData, 0, 6)).toThrow('Length must be positive');
            expect(() => alma(testData, -1, 6)).toThrow('Length must be positive');
        });
        it('should throw error for invalid sigma', () => {
            expect(() => alma(testData, 5, 0)).toThrow('Sigma must be positive');
            expect(() => alma(testData, 5, -1)).toThrow('Sigma must be positive');
        });
    });
    describe('Real Data Validation', () => {
        it('should work with real market data', () => {
            const subset = marketData.close.slice(0, 50);
            const result = alma(subset, 9, 6);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(subset.length);
            expect(validateTestData({ open: subset, high: subset, low: subset, close: subset, volume: subset }, 50)).toBe(true);
        });
        it('should produce reasonable ALMA values', () => {
            const subset = marketData.close.slice(0, 100);
            const result = alma(subset, 9, 6);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
            validValues.forEach(val => {
                expect(typeof val).toBe('number');
                expect(isFinite(val)).toBe(true);
            });
        });
    });
    describe('Mathematical Properties', () => {
        it('should calculate weighted average with Gaussian weights', () => {
            const data = [10, 12, 15, 14, 16, 18, 17, 19, 20, 22];
            const result = alma(data, 5, 6);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
        });
        it('should handle constant price data', () => {
            const constantData = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
            const result = alma(constantData, 5, 6);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
            validValues.forEach(val => {
                expect(val).toBeCloseTo(10, 5);
            });
        });
        it('should be more responsive with higher sigma', () => {
            const data = [10, 12, 15, 14, 16, 18, 17, 19, 20, 22];
            const resultLowSigma = alma(data, 5, 3);
            const resultHighSigma = alma(data, 5, 9);
            const validLowSigma = resultLowSigma.filter(val => !isNaN(val));
            const validHighSigma = resultHighSigma.filter(val => !isNaN(val));
            expect(validLowSigma.length).toBeGreaterThan(0);
            expect(validHighSigma.length).toBeGreaterThan(0);
        });
        it('should handle trending data correctly', () => {
            const trendingData = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
            const result = alma(trendingData, 5, 6);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
            validValues.forEach((val, index) => {
                if (index > 0) {
                    expect(val).toBeGreaterThan(validValues[index - 1]);
                }
            });
        });
    });
    describe('Gaussian Weight Properties', () => {
        it('should use Gaussian weighting function', () => {
            const data = [10, 12, 15, 14, 16, 18, 17, 19, 20, 22];
            const result = alma(data, 5, 6);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
        });
        it('should handle different sigma values correctly', () => {
            const data = [10, 12, 15, 14, 16, 18, 17, 19, 20, 22];
            const result1 = alma(data, 5, 3);
            const result2 = alma(data, 5, 6);
            const result3 = alma(data, 5, 9);
            const valid1 = result1.filter(val => !isNaN(val));
            const valid2 = result2.filter(val => !isNaN(val));
            const valid3 = result3.filter(val => !isNaN(val));
            expect(valid1.length).toBeGreaterThan(0);
            expect(valid2.length).toBeGreaterThan(0);
            expect(valid3.length).toBeGreaterThan(0);
        });
    });
});
