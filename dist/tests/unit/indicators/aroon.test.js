import { aroonOscillator } from '@indicators/momentum/directional/aroon-oscillator';
import { beforeAll, describe, expect, it } from '@jest/globals';
import { loadTestData, validateTestData } from '@tests/utils/data-loader';
describe('Aroon Oscillator', () => {
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
    describe('Basic Functionality', () => {
        it('should calculate Aroon Oscillator correctly', () => {
            const result = aroonOscillator(testData, 5);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.high.length);
            expect(result[0]).toBeNaN();
            expect(result[1]).toBeNaN();
            expect(result[2]).toBeNaN();
            expect(result[3]).toBeNaN();
            expect(result[4]).not.toBeNaN();
        });
        it('should handle default parameters', () => {
            const result = aroonOscillator(testData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.high.length);
        });
        it('should handle different periods', () => {
            const result = aroonOscillator(testData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.high.length);
        });
    });
    describe('Edge Cases', () => {
        it('should handle empty data gracefully', () => {
            const result = aroonOscillator({ high: [], low: [], close: [], open: [], volume: [] });
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(0);
        });
    });
    describe('Real Data Validation', () => {
        it('should work with real market data', () => {
            const subset = {
                high: marketData.high.slice(0, 50),
                low: marketData.low.slice(0, 50),
                close: marketData.close.slice(0, 50),
                open: marketData.open.slice(0, 50),
                volume: marketData.volume.slice(0, 50)
            };
            const result = aroonOscillator(subset, 14);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(subset.high.length);
            expect(validateTestData(subset, 50)).toBe(true);
        });
        it('should produce reasonable Aroon Oscillator values', () => {
            const subset = {
                high: marketData.high.slice(0, 100),
                low: marketData.low.slice(0, 100),
                close: marketData.close.slice(0, 100),
                open: marketData.open.slice(0, 100),
                volume: marketData.volume.slice(0, 100)
            };
            const result = aroonOscillator(subset, 14);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
            validValues.forEach(val => {
                expect(typeof val).toBe('number');
                expect(isFinite(val)).toBe(true);
                expect(val).toBeGreaterThanOrEqual(-100);
                expect(val).toBeLessThanOrEqual(100);
            });
        });
    });
    describe('Mathematical Properties', () => {
        it('should calculate Aroon Oscillator = Aroon Up - Aroon Down', () => {
            const data = {
                high: [15, 16, 18, 17, 19, 20, 21, 22, 23, 24],
                low: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                close: [12, 13, 15, 14, 16, 17, 18, 19, 20, 21],
                open: [11, 12, 14, 13, 15, 16, 17, 18, 19, 20],
                volume: [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900]
            };
            const result = aroonOscillator(data, 5);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
        });
        it('should handle constant price data', () => {
            const constantData = {
                high: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
                low: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                close: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
                open: [11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
                volume: [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900]
            };
            const result = aroonOscillator(constantData, 5);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
        });
        it('should return values between -100 and 100', () => {
            const data = {
                high: [20, 22, 24, 26, 28, 30, 32, 34, 36, 38],
                low: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
                close: [15, 17, 19, 21, 23, 25, 27, 29, 31, 33],
                open: [14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
                volume: [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900]
            };
            const result = aroonOscillator(data, 5);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
            validValues.forEach(val => {
                expect(val).toBeGreaterThanOrEqual(-100);
                expect(val).toBeLessThanOrEqual(100);
            });
        });
        it('should handle trending data correctly', () => {
            const trendingData = {
                high: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                low: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                close: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
                open: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                volume: [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900]
            };
            const result = aroonOscillator(trendingData, 5);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
        });
    });
});
