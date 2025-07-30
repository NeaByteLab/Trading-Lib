import { describe, it, expect, beforeAll } from 'vitest';
import { momentum, roc, rsi } from '@indicators/momentum';
import { loadTestData, validateTestData } from '@tests/utils/test-data-loader';
describe('Momentum Indicators', () => {
    let testData;
    beforeAll(() => {
        testData = loadTestData();
        const isValid = validateTestData(testData, testData.close.length);
        expect(isValid).toBe(true);
    });
    describe('Momentum', () => {
        it('should calculate momentum with real market data', () => {
            const period = 10;
            const result = momentum(testData.close, period);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(testData.close.length);
            // First (period-1) values should be NaN
            for (let i = 0; i < period - 1; i++) {
                expect(result[i]).toBeNaN();
            }
            // period-th value should be current - previous
            const currentPrice = testData.close[period - 1];
            const previousPrice = testData.close[0];
            const expectedMomentum = currentPrice - previousPrice;
            expect(result[period - 1]).toBe(expectedMomentum);
            // All values should be finite numbers or NaN
            result.forEach(value => {
                expect(isNaN(value) || isFinite(value)).toBe(true);
            });
        });
        it('should handle different periods correctly', () => {
            const periods = [5, 10, 20, 50];
            periods.forEach(period => {
                const result = momentum(testData.close, period);
                expect(result.length).toBe(testData.close.length);
                // Check that first (period-1) values are NaN
                for (let i = 0; i < period - 1; i++) {
                    expect(result[i]).toBeNaN();
                }
                // Check that period-th value is calculated correctly
                if (testData.close.length >= period) {
                    const currentPrice = testData.close[period - 1];
                    const previousPrice = testData.close[0];
                    const expectedMomentum = currentPrice - previousPrice;
                    expect(result[period - 1]).toBe(expectedMomentum);
                }
            });
        });
        it('should handle price decreases correctly', () => {
            const decreasingPrices = [100, 95, 90, 85, 80];
            const result = momentum(decreasingPrices, 2);
            expect(result[1]).toBe(90 - 100); // -10
            expect(result[2]).toBe(85 - 95); // -10
            expect(result[3]).toBe(80 - 90); // -10
        });
    });
    describe('Rate of Change (ROC)', () => {
        it('should calculate ROC with real market data', () => {
            const period = 10;
            const result = roc(testData.close, period);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(testData.close.length);
            // First (period-1) values should be NaN
            for (let i = 0; i < period - 1; i++) {
                expect(result[i]).toBeNaN();
            }
            // period-th value should be percentage change
            const currentPrice = testData.close[period - 1];
            const previousPrice = testData.close[0];
            const expectedROC = ((currentPrice - previousPrice) / previousPrice) * 100;
            expect(result[period - 1]).toBeCloseTo(expectedROC, 2);
            // All values should be finite numbers or NaN
            result.forEach(value => {
                expect(isNaN(value) || isFinite(value)).toBe(true);
            });
        });
        it('should handle different periods correctly', () => {
            const periods = [5, 10, 20, 50];
            periods.forEach(period => {
                const result = roc(testData.close, period);
                expect(result.length).toBe(testData.close.length);
                // Check that first (period-1) values are NaN
                for (let i = 0; i < period - 1; i++) {
                    expect(result[i]).toBeNaN();
                }
                // Check that period-th value is calculated correctly
                if (testData.close.length >= period) {
                    const currentPrice = testData.close[period - 1];
                    const previousPrice = testData.close[0];
                    const expectedROC = ((currentPrice - previousPrice) / previousPrice) * 100;
                    expect(result[period - 1]).toBeCloseTo(expectedROC, 2);
                }
            });
        });
        it('should handle zero previous price', () => {
            const prices = [0, 10, 20, 30];
            const result = roc(prices, 1);
            expect(result[0]).toBeNaN(); // Can't calculate ROC with zero previous price
            expect(result[1]).toBeNaN(); // Can't calculate ROC with zero previous price
            expect(result[2]).toBe(100); // (20-10)/10 * 100 = 100%
            expect(result[3]).toBe(50); // (30-20)/20 * 100 = 50%
        });
    });
    describe('Relative Strength Index (RSI)', () => {
        it('should calculate RSI with real market data', () => {
            const period = 14;
            const result = rsi(testData, period);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(testData.close.length);
            // First (period) values should be NaN
            for (let i = 0; i < period; i++) {
                expect(result[i]).toBeNaN();
            }
            // RSI values should be between 0 and 100
            result.forEach(value => {
                if (!isNaN(value)) {
                    expect(value).toBeGreaterThanOrEqual(0);
                    expect(value).toBeLessThanOrEqual(100);
                }
            });
        });
        it('should handle extreme cases correctly', () => {
            // All gains (no losses)
            const allGains = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114];
            const allGainsData = {
                open: allGains,
                high: allGains,
                low: allGains,
                close: allGains,
                volume: allGains.map(() => 1000)
            };
            const rsiAllGains = rsi(allGainsData, 14);
            // RSI should be 100 for all gains
            for (let i = 14; i < rsiAllGains.length; i++) {
                expect(rsiAllGains[i]).toBe(100);
            }
            // All losses (no gains)
            const allLosses = [114, 113, 112, 111, 110, 109, 108, 107, 106, 105, 104, 103, 102, 101, 100];
            const allLossesData = {
                open: allLosses,
                high: allLosses,
                low: allLosses,
                close: allLosses,
                volume: allLosses.map(() => 1000)
            };
            const rsiAllLosses = rsi(allLossesData, 14);
            // RSI should be 0 for all losses
            for (let i = 14; i < rsiAllLosses.length; i++) {
                expect(rsiAllLosses[i]).toBe(0);
            }
        });
        it('should handle different periods correctly', () => {
            const periods = [7, 14, 21];
            periods.forEach(period => {
                const result = rsi(testData, period);
                expect(result.length).toBe(testData.close.length);
                // Check that first (period) values are NaN
                for (let i = 0; i < period; i++) {
                    expect(result[i]).toBeNaN();
                }
                // Check that RSI values are within valid range
                for (let i = period; i < result.length; i++) {
                    const value = result[i];
                    if (value !== undefined && !isNaN(value)) {
                        expect(value).toBeGreaterThanOrEqual(0);
                        expect(value).toBeLessThanOrEqual(100);
                    }
                }
            });
        });
    });
    describe('Error Handling', () => {
        it('should handle empty data', () => {
            expect(() => momentum([], 10)).toThrow('Data must be an array');
            expect(() => roc([], 10)).toThrow('Data must be an array');
        });
        it('should handle invalid length', () => {
            expect(() => momentum(testData.close, 0)).toThrow('Length must be a positive integer');
            expect(() => momentum(testData.close, -1)).toThrow('Length must be a positive integer');
            expect(() => roc(testData.close, 0)).toThrow('Length must be a positive integer');
            expect(() => roc(testData.close, -1)).toThrow('Length must be a positive integer');
        });
        it('should handle insufficient data', () => {
            const shortData = testData.close.slice(0, 5);
            const momentumResult = momentum(shortData, 10);
            const rocResult = roc(shortData, 10);
            // All values should be NaN when period > data length
            momentumResult.forEach(value => {
                expect(value).toBeNaN();
            });
            rocResult.forEach(value => {
                expect(value).toBeNaN();
            });
        });
    });
    describe('Performance with Large Datasets', () => {
        it('should handle large datasets efficiently', () => {
            const largeData = loadTestData();
            const startTime = performance.now();
            const result = momentum(largeData.close, 20);
            const endTime = performance.now();
            expect(result.length).toBe(largeData.close.length);
            expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
        });
        it('should work with trending data', () => {
            const trendingData = loadTestData();
            const result = momentum(trendingData.close, 20);
            expect(result.length).toBe(trendingData.close.length);
            // In trending data, momentum should be more consistent
            const validValues = result.filter(val => !isNaN(val));
            if (validValues.length > 0) {
                const avgMomentum = validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
                expect(Math.abs(avgMomentum)).toBeGreaterThan(0);
            }
        });
        it('should work with volatile data', () => {
            const volatileData = loadTestData();
            const result = momentum(volatileData.close, 20);
            expect(result.length).toBe(volatileData.close.length);
            // In volatile data, momentum should show more variation
            const validValues = result.filter(val => !isNaN(val));
            if (validValues.length > 0) {
                const momentumChanges = validValues.slice(1).map((val, i) => Math.abs(val - validValues[i]));
                const avgChange = momentumChanges.reduce((sum, change) => sum + change, 0) / momentumChanges.length;
                expect(avgChange).toBeGreaterThan(0);
            }
        });
    });
    describe('Real Market Scenarios', () => {
        it('should handle trending markets', () => {
            const trendingData = loadTestData();
            const momentumResult = momentum(trendingData.close, 20);
            const rocResult = roc(trendingData.close, 20);
            // In a trending market, momentum should generally be positive
            const validMomentum = momentumResult.filter(val => !isNaN(val));
            const positiveMomentum = validMomentum.filter(val => val > 0);
            expect(positiveMomentum.length).toBeGreaterThan(validMomentum.length * 0.6); // At least 60% positive
            // ROC should also be generally positive
            const validROC = rocResult.filter(val => !isNaN(val));
            const positiveROC = validROC.filter(val => val > 0);
            expect(positiveROC.length).toBeGreaterThan(validROC.length * 0.6); // At least 60% positive
        });
        it('should handle volatile markets', () => {
            const volatileData = loadTestData();
            const rsiResult = rsi(volatileData, 14);
            // In volatile markets, RSI should show more extreme values
            const validRSI = rsiResult.filter(val => !isNaN(val));
            const extremeValues = validRSI.filter(val => val < 30 || val > 70);
            expect(extremeValues.length).toBeGreaterThan(validRSI.length * 0.2); // At least 20% extreme values
        });
    });
});
//# sourceMappingURL=momentum.test.js.map