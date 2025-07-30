import { describe, it, expect, beforeAll } from 'vitest';
import { atr } from '@calculations/volatility';
import { trueRange } from '@calculations/volatility/true-range';
import { bollingerBands } from '@indicators/volatility/bollinger/bollinger-bands';
import { loadTestData, validateTestData } from '@tests/utils/test-data-loader';
describe('Volatility Indicators with Real Data', () => {
    let testData;
    beforeAll(() => {
        testData = loadTestData();
        const isValid = validateTestData(testData, testData.close.length);
        expect(isValid).toBe(true);
    });
    describe('True Range (TR)', () => {
        it('should calculate True Range with real market data', () => {
            const result = trueRange(testData);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(testData.close.length);
            // First value should be high - low (no previous close)
            const firstTR = testData.high[0] - testData.low[0];
            expect(result[0]).toBe(firstTR);
            // All values should be positive
            result.forEach(value => {
                expect(value).toBeGreaterThan(0);
                expect(isFinite(value)).toBe(true);
            });
        });
        it('should handle different market conditions', () => {
            const result = trueRange(testData);
            // Find the maximum true range value
            const maxTR = Math.max(...result);
            const minTR = Math.min(...result);
            // True range should be reasonable relative to price
            const avgPrice = testData.close.reduce((sum, price) => sum + price, 0) / testData.close.length;
            expect(maxTR).toBeLessThan(avgPrice * 0.1); // Max TR should be less than 10% of avg price
            expect(minTR).toBeGreaterThan(0);
        });
        it('should handle gap scenarios correctly', () => {
            // Create data with a gap
            const gapData = {
                open: [100, 110, 105, 108],
                high: [102, 112, 107, 110],
                low: [99, 109, 104, 107],
                close: [101, 111, 106, 109],
                volume: [1000, 1000, 1000, 1000]
            };
            const result = trueRange(gapData);
            // First TR should be high - low
            expect(result[0]).toBe(102 - 99); // 3
            // Second TR should consider the gap (high - prevClose)
            const gapUp = Math.abs(112 - 101); // 11
            const highLow = 112 - 109; // 3
            const lowPrev = Math.abs(109 - 101); // 8
            const expectedTR = Math.max(gapUp, highLow, lowPrev); // 11
            expect(result[1]).toBe(expectedTR);
        });
    });
    describe('Average True Range (ATR)', () => {
        it('should calculate ATR with real market data', () => {
            const period = 14;
            const result = atr(testData, period);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(testData.close.length);
            // First (period-1) values should be NaN
            for (let i = 0; i < period - 1; i++) {
                expect(result[i]).toBeNaN();
            }
            // All values should be positive or NaN
            result.forEach(value => {
                if (!isNaN(value)) {
                    expect(value).toBeGreaterThan(0);
                    expect(isFinite(value)).toBe(true);
                }
            });
        });
        it('should handle different periods correctly', () => {
            const periods = [7, 14, 21];
            periods.forEach(period => {
                const result = atr(testData, period);
                expect(result.length).toBe(testData.close.length);
                // Check that first (period-1) values are NaN
                for (let i = 0; i < period - 1; i++) {
                    expect(result[i]).toBeNaN();
                }
                // Check that ATR values are positive
                for (let i = period - 1; i < result.length; i++) {
                    if (!isNaN(result[i])) {
                        expect(result[i]).toBeGreaterThan(0);
                    }
                }
            });
        });
        it('should be smoother than True Range', () => {
            const tr = trueRange(testData);
            const atrResult = atr(testData, 14);
            // Find valid ATR values
            const validATR = atrResult.filter(val => !isNaN(val));
            const validTR = tr.slice(13); // Skip first 13 to align with ATR
            // ATR should be smoother (less volatile) than TR
            const atrStdDev = calculateStandardDeviation(validATR);
            const trStdDev = calculateStandardDeviation(validTR);
            expect(atrStdDev).toBeLessThan(trStdDev);
        });
    });
    describe('Bollinger Bands', () => {
        it('should calculate Bollinger Bands with real market data', () => {
            const period = 20;
            const stdDev = 2;
            const result = bollingerBands(testData, period, stdDev);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(testData.close.length);
            // First (period-1) values should be NaN
            for (let i = 0; i < period - 1; i++) {
                expect(result[i]).toBeNaN();
            }
            // Check that upper band is above middle band
            for (let i = period - 1; i < result.length; i++) {
                if (!isNaN(result[i])) {
                    expect(result[i].upper).toBeGreaterThan(result[i].middle);
                    expect(result[i].middle).toBeGreaterThan(result[i].lower);
                }
            }
        });
        it('should handle different periods and standard deviations', () => {
            const periods = [10, 20, 50];
            const stdDevs = [1, 2, 3];
            periods.forEach(period => {
                stdDevs.forEach(stdDev => {
                    const result = bollingerBands(testData, period, stdDev);
                    expect(result.length).toBe(testData.close.length);
                    // Check that first (period-1) values are NaN
                    for (let i = 0; i < period - 1; i++) {
                        expect(result[i]).toBeNaN();
                    }
                    // Check band relationships
                    for (let i = period - 1; i < result.length; i++) {
                        if (!isNaN(result[i]?.upper)) {
                            expect(result[i].upper).toBeGreaterThan(result[i].middle);
                            expect(result[i].middle).toBeGreaterThan(result[i].lower);
                            // Band width should increase with higher stdDev
                            const bandWidth = result[i].upper - result[i].lower;
                            const middlePrice = result[i].middle;
                            const expectedWidth = (middlePrice * stdDev * 2) / Math.sqrt(period);
                            expect(bandWidth).toBeCloseTo(expectedWidth, -1); // Within order of magnitude
                        }
                    }
                });
            });
        });
        it('should handle price breakouts correctly', () => {
            const result = bollingerBands(testData, 20, 2);
            // Find valid Bollinger Bands values
            const validBands = result.filter(band => !isNaN(band?.upper));
            // Check that some prices break above upper band
            const upperBreakouts = validBands.filter((band, i) => {
                const priceIndex = i + 19; // Adjust for NaN values
                return testData.close[priceIndex] > band.upper;
            });
            // Check that some prices break below lower band
            const lowerBreakouts = validBands.filter((band, i) => {
                const priceIndex = i + 19; // Adjust for NaN values
                return testData.close[priceIndex] < band.lower;
            });
            // In real market data, we should see some breakouts
            expect(upperBreakouts.length + lowerBreakouts.length).toBeGreaterThan(0);
        });
    });
    describe('Error Handling', () => {
        it('should handle empty data', () => {
            const emptyData = { open: [], high: [], low: [], close: [], volume: [] };
            expect(() => trueRange(emptyData)).toThrow();
            expect(() => atr(emptyData, 14)).toThrow();
            expect(() => bollingerBands(emptyData, 20, 2)).toThrow();
        });
        it('should handle invalid parameters', () => {
            expect(() => atr(testData, 0)).toThrow();
            expect(() => atr(testData, -1)).toThrow();
            expect(() => bollingerBands(testData, 0, 2)).toThrow();
            expect(() => bollingerBands(testData, 20, 0)).toThrow();
        });
        it('should handle insufficient data', () => {
            const shortData = {
                open: testData.open.slice(0, 10),
                high: testData.high.slice(0, 10),
                low: testData.low.slice(0, 10),
                close: testData.close.slice(0, 10),
                volume: testData.volume.slice(0, 10)
            };
            const atrResult = atr(shortData, 20);
            const bbResult = bollingerBands(shortData, 20, 2);
            // All values should be NaN when period > data length
            atrResult.forEach(value => {
                expect(value).toBeNaN();
            });
            bbResult.forEach(value => {
                expect(value).toBeNaN();
            });
        });
    });
    describe('Performance with Large Datasets', () => {
        it('should handle large datasets efficiently', () => {
            const largeData = loadTestData();
            const startTime = performance.now();
            const bbResult = bollingerBands(largeData, 20);
            const endTime = performance.now();
            expect(bbResult.length).toBe(largeData.close.length);
            expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
        });
        it('should work with volatile data', () => {
            const volatileData = loadTestData();
            const bbResult = bollingerBands(volatileData, 20);
            expect(bbResult.length).toBe(volatileData.close.length);
            // In volatile data, bands should be wider
            const validBands = bbResult.filter(band => !isNaN(band?.upper));
            if (validBands.length > 0) {
                const bandWidths = validBands.map(band => band.upper - band.lower);
                const avgBandWidth = bandWidths.reduce((sum, width) => sum + width, 0) / bandWidths.length;
                expect(avgBandWidth).toBeGreaterThan(0);
            }
        });
        it('should work with stable data', () => {
            const lowVolData = loadTestData();
            const bbResult = bollingerBands(lowVolData, 20);
            expect(bbResult.length).toBe(lowVolData.close.length);
            // In stable data, bands should be narrower
            const validBands = bbResult.filter(band => !isNaN(band?.upper));
            if (validBands.length > 0) {
                const bandWidths = validBands.map(band => band.upper - band.lower);
                const avgBandWidth = bandWidths.reduce((sum, width) => sum + width, 0) / bandWidths.length;
                expect(avgBandWidth).toBeGreaterThan(0);
            }
        });
    });
    describe('Real Market Scenarios', () => {
        it('should handle high volatility periods', () => {
            const volatileData = loadTestData(50, 150); // Volatile period
            const atrResult = atr(volatileData, 14);
            // In volatile periods, ATR should be higher
            const validATR = atrResult.filter(val => !isNaN(val));
            const avgATR = validATR.reduce((sum, val) => sum + val, 0) / validATR.length;
            const avgPrice = volatileData.close.reduce((sum, price) => sum + price, 0) / volatileData.close.length;
            // ATR should be a reasonable percentage of average price
            expect(avgATR).toBeGreaterThan(avgPrice * 0.01); // At least 1%
            expect(avgATR).toBeLessThan(avgPrice * 0.1); // Less than 10%
        });
        it('should handle low volatility periods', () => {
            const lowVolData = loadTestData(200, 300); // Lower volatility period
            const bbResult = bollingerBands(lowVolData, 20, 2);
            // In low volatility periods, bands should be closer together
            const validBands = bbResult.filter(band => !isNaN(band?.upper));
            const bandWidths = validBands.map(band => band.upper - band.lower);
            const avgBandWidth = bandWidths.reduce((sum, width) => sum + width, 0) / bandWidths.length;
            const avgPrice = lowVolData.close.reduce((sum, price) => sum + price, 0) / lowVolData.close.length;
            // Band width should be reasonable relative to price
            expect(avgBandWidth).toBeLessThan(avgPrice * 0.2); // Less than 20% of average price
        });
    });
});
/**
 * Calculate standard deviation for testing
 */
function calculateStandardDeviation(values) {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
}
//# sourceMappingURL=volatility.test.js.map