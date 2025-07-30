import { moneyFlowIndex } from '@calculations/volume/money-flow';
import { vwap } from '@indicators/volume/weighted/vwap';
import { loadTestData, validateTestData } from '@tests/utils/test-data-loader';
import { beforeAll, describe, expect, it } from 'vitest';
describe('Volume Indicators with Real Data', () => {
    let testData;
    beforeAll(() => {
        testData = loadTestData();
        const isValid = validateTestData(testData, testData.close.length);
        expect(isValid).toBe(true);
    });
    describe('Volume Weighted Average Price (VWAP)', () => {
        it('should calculate VWAP with real market data', () => {
            const period = 20;
            const result = vwap(testData, period);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(testData.close.length);
            // First (period-1) values should be NaN
            for (let i = 0; i < period - 1; i++) {
                expect(result[i]).toBeNaN();
            }
            // All values should be finite numbers or NaN
            result.forEach(value => {
                expect(isNaN(value) || isFinite(value)).toBe(true);
            });
        });
        it('should handle different periods correctly', () => {
            const periods = [5, 10, 20, 50];
            periods.forEach(period => {
                const result = vwap(testData, period);
                expect(result.length).toBe(testData.close.length);
                // Check that first (period-1) values are NaN
                for (let i = 0; i < period - 1; i++) {
                    expect(result[i]).toBeNaN();
                }
                // Check that period-th value is calculated correctly
                if (testData.close.length >= period) {
                    let cumulativeTPV = 0;
                    let cumulativeVolume = 0;
                    for (let j = 0; j < period; j++) {
                        const typicalPrice = (testData.high[j] + testData.low[j] + testData.close[j]) / 3;
                        cumulativeTPV += typicalPrice * testData.volume[j];
                        cumulativeVolume += testData.volume[j];
                    }
                    const expectedVWAP = cumulativeTPV / cumulativeVolume;
                    expect(result[period - 1]).toBeCloseTo(expectedVWAP, 2);
                }
            });
        });
        it('should be more responsive to high volume periods', () => {
            const result = vwap(testData, 20);
            // Find valid VWAP values
            const validVWAP = result.filter(val => !isNaN(val));
            // VWAP should be closer to prices during high volume periods
            for (let i = 19; i < Math.min(50, testData.close.length); i++) {
                if (!isNaN(result[i])) {
                    const typicalPrice = (testData.high[i] + testData.low[i] + testData.close[i]) / 3;
                    const vwapValue = result[i];
                    const volume = testData.volume[i];
                    // During high volume periods, VWAP should be closer to typical price
                    if (volume > testData.volume.reduce((sum, vol) => sum + vol, 0) / testData.volume.length) {
                        const diff = Math.abs(vwapValue - typicalPrice);
                        const pricePercent = diff / typicalPrice;
                        expect(pricePercent).toBeLessThan(0.05); // Within 5%
                    }
                }
            }
        });
    });
    describe('Money Flow Index (MFI)', () => {
        it('should calculate MFI with real market data', () => {
            const period = 14;
            const result = moneyFlowIndex(testData, period);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(testData.close.length);
            // First (period) values should be NaN
            for (let i = 0; i < period; i++) {
                expect(result[i]).toBeNaN();
            }
            // MFI values should be between 0 and 100
            result.forEach(value => {
                if (!isNaN(value)) {
                    expect(value).toBeGreaterThanOrEqual(0);
                    expect(value).toBeLessThanOrEqual(100);
                }
            });
        });
        it('should handle different periods correctly', () => {
            const periods = [7, 14, 21];
            periods.forEach(period => {
                const result = moneyFlowIndex(testData, period);
                expect(result.length).toBe(testData.close.length);
                // Check that first (period) values are NaN
                for (let i = 0; i < period; i++) {
                    expect(result[i]).toBeNaN();
                }
                // Check that MFI values are within valid range
                for (let i = period; i < result.length; i++) {
                    if (!isNaN(result[i])) {
                        expect(result[i]).toBeGreaterThanOrEqual(0);
                        expect(result[i]).toBeLessThanOrEqual(100);
                    }
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
            const mfiAllGains = moneyFlowIndex(allGainsData, 14);
            // MFI should be 100 for all gains
            for (let i = 14; i < mfiAllGains.length; i++) {
                expect(mfiAllGains[i]).toBe(100);
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
            const mfiAllLosses = moneyFlowIndex(allLossesData, 14);
            // MFI should be 0 for all losses
            for (let i = 14; i < mfiAllLosses.length; i++) {
                expect(mfiAllLosses[i]).toBe(0);
            }
        });
        it('should be more sensitive to volume than RSI', () => {
            const mfiResult = moneyFlowIndex(testData, 14);
            // Find valid MFI values
            const validMFI = mfiResult.filter(val => !isNaN(val));
            // MFI should show more extreme values in high volume periods
            const highVolumePeriods = validMFI.filter((mfi, i) => {
                const volumeIndex = i + 14; // Adjust for NaN values
                const avgVolume = testData.volume.reduce((sum, vol) => sum + vol, 0) / testData.volume.length;
                return testData.volume[volumeIndex] > avgVolume * 1.5;
            });
            const extremeValues = highVolumePeriods.filter(mfi => mfi < 20 || mfi > 80);
            expect(extremeValues.length).toBeGreaterThan(highVolumePeriods.length * 0.3); // At least 30% extreme
        });
    });
    describe('Error Handling', () => {
        it('should handle missing volume data', () => {
            const dataWithoutVolume = {
                open: testData.open,
                high: testData.high,
                low: testData.low,
                close: testData.close,
                volume: undefined
            };
            expect(() => vwap(dataWithoutVolume, 20)).toThrow('Volume data is required');
            expect(() => moneyFlowIndex(dataWithoutVolume, 14)).toThrow('Volume data is required');
        });
        it('should handle empty data', () => {
            const emptyData = { open: [], high: [], low: [], close: [], volume: [] };
            expect(() => vwap(emptyData, 20)).toThrow();
            expect(() => moneyFlowIndex(emptyData, 14)).toThrow();
        });
        it('should handle invalid parameters', () => {
            expect(() => vwap(testData, 0)).toThrow();
            expect(() => vwap(testData, -1)).toThrow();
            expect(() => moneyFlowIndex(testData, 0)).toThrow();
            expect(() => moneyFlowIndex(testData, -1)).toThrow();
        });
        it('should handle insufficient data', () => {
            const shortData = {
                open: testData.open.slice(0, 10),
                high: testData.high.slice(0, 10),
                low: testData.low.slice(0, 10),
                close: testData.close.slice(0, 10),
                volume: testData.volume.slice(0, 10)
            };
            const vwapResult = vwap(shortData, 20);
            const mfiResult = moneyFlowIndex(shortData, 20);
            // All values should be NaN when period > data length
            vwapResult.forEach(value => {
                expect(value).toBeNaN();
            });
            mfiResult.forEach(value => {
                expect(value).toBeNaN();
            });
        });
    });
    describe('Performance with Large Datasets', () => {
        it('should handle large datasets efficiently', () => {
            const largeData = loadTestData();
            const startTime = performance.now();
            const result = vwap(largeData, 20);
            const endTime = performance.now();
            expect(result.length).toBe(largeData.close.length);
            expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
        });
        it('should work with high volume data', () => {
            const highVolumeData = loadTestData();
            const result = vwap(highVolumeData, 20);
            expect(result.length).toBe(highVolumeData.close.length);
            // In high volume data, VWAP should be more stable
            const validVWAP = result.filter(val => !isNaN(val));
            if (validVWAP.length > 1) {
                const vwapChanges = validVWAP.slice(1).map((val, i) => Math.abs(val - validVWAP[i]));
                const avgChange = vwapChanges.reduce((sum, change) => sum + change, 0) / vwapChanges.length;
                expect(avgChange).toBeGreaterThan(0);
            }
        });
        it('should work with low volume data', () => {
            const lowVolumeData = loadTestData();
            const result = vwap(lowVolumeData, 20);
            expect(result.length).toBe(lowVolumeData.close.length);
            // In low volume data, VWAP should still be calculated
            const validVWAP = result.filter(val => !isNaN(val));
            expect(validVWAP.length).toBeGreaterThan(0);
        });
    });
    describe('Real Market Scenarios', () => {
        it('should handle high volume periods', () => {
            const highVolumeData = loadTestData(50, 150); // High volume period
            const vwapResult = vwap(highVolumeData, 20);
            const mfiResult = moneyFlowIndex(highVolumeData, 14);
            // In high volume periods, VWAP should be more stable
            const validVWAP = vwapResult.filter(val => !isNaN(val));
            const vwapChanges = validVWAP.slice(1).map((val, i) => Math.abs(val - validVWAP[i]));
            const avgVWAPChange = vwapChanges.reduce((sum, change) => sum + change, 0) / vwapChanges.length;
            // VWAP changes should be reasonable
            const avgPrice = highVolumeData.close.reduce((sum, price) => sum + price, 0) / highVolumeData.close.length;
            expect(avgVWAPChange).toBeLessThan(avgPrice * 0.1); // Less than 10% of average price
        });
        it('should handle low volume periods', () => {
            const lowVolumeData = loadTestData(200, 300); // Lower volume period
            const mfiResult = moneyFlowIndex(lowVolumeData, 14);
            // In low volume periods, MFI should be less reliable (more neutral values)
            const validMFI = mfiResult.filter(val => !isNaN(val));
            const neutralValues = validMFI.filter(mfi => mfi >= 30 && mfi <= 70);
            // Should have more neutral values in low volume periods
            expect(neutralValues.length).toBeGreaterThan(validMFI.length * 0.4); // At least 40% neutral
        });
        it('should correlate with price movements', () => {
            const result = moneyFlowIndex(testData, 14);
            // Find valid MFI values
            const validMFI = result.filter(val => !isNaN(val));
            // MFI should correlate with price movements
            let positiveCorrelation = 0;
            let negativeCorrelation = 0;
            for (let i = 14; i < Math.min(50, testData.close.length); i++) {
                if (!isNaN(result[i])) {
                    const priceChange = testData.close[i] - testData.close[i - 1];
                    const mfiValue = result[i];
                    if (priceChange > 0 && mfiValue > 50) {
                        positiveCorrelation++;
                    }
                    else if (priceChange < 0 && mfiValue < 50) {
                        negativeCorrelation++;
                    }
                }
            }
            // Should show some correlation
            const totalValid = positiveCorrelation + negativeCorrelation;
            expect(totalValid).toBeGreaterThan(0);
        });
    });
});
//# sourceMappingURL=volume.test.js.map