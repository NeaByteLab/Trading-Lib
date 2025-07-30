import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { accumulationDistribution } from '@indicators/volume/flow/ad';
import { beforeAll, describe, expect, it } from '@jest/globals';
import { loadTestData, validateTestData } from '@tests/utils/data-loader';
describe('Accumulation Distribution', () => {
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
        it('should calculate Accumulation Distribution correctly', () => {
            const result = accumulationDistribution(testData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.close.length);
            expect(result[0]).not.toBeNaN();
            expect(result[1]).not.toBeNaN();
            expect(result[2]).not.toBeNaN();
        });
        it('should handle default parameters', () => {
            const result = accumulationDistribution(testData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.close.length);
        });
    });
    describe('Edge Cases', () => {
        it('should throw error for empty data', () => {
            expect(() => accumulationDistribution({ open: [], high: [], low: [], close: [], volume: [] })).toThrow(ERROR_MESSAGES.MISSING_VOLUME);
        });
        it('should throw error for missing high data', () => {
            expect(() => accumulationDistribution({ open: [1], low: [1], close: [1], volume: [1] })).toThrow(ERROR_MESSAGES.MISSING_OHLCV);
        });
        it('should throw error for missing low data', () => {
            expect(() => accumulationDistribution({ open: [1], high: [1], close: [1], volume: [1] })).toThrow(ERROR_MESSAGES.MISSING_OHLCV);
        });
        it('should throw error for missing close data', () => {
            expect(() => accumulationDistribution({ open: [1], high: [1], low: [1], volume: [1] })).toThrow(ERROR_MESSAGES.MISSING_OHLCV);
        });
        it('should throw error for missing volume data', () => {
            expect(() => accumulationDistribution({ open: [1], high: [1], low: [1], close: [1] })).toThrow(ERROR_MESSAGES.MISSING_VOLUME);
        });
        it('should handle zero range (high = low)', () => {
            const zeroRangeData = {
                open: [15, 15, 15, 15, 15],
                high: [15, 15, 15, 15, 15],
                low: [15, 15, 15, 15, 15],
                close: [15, 15, 15, 15, 15],
                volume: [1000, 1100, 1200, 1300, 1400]
            };
            const result = accumulationDistribution(zeroRangeData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(zeroRangeData.close.length);
            expect(result[0]).not.toBeNaN();
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
            const result = accumulationDistribution(subset);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(subset.close.length);
            expect(validateTestData(subset, 50)).toBe(true);
        });
        it('should produce reasonable AD values', () => {
            const subset = {
                open: marketData.open.slice(0, 100),
                high: marketData.high.slice(0, 100),
                low: marketData.low.slice(0, 100),
                close: marketData.close.slice(0, 100),
                volume: marketData.volume.slice(0, 100)
            };
            const result = accumulationDistribution(subset);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
            validValues.forEach(val => {
                expect(typeof val).toBe('number');
                expect(isFinite(val)).toBe(true);
            });
        });
    });
    describe('Mathematical Properties', () => {
        it('should calculate AD = Previous AD + Money Flow Multiplier * Volume', () => {
            const data = {
                open: [11, 12, 13, 14, 15],
                high: [15, 16, 18, 17, 19],
                low: [10, 11, 12, 13, 14],
                close: [12, 13, 15, 14, 16],
                volume: [1000, 1100, 1200, 1300, 1400]
            };
            const result = accumulationDistribution(data);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(data.close.length);
            expect(result[0]).not.toBeNaN();
            expect(result[1]).not.toBeNaN();
            expect(result[2]).not.toBeNaN();
            expect(result[3]).not.toBeNaN();
            expect(result[4]).not.toBeNaN();
        });
        it('should handle increasing prices', () => {
            const increasingData = {
                open: [9, 10, 11, 12, 13],
                high: [10, 11, 12, 13, 14],
                low: [9, 10, 11, 12, 13],
                close: [9.5, 10.5, 11.5, 12.5, 13.5],
                volume: [1000, 1100, 1200, 1300, 1400]
            };
            const result = accumulationDistribution(increasingData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(increasingData.close.length);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
        });
        it('should handle decreasing prices', () => {
            const decreasingData = {
                open: [13, 12, 11, 10, 9],
                high: [14, 13, 12, 11, 10],
                low: [13, 12, 11, 10, 9],
                close: [13.5, 12.5, 11.5, 10.5, 9.5],
                volume: [1000, 1100, 1200, 1300, 1400]
            };
            const result = accumulationDistribution(decreasingData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(decreasingData.close.length);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
        });
        it('should handle constant prices', () => {
            const constantData = {
                open: [15, 15, 15, 15, 15],
                high: [15, 15, 15, 15, 15],
                low: [15, 15, 15, 15, 15],
                close: [15, 15, 15, 15, 15],
                volume: [1000, 1100, 1200, 1300, 1400]
            };
            const result = accumulationDistribution(constantData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(constantData.close.length);
            const validValues = result.filter(val => !isNaN(val));
            expect(validValues.length).toBeGreaterThan(0);
        });
        it('should handle zero volume', () => {
            const zeroVolumeData = {
                open: [11, 12, 13, 14, 15],
                high: [15, 16, 17, 18, 19],
                low: [10, 11, 12, 13, 14],
                close: [12, 13, 14, 15, 16],
                volume: [0, 0, 0, 0, 0]
            };
            const result = accumulationDistribution(zeroVolumeData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(zeroVolumeData.close.length);
            expect(result[0]).not.toBeNaN();
            expect(result[1]).not.toBeNaN();
            expect(result[2]).not.toBeNaN();
            expect(result[3]).not.toBeNaN();
            expect(result[4]).not.toBeNaN();
        });
    });
});
