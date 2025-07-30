import { describe, expect, it } from '@jest/globals';
import { loadTestData } from '@tests/utils/data-loader';
import * as CalculationUtils from '@utils/calculation-utils';
describe('Calculation Utils', () => {
    const testData = [1, 2, 3, 4, 5];
    const marketData = loadTestData();
    describe('Price Calculations', () => {
        it('should calculate typical price', () => {
            const result = CalculationUtils.PriceCalculations.typical(marketData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(marketData.high.length);
            expect(result[0]).toBe((marketData.high[0] + marketData.low[0] + marketData.close[0]) / 3);
        });
        it('should calculate HL2', () => {
            const result = CalculationUtils.PriceCalculations.hl2(marketData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(marketData.high.length);
            expect(result[0]).toBe((marketData.high[0] + marketData.low[0]) / 2);
        });
        it('should calculate OHLC4', () => {
            const result = CalculationUtils.PriceCalculations.ohlc4(marketData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(marketData.high.length);
            expect(result[0]).toBe((marketData.open[0] + marketData.high[0] + marketData.low[0] + marketData.close[0]) / 4);
        });
    });
    describe('Statistical Functions', () => {
        it('should calculate mean', () => {
            expect(CalculationUtils.calculateMean(testData)).toBe(3);
            expect(CalculationUtils.calculateMean([1, 2, 3, 4, 5])).toBe(3);
        });
        it('should calculate variance', () => {
            const variance = CalculationUtils.calculateVariance(testData);
            expect(variance).toBeCloseTo(2, 2);
        });
        it('should calculate standard deviation', () => {
            const stdDev = CalculationUtils.calculateStandardDeviation(testData);
            expect(stdDev).toBeCloseTo(1.41, 2);
        });
    });
    describe('Rolling Window Functions', () => {
        it('should create rolling windows', () => {
            const result = CalculationUtils.rollingWindow(testData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length - 2);
            expect(result[0]).toEqual([1, 2, 3]);
        });
        it('should calculate rolling statistics', () => {
            const result = CalculationUtils.calculateRollingStatistic(testData, 3, 'mean');
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length - 2);
        });
    });
    describe('Smoothing Functions', () => {
        it('should apply exponential smoothing', () => {
            const result = CalculationUtils.exponentialSmoothing(testData, 0.5);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
        it('should apply Wilder\'s smoothing', () => {
            const result = CalculationUtils.wildersSmoothing(testData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
    });
    describe('Utility Functions', () => {
        it('should perform safe division', () => {
            expect(CalculationUtils.safeDivision(10, 2)).toBe(5);
            expect(CalculationUtils.safeDivision(10, 0)).toBe(0);
        });
        it('should fill NaN values', () => {
            const result = CalculationUtils.fillNaN([1, NaN, 3, 4], 0);
            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([1, 0, 3, 4]);
        });
        it('should shift arrays', () => {
            const result = CalculationUtils.shiftArray([1, 2, 3, 4], 2);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(4);
        });
    });
    describe('Indicator Calculations', () => {
        it('should calculate RSI', () => {
            const result = CalculationUtils.calculateRSI(testData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
        it('should calculate CCI', () => {
            const result = CalculationUtils.calculateCCI(testData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
    });
    describe('Range Calculations', () => {
        it('should calculate range percentage', () => {
            const result = CalculationUtils.calculateRangePercentage(5, 0, 10, 100);
            expect(result).toBe(50);
        });
        it('should calculate high/low range', () => {
            const result = CalculationUtils.calculateHighLowRange(marketData.high, marketData.low, 0, 3);
            expect(result).toHaveProperty('highest');
            expect(result).toHaveProperty('lowest');
        });
    });
    describe('Error Handling', () => {
        it('should handle empty arrays', () => {
            expect(() => CalculationUtils.calculateMean([])).toThrow();
        });
        it('should handle invalid parameters', () => {
            expect(() => CalculationUtils.calculateRSI(testData, 0)).toThrow();
            expect(() => CalculationUtils.calculateRSI(testData, -1)).toThrow();
        });
        it('should handle NaN values', () => {
            const result = CalculationUtils.calculateMean([1, NaN, 3, 4, 5]);
            expect(result).toBeNaN();
        });
    });
});
