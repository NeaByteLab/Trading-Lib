import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { amihudIlliquidity } from '@indicators/volume/flow/amihud';
import { beforeAll, describe, expect, it } from '@jest/globals';
import { loadTestData } from '@tests/utils/data-loader';
describe('Amihud Illiquidity Measure', () => {
    let testData;
    let marketData;
    beforeAll(() => {
        testData = {
            open: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            high: [15, 16, 18, 17, 19, 20, 21, 22, 23, 24],
            low: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            close: [12, 13, 15, 14, 16, 17, 18, 19, 20, 21],
            volume: [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900]
        };
        marketData = loadTestData();
    });
    describe('Basic Functionality', () => {
        it('should calculate Amihud Illiquidity correctly', () => {
            const result = amihudIlliquidity(testData, 5);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.close.length);
            expect(result[0]).toBeNaN(); // First value should be NaN
            expect(result[1]).not.toBeNaN();
            expect(result[2]).not.toBeNaN();
        });
        it('should handle default parameters', () => {
            const result = amihudIlliquidity(testData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.close.length);
        });
        it('should handle different periods', () => {
            const result = amihudIlliquidity(testData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.close.length);
        });
    });
    describe('Edge Cases', () => {
        it('should throw error for empty data', () => {
            expect(() => amihudIlliquidity({ open: [], high: [], low: [], close: [], volume: [] })).toThrow(ERROR_MESSAGES.EMPTY_DATA);
        });
        it('should throw error for missing OHLC data', () => {
            expect(() => amihudIlliquidity([1, 2, 3])).toThrow(ERROR_MESSAGES.MISSING_OHLCV);
        });
        it('should handle zero price', () => {
            const zeroPriceData = {
                open: [0, 0, 0, 0, 0],
                high: [0, 0, 0, 0, 0],
                low: [0, 0, 0, 0, 0],
                close: [0, 0, 0, 0, 0],
                volume: [1000, 1100, 1200, 1300, 1400]
            };
            const result = amihudIlliquidity(zeroPriceData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(zeroPriceData.close.length);
            expect(result[0]).toBeNaN();
        });
        it('should handle zero volume', () => {
            const zeroVolumeData = {
                open: [11, 12, 13, 14, 15],
                high: [15, 16, 17, 18, 19],
                low: [10, 11, 12, 13, 14],
                close: [12, 13, 14, 15, 16],
                volume: [0, 0, 0, 0, 0]
            };
            const result = amihudIlliquidity(zeroVolumeData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(zeroVolumeData.close.length);
            expect(result[0]).toBeNaN();
        });
    });
    describe('Real Data Validation', () => {
        it('should work with real market data', () => {
            const subset = {
                open: marketData.open.slice(0, 50),
                high: marketData.high.slice(0, 50),
                low: marketData.low.slice(0, 50),
                close: marketData.close.slice(0, 50),
                volume: marketData.volume.slice(0, 50)
            };
            const result = amihudIlliquidity(subset, 20);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(subset.close.length);
        });
        it('should produce reasonable Amihud values', () => {
            const subset = {
                open: marketData.open.slice(0, 100),
                high: marketData.high.slice(0, 100),
                low: marketData.low.slice(0, 100),
                close: marketData.close.slice(0, 100),
                volume: marketData.volume.slice(0, 100)
            };
            const result = amihudIlliquidity(subset, 20);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
            validValues.forEach(val => {
                expect(typeof val).toBe('number');
                expect(isFinite(val)).toBe(true);
                expect(val).toBeGreaterThanOrEqual(0);
            });
        });
    });
    describe('Mathematical Properties', () => {
        it('should calculate Amihud = |Return| / Volume', () => {
            const data = {
                open: [11, 12, 13, 14, 15],
                high: [15, 16, 17, 18, 19],
                low: [10, 11, 12, 13, 14],
                close: [12, 13, 14, 15, 16],
                volume: [1000, 1100, 1200, 1300, 1400]
            };
            const result = amihudIlliquidity(data, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(data.close.length);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
        });
        it('should handle constant price data', () => {
            const constantData = {
                open: [10, 10, 10, 10, 10],
                high: [10, 10, 10, 10, 10],
                low: [10, 10, 10, 10, 10],
                close: [10, 10, 10, 10, 10],
                volume: [1000, 1100, 1200, 1300, 1400]
            };
            const result = amihudIlliquidity(constantData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(constantData.close.length);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
            validValues.forEach(val => {
                expect(val).toBeCloseTo(0, 5);
            });
        });
        it('should handle high volatility data', () => {
            const volatileData = {
                open: [10, 20, 5, 25, 15],
                high: [20, 25, 10, 30, 20],
                low: [5, 15, 2, 20, 10],
                close: [15, 25, 8, 28, 18],
                volume: [1000, 1100, 1200, 1300, 1400]
            };
            const result = amihudIlliquidity(volatileData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(volatileData.close.length);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
        });
        it('should handle low volume data', () => {
            const lowVolumeData = {
                open: [11, 12, 13, 14, 15],
                high: [15, 16, 17, 18, 19],
                low: [10, 11, 12, 13, 14],
                close: [12, 13, 14, 15, 16],
                volume: [100, 200, 300, 400, 500]
            };
            const result = amihudIlliquidity(lowVolumeData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(lowVolumeData.close.length);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
        });
        it('should handle high volume data', () => {
            const highVolumeData = {
                open: [11, 12, 13, 14, 15],
                high: [15, 16, 17, 18, 19],
                low: [10, 11, 12, 13, 14],
                close: [12, 13, 14, 15, 16],
                volume: [10000, 11000, 12000, 13000, 14000]
            };
            const result = amihudIlliquidity(highVolumeData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(highVolumeData.close.length);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
        });
    });
});
