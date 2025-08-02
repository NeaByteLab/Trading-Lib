import { describe, expect, it } from '@jest/globals';
import { ArrayUtils, MathUtils, safeDivision, fillNaN, shiftArray, validateArray, validateLength, sanitizeArray, validateIndicatorConfig, validateIndicatorData, validateMarketDataOnly, validateNumberArrayOnly, pineSource, pineLength, pineOffset, createIndicatorResult, validateOHLCData, validateVolumeDataForIndicators, createMultiResultIndicatorWrapper } from '@utils/index';
describe('Utils Module - Final Tests', () => {
    const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const mockMarketData = {
        open: [100, 101, 102, 103, 104],
        high: [105, 106, 107, 108, 109],
        low: [95, 96, 97, 98, 99],
        close: [100, 101, 102, 103, 104],
        volume: [1000, 1100, 1200, 1300, 1400]
    };
    describe('ArrayUtils', () => {
        it('should process array with custom function', () => {
            const result = ArrayUtils.processArray(testData, (value) => value * 2);
            expect(result).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
        });
        it('should handle empty array', () => {
            const result = ArrayUtils.processArray([], (value) => value * 2);
            expect(result).toEqual([]);
        });
        it('should process array with sliding window', () => {
            const result = ArrayUtils.processWindow(testData, 3, (window) => Math.max(...window));
            expect(result).toEqual([3, 4, 5, 6, 7, 8, 9, 10]);
        });
        it('should calculate percentage change', () => {
            const result = ArrayUtils.percentChange(testData, 1);
            expect(result[0]).toBeNaN();
            expect(result[1]).toBe(100);
        });
        it('should calculate momentum', () => {
            const result = ArrayUtils.momentum(testData, 1);
            expect(result[0]).toBeNaN();
            expect(result[1]).toBe(1);
        });
        it('should validate array', () => {
            expect(() => ArrayUtils.validateArray(testData, 1)).not.toThrow();
            expect(() => ArrayUtils.validateArray(null, 1)).toThrow();
        });
        it('should fill NaN values', () => {
            const result = ArrayUtils.fillNaN(5, 2);
            expect(result).toEqual([NaN, NaN, 0, 0, 0]);
        });
        it('should shift array', () => {
            const result = ArrayUtils.shift(testData, 2);
            expect(result).toEqual([NaN, NaN, 1, 2, 3, 4, 5, 6, 7, 8]);
        });
    });
    describe('MathUtils', () => {
        it('should calculate absolute values', () => {
            expect(MathUtils.abs(-5)).toBe(5);
            expect(MathUtils.abs(10)).toBe(10);
        });
        it('should find min and max', () => {
            expect(MathUtils.min(testData)).toBe(1);
            expect(MathUtils.max(testData)).toBe(10);
            expect(MathUtils.min([])).toBeNaN();
        });
        it('should calculate square root and power', () => {
            expect(MathUtils.sqrt(4)).toBe(2);
            expect(MathUtils.pow(2, 3)).toBe(8);
        });
        it('should calculate floor and ceiling', () => {
            expect(MathUtils.floor(3.7)).toBe(3);
            expect(MathUtils.ceil(3.2)).toBe(4);
        });
        it('should calculate sign', () => {
            expect(MathUtils.sign(-5)).toBe(-1);
            expect(MathUtils.sign(0)).toBe(0);
            expect(MathUtils.sign(5)).toBe(1);
        });
        it('should calculate exponential and factorial', () => {
            expect(MathUtils.exp(0)).toBe(1);
            expect(MathUtils.factorial(5)).toBe(120);
        });
        it('should calculate GCD and LCM', () => {
            expect(MathUtils.gcd(12, 18)).toBe(6);
            expect(MathUtils.lcm(12, 18)).toBe(36);
        });
        it('should calculate sum and average', () => {
            expect(MathUtils.sum(testData)).toBe(55);
            expect(MathUtils.average(testData)).toBe(5.5);
            expect(MathUtils.sum([])).toBe(0);
            expect(MathUtils.average([])).toBeNaN();
        });
        it('should calculate changes', () => {
            expect(MathUtils.change(10, 5)).toBe(5);
            const result = MathUtils.changeArray(testData);
            expect(result.length).toBe(9); // 10 elements - 1 = 9 changes
            expect(result[0]).toBe(1); // 2 - 1 = 1
            expect(result[1]).toBe(1); // 3 - 2 = 1
        });
        it('should calculate absolute array', () => {
            const data = [-1, -2, 3, -4];
            const result = MathUtils.absArray(data);
            expect(result).toEqual([1, 2, 3, 4]);
        });
        it('should clamp and round values', () => {
            expect(MathUtils.clamp(5, 0, 10)).toBe(5);
            expect(MathUtils.clamp(-5, 0, 10)).toBe(0);
            expect(MathUtils.round(3.14159, 2)).toBe(3.14);
        });
        it('should calculate correlation', () => {
            const x = [1, 2, 3, 4, 5];
            const y = [2, 4, 6, 8, 10];
            const result = MathUtils.correlation(x, y);
            expect(result).toBeCloseTo(1, 5);
        });
        it('should handle matrix operations', () => {
            const matrix = [[1, 2], [3, 4]];
            const transposed = MathUtils.transpose(matrix);
            expect(transposed).toEqual([[1, 3], [2, 4]]);
        });
    });
    describe('Calculation Utils', () => {
        it('should perform safe division', () => {
            expect(safeDivision(10, 2)).toBe(5);
            expect(safeDivision(10, 0)).toBe(0);
            expect(safeDivision(10, 0, 5)).toBe(5);
        });
        it('should handle NaN and Infinity', () => {
            expect(safeDivision(NaN, 2)).toBe(0);
            expect(safeDivision(10, Infinity)).toBe(0);
            expect(safeDivision(Infinity, 2)).toBe(0);
        });
        it('should fill NaN values', () => {
            const data = [1, NaN, 3, NaN, 5];
            const result = fillNaN(data, 0);
            expect(result).toEqual([1, 0, 3, 0, 5]);
        });
        it('should shift array', () => {
            const result = shiftArray(testData, 2);
            expect(result).toEqual([NaN, NaN, 1, 2, 3, 4, 5, 6, 7, 8]);
        });
    });
    describe('Validation Utils', () => {
        it('should validate array', () => {
            expect(() => validateArray(testData, 1)).not.toThrow();
            expect(() => validateArray(null, 1)).toThrow();
        });
        it('should validate length', () => {
            expect(() => validateLength(5, 1)).not.toThrow();
            expect(() => validateLength(0, 1)).toThrow();
            expect(() => validateLength(-1, 1)).toThrow();
        });
        it('should sanitize array', () => {
            const data = [1, null, 3, undefined, 5];
            const result = sanitizeArray(data);
            expect(result).toEqual([1, 3, 5]);
        });
        it('should validate indicator config', () => {
            expect(() => validateIndicatorConfig({ length: 14, source: 'close' })).not.toThrow();
            expect(() => validateIndicatorConfig({ length: 14, source: 'invalid' })).toThrow();
        });
        it('should validate indicator data', () => {
            expect(() => validateIndicatorData(mockMarketData)).not.toThrow();
            expect(() => validateIndicatorData(testData)).not.toThrow();
            expect(() => validateIndicatorData(null)).toThrow();
        });
        it('should validate market data only', () => {
            const result = validateMarketDataOnly(mockMarketData);
            expect(result).toBe(mockMarketData);
            expect(() => validateMarketDataOnly(testData)).toThrow();
        });
        it('should validate number array only', () => {
            const result = validateNumberArrayOnly(testData);
            expect(result).toBe(testData);
            expect(() => validateNumberArrayOnly(mockMarketData)).toThrow();
        });
    });
    describe('Pine Script Utils', () => {
        it('should extract source from market data', () => {
            const result = pineSource(mockMarketData, 'close');
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(mockMarketData.close.length);
        });
        it('should extract source from number array', () => {
            const result = pineSource(testData, 'close');
            expect(result).toBe(testData);
        });
        it('should return provided length', () => {
            expect(pineLength(14)).toBe(14);
            expect(pineLength(undefined)).toBe(14);
            expect(pineLength(undefined, 20)).toBe(20);
        });
        it('should offset array', () => {
            const result = pineOffset(testData, 2);
            expect(result).toEqual([NaN, NaN, 1, 2, 3, 4, 5, 6, 7, 8]);
        });
        it('should handle negative offset', () => {
            const result = pineOffset(testData, -2);
            expect(result).toEqual([3, 4, 5, 6, 7, 8, 9, 10, undefined, undefined]);
        });
    });
    describe('Indicator Utils', () => {
        it('should validate OHLC data', () => {
            const result = validateOHLCData(mockMarketData);
            expect(result).toBe(mockMarketData);
        });
        it('should validate volume data', () => {
            const result = validateVolumeDataForIndicators(mockMarketData);
            expect(result).toBe(mockMarketData);
        });
        it('should create indicator result', () => {
            const values = [1, 2, 3, 4, 5];
            const result = createIndicatorResult(values, 14, 'close');
            expect(result).toHaveProperty('values');
            expect(result).toHaveProperty('metadata');
            expect(result.values).toBe(values);
            expect(result.metadata.length).toBe(14);
            expect(result.metadata.source).toBe('close');
        });
        it('should create multi-result indicator wrapper', () => {
            class MockIndicator {
                calculate = () => ({ values: [1, 2, 3], signal: [4, 5, 6] });
            }
            const result = createMultiResultIndicatorWrapper(MockIndicator, testData, 14);
            expect(result).toHaveProperty('values');
            expect(result).toHaveProperty('signal');
        });
    });
    describe('Error Handling', () => {
        it('should handle empty arrays gracefully', () => {
            expect(() => ArrayUtils.processArray([], (x) => x)).not.toThrow();
            expect(() => MathUtils.sum([])).not.toThrow();
            expect(() => MathUtils.average([])).not.toThrow();
        });
        it('should handle invalid parameters', () => {
            expect(() => validateArray(null, 1)).toThrow();
            expect(() => validateLength(0, 1)).toThrow();
            expect(() => validateLength(-1, 1)).toThrow();
        });
        it('should handle division by zero', () => {
            expect(safeDivision(10, 0)).toBe(0);
            expect(safeDivision(10, 0, 5)).toBe(5);
        });
        it('should handle NaN and Infinity', () => {
            expect(safeDivision(NaN, 2)).toBe(0);
            expect(safeDivision(10, Infinity)).toBe(0);
            expect(safeDivision(Infinity, 2)).toBe(0);
        });
    });
    describe('Edge Cases', () => {
        it('should handle single element arrays', () => {
            const singleElement = [42];
            const result = ArrayUtils.processArray(singleElement, (x) => x * 2);
            expect(result).toEqual([84]);
        });
        it('should handle arrays with all NaN values', () => {
            const nanArray = [NaN, NaN, NaN];
            const result = MathUtils.sum(nanArray);
            expect(result).toBe(0);
        });
        it('should handle very large numbers', () => {
            const largeNumber = 1e15;
            expect(MathUtils.abs(largeNumber)).toBe(largeNumber);
            expect(MathUtils.abs(-largeNumber)).toBe(largeNumber);
        });
        it('should handle very small numbers', () => {
            const smallNumber = 1e-15;
            expect(MathUtils.abs(smallNumber)).toBe(smallNumber);
            expect(MathUtils.abs(-smallNumber)).toBe(smallNumber);
        });
        it('should handle boundary conditions', () => {
            expect(MathUtils.clamp(0, 0, 10)).toBe(0);
            expect(MathUtils.clamp(10, 0, 10)).toBe(10);
            expect(MathUtils.clamp(5, 0, 10)).toBe(5);
        });
    });
    describe('Performance Tests', () => {
        it('should handle large arrays efficiently', () => {
            const largeArray = Array.from({ length: 1000 }, (_, i) => i);
            const result = ArrayUtils.processArray(largeArray, (x) => x * 2);
            expect(result.length).toBe(1000);
            expect(result[0]).toBe(0);
            expect(result[999]).toBe(1998);
        });
        it('should handle window processing efficiently', () => {
            const largeArray = Array.from({ length: 100 }, (_, i) => i);
            const result = ArrayUtils.processWindow(largeArray, 10, (window) => Math.max(...window));
            expect(result.length).toBe(91); // 100 - 10 + 1
            expect(result[0]).toBe(9);
            expect(result[90]).toBe(99);
        });
        it('should handle mathematical operations efficiently', () => {
            const largeArray = Array.from({ length: 1000 }, (_, i) => i);
            const sum = MathUtils.sum(largeArray);
            const average = MathUtils.average(largeArray);
            expect(sum).toBe(499500);
            expect(average).toBe(499.5);
        });
    });
});
