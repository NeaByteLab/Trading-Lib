import { ta } from '@api/ta';
import { beforeAll, describe, expect, it } from '@jest/globals';
import { getTestDataByType, loadTestData, loadTestDataSubset } from '@tests/utils/data-loader';
describe('TA API', () => {
    let testData;
    let marketData;
    let trendingData;
    let volatileData;
    let stableData;
    beforeAll(() => {
        testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        marketData = loadTestData();
        trendingData = getTestDataByType('trending', 100);
        volatileData = getTestDataByType('volatile', 100);
        stableData = getTestDataByType('sideways', 100);
    });
    describe('Math Functions', () => {
        it('should calculate absolute values', () => {
            expect(ta.abs(-5)).toBe(5);
            expect(ta.abs(10)).toBe(10);
            expect(ta.abs(-15)).toBe(15);
        });
        it('should calculate square root', () => {
            expect(ta.sqrt(4)).toBe(2);
            expect(ta.sqrt(9)).toBe(3);
            expect(ta.sqrt(16)).toBe(4);
        });
        it('should calculate power', () => {
            expect(ta.pow(2, 3)).toBe(8);
            expect(ta.pow(3, 2)).toBe(9);
            expect(ta.pow(4, 2)).toBe(16);
        });
        it('should calculate floor and ceiling', () => {
            expect(ta.floor(3.7)).toBe(3);
            expect(ta.ceil(3.2)).toBe(4);
            expect(ta.floor(-3.7)).toBe(-4);
            expect(ta.ceil(-3.2)).toBe(-3);
        });
        it('should calculate sign', () => {
            expect(ta.sign(-5)).toBe(-1);
            expect(ta.sign(0)).toBe(0);
            expect(ta.sign(5)).toBe(1);
        });
        it('should calculate exponential', () => {
            expect(ta.exp(0)).toBe(1);
            expect(ta.exp(1)).toBeCloseTo(Math.E, 5);
        });
        it('should calculate factorial', () => {
            expect(ta.factorial(0)).toBe(1);
            expect(ta.factorial(1)).toBe(1);
            expect(ta.factorial(5)).toBe(120);
        });
        it('should calculate GCD and LCM', () => {
            expect(ta.gcd(12, 18)).toBe(6);
            expect(ta.lcm(12, 18)).toBe(36);
        });
    });
    describe('Array Functions', () => {
        it('should calculate sum', () => {
            expect(ta.sum(testData)).toBe(55);
            expect(ta.sum([1, 2, 3])).toBe(6);
        });
        it('should calculate average', () => {
            expect(ta.average(testData)).toBe(5.5);
            expect(ta.average([1, 2, 3])).toBe(2);
        });
        it('should find min and max', () => {
            expect(ta.min(testData)).toBe(1);
            expect(ta.max(testData)).toBe(10);
        });
        it('should calculate highest and lowest with CSV data', () => {
            const result = ta.highest(marketData.close, 20);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(marketData.close.length);
            // Test with volatile data
            const volatileResult = ta.highest(volatileData.close, 10);
            expect(Array.isArray(volatileResult)).toBe(true);
            expect(volatileResult.length).toBe(volatileData.close.length);
        });
        it('should calculate changes', () => {
            const result = ta.change(10, 5);
            expect(result).toBe(5);
        });
        it('should clamp values', () => {
            expect(ta.clamp(5, 0, 10)).toBe(5);
            expect(ta.clamp(-5, 0, 10)).toBe(0);
            expect(ta.clamp(15, 0, 10)).toBe(10);
        });
        it('should round values', () => {
            expect(ta.round(3.14159, 2)).toBe(3.14);
            expect(ta.round(3.14159, 3)).toBe(3.142);
        });
    });
    describe('Price Calculations', () => {
        it('should calculate HL2', () => {
            const result = ta.hl2(marketData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(marketData.high.length);
            expect(result[0]).toBe((marketData.high[0] + marketData.low[0]) / 2);
        });
        it('should calculate HLC3', () => {
            const result = ta.hlc3(marketData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(marketData.high.length);
            expect(result[0]).toBe((marketData.high[0] + marketData.low[0] + marketData.close[0]) / 3);
        });
        it('should calculate OHLC4', () => {
            const result = ta.ohlc4(marketData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(marketData.high.length);
            expect(result[0]).toBe((marketData.open[0] + marketData.high[0] + marketData.low[0] + marketData.close[0]) / 4);
        });
        it('should calculate price levels with trending data', () => {
            const hl2Result = ta.hl2(trendingData);
            const hlc3Result = ta.hlc3(trendingData);
            const ohlc4Result = ta.ohlc4(trendingData);
            expect(Array.isArray(hl2Result)).toBe(true);
            expect(Array.isArray(hlc3Result)).toBe(true);
            expect(Array.isArray(ohlc4Result)).toBe(true);
            expect(hl2Result.length).toBe(trendingData.high.length);
            expect(hlc3Result.length).toBe(trendingData.high.length);
            expect(ohlc4Result.length).toBe(trendingData.high.length);
            expect(trendingData.high.length).toBe(100);
        });
    });
    describe('Moving Averages', () => {
        it('should calculate SMA', () => {
            const period = 3;
            const result = ta.sma(testData, period);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length - period + 1);
            expect(result[0]).toBeCloseTo(2, 1); // First value should be average of [1,2,3]
        });
        it('should calculate EMA', () => {
            const result = ta.ema(testData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
            expect(result[0]).toBeNaN(); // First value should be NaN due to insufficient data
        });
        it('should calculate WMA', () => {
            const period = 3;
            const result = ta.wma(testData, period);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length - period + 1);
            expect(result[0]).not.toBeNaN();
        });
        it('should calculate Hull MA', () => {
            const result = ta.hull(testData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
        it('should calculate moving averages with CSV data', () => {
            const smaResult = ta.sma(marketData.close, 20);
            const emaResult = ta.ema(marketData.close, 20);
            const wmaResult = ta.wma(marketData.close, 20);
            const hullResult = ta.hull(marketData.close, 20);
            expect(Array.isArray(smaResult)).toBe(true);
            expect(Array.isArray(emaResult)).toBe(true);
            expect(Array.isArray(wmaResult)).toBe(true);
            expect(Array.isArray(hullResult)).toBe(true);
            expect(smaResult.length).toBeGreaterThan(0);
            expect(emaResult.length).toBeGreaterThan(0);
            expect(wmaResult.length).toBeGreaterThan(0);
            expect(hullResult.length).toBeGreaterThan(0);
        });
        it('should calculate moving averages with trending data', () => {
            const smaResult = ta.sma(trendingData.close, 14);
            const emaResult = ta.ema(trendingData.close, 14);
            expect(Array.isArray(smaResult)).toBe(true);
            expect(Array.isArray(emaResult)).toBe(true);
            expect(smaResult.length).toBeGreaterThan(0);
            expect(emaResult.length).toBeGreaterThan(0);
        });
        it('should calculate moving averages with volatile data', () => {
            const smaResult = ta.sma(volatileData.close, 10);
            const emaResult = ta.ema(volatileData.close, 10);
            expect(Array.isArray(smaResult)).toBe(true);
            expect(Array.isArray(emaResult)).toBe(true);
            expect(smaResult.length).toBeGreaterThan(0);
            expect(emaResult.length).toBeGreaterThan(0);
        });
    });
    describe('Momentum Indicators', () => {
        it('should calculate RSI', () => {
            const result = ta.rsi(testData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
        it('should calculate CCI', () => {
            const result = ta.cci(marketData, 20);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(marketData.close.length);
        });
        it('should calculate MACD', () => {
            const result = ta.macd(testData, 3, 5, 2);
            expect(result).toHaveProperty('macd');
            expect(result).toHaveProperty('signal');
            expect(result).toHaveProperty('histogram');
            expect(Array.isArray(result.macd)).toBe(true);
            expect(Array.isArray(result.signal)).toBe(true);
            expect(Array.isArray(result.histogram)).toBe(true);
        });
        it('should calculate momentum indicators with CSV data', () => {
            const rsiResult = ta.rsi(marketData.close, 14);
            const macdResult = ta.macd(marketData.close, 12, 26, 9);
            const cciResult = ta.cci(marketData, 20); // Use market data instead of array
            expect(Array.isArray(rsiResult)).toBe(true);
            expect(Array.isArray(macdResult.macd)).toBe(true);
            expect(Array.isArray(cciResult)).toBe(true);
            expect(rsiResult.length).toBe(marketData.close.length);
            expect(macdResult.macd.length).toBe(marketData.close.length);
            expect(cciResult.length).toBe(marketData.close.length);
        });
        it('should calculate momentum indicators with trending data', () => {
            const rsiResult = ta.rsi(trendingData.close, 14);
            const macdResult = ta.macd(trendingData.close, 12, 26, 9);
            const cciResult = ta.cci(trendingData, 20);
            expect(Array.isArray(rsiResult)).toBe(true);
            expect(Array.isArray(macdResult.macd)).toBe(true);
            expect(Array.isArray(cciResult)).toBe(true);
            expect(rsiResult.length).toBe(trendingData.close.length);
            expect(macdResult.macd.length).toBe(trendingData.close.length);
            expect(cciResult.length).toBe(trendingData.close.length);
        });
        it('should calculate momentum indicators with volatile data', () => {
            const rsiResult = ta.rsi(volatileData.close, 14);
            const macdResult = ta.macd(volatileData.close, 12, 26, 9);
            const cciResult = ta.cci(volatileData, 20);
            expect(Array.isArray(rsiResult)).toBe(true);
            expect(Array.isArray(macdResult.macd)).toBe(true);
            expect(Array.isArray(cciResult)).toBe(true);
            expect(rsiResult.length).toBe(volatileData.close.length);
            expect(macdResult.macd.length).toBe(volatileData.close.length);
            expect(cciResult.length).toBe(volatileData.close.length);
        });
    });
    describe('Volatility Indicators', () => {
        it('should calculate Bollinger Bands', () => {
            const result = ta.bbands(testData, 3, 2);
            expect(result).toHaveProperty('upper');
            expect(result).toHaveProperty('middle');
            expect(result).toHaveProperty('lower');
            expect(Array.isArray(result.upper)).toBe(true);
            expect(Array.isArray(result.middle)).toBe(true);
            expect(Array.isArray(result.lower)).toBe(true);
        });
        it('should calculate volatility indicators with CSV data', () => {
            const bbResult = ta.bbands(marketData.close, 20, 2);
            const atrResult = ta.atr(marketData, 14);
            const stdResult = ta.std(marketData.close, 20);
            expect(bbResult).toHaveProperty('upper');
            expect(bbResult).toHaveProperty('middle');
            expect(bbResult).toHaveProperty('lower');
            expect(Array.isArray(atrResult)).toBe(true);
            expect(Array.isArray(stdResult)).toBe(true);
            expect(bbResult.upper.length).toBeGreaterThan(0);
            expect(bbResult.middle.length).toBeGreaterThan(0);
            expect(bbResult.lower.length).toBeGreaterThan(0);
            expect(atrResult.length).toBeGreaterThan(0);
            expect(stdResult.length).toBeGreaterThan(0);
        });
        it('should calculate volatility indicators with volatile data', () => {
            const bbResult = ta.bbands(volatileData.close, 20, 2);
            const atrResult = ta.atr(volatileData, 14);
            expect(bbResult).toHaveProperty('upper');
            expect(bbResult).toHaveProperty('middle');
            expect(bbResult).toHaveProperty('lower');
            expect(Array.isArray(atrResult)).toBe(true);
            expect(bbResult.upper.length).toBeGreaterThan(0);
            expect(bbResult.middle.length).toBeGreaterThan(0);
            expect(bbResult.lower.length).toBeGreaterThan(0);
            expect(atrResult.length).toBeGreaterThan(0);
        });
    });
    describe('Volume Indicators', () => {
        it('should calculate volume indicators with CSV data', () => {
            const adResult = ta.ad(marketData);
            const obvResult = ta.obv(marketData);
            const mfiResult = ta.mfi(marketData, 14);
            const vwapResult = ta.vwap(marketData, 20);
            expect(Array.isArray(adResult)).toBe(true);
            expect(Array.isArray(obvResult)).toBe(true);
            expect(Array.isArray(mfiResult)).toBe(true);
            expect(Array.isArray(vwapResult)).toBe(true);
            expect(adResult.length).toBeGreaterThan(0);
            expect(obvResult.length).toBeGreaterThan(0);
            expect(mfiResult.length).toBeGreaterThan(0);
            expect(vwapResult.length).toBeGreaterThan(0);
        });
        it('should calculate volume indicators with trending data', () => {
            const adResult = ta.ad(trendingData);
            const obvResult = ta.obv(trendingData);
            expect(Array.isArray(adResult)).toBe(true);
            expect(Array.isArray(obvResult)).toBe(true);
            expect(adResult.length).toBeGreaterThan(0);
            expect(obvResult.length).toBeGreaterThan(0);
        });
    });
    describe('Volume Indicators - Algorithmic Fixes', () => {
        it('should handle division by zero in PVT', () => {
            const testData = {
                open: [100, 100, 100, 100, 100],
                high: [105, 105, 105, 105, 105],
                low: [95, 95, 95, 95, 95],
                close: [100, 0, 100, 100, 100],
                volume: [1000, 1000, 1000, 1000, 1000]
            };
            const pvt = ta.pvt(testData);
            expect(Array.isArray(pvt)).toBe(true);
            expect(pvt.length).toBe(testData.close.length);
            // Should not throw error and should handle zero values gracefully
            expect(pvt[1]).not.toBe(Infinity);
            expect(pvt[1]).not.toBe(NaN);
        });
        it('should handle large volume values in VWAP without overflow', () => {
            const period = 3;
            const testData = {
                open: [100, 100, 100, 100, 100],
                high: [105, 105, 105, 105, 105],
                low: [95, 95, 95, 95, 95],
                close: [100, 101, 102, 103, 104],
                volume: [1000000000, 1000000000, 1000, 1000, 1000]
            };
            const vwap = ta.vwap(testData, period);
            expect(Array.isArray(vwap)).toBe(true);
            expect(vwap.length).toBe(testData.close.length - period + 1);
            expect(vwap.every(val => isFinite(val) || isNaN(val))).toBe(true);
        });
        it('should handle edge cases in MFI correctly', () => {
            const period = 3;
            const testData = {
                open: [100, 100, 100, 100, 100],
                high: [105, 105, 105, 105, 105],
                low: [95, 95, 95, 95, 95],
                close: [100, 100, 100, 100, 100],
                volume: [1000, 1000, 1000, 1000, 1000]
            };
            const mfi = ta.mfi(testData, period);
            expect(Array.isArray(mfi)).toBe(true);
            expect(mfi.length).toBe(testData.close.length - period + 1);
            expect(mfi.every(val => val === 50 || isNaN(val))).toBe(true);
        });
        it('should handle precision issues in Amihud Illiquidity', () => {
            const testData = {
                open: [100, 100, 100, 100, 100],
                high: [105, 105, 105, 105, 105],
                low: [95, 95, 95, 95, 95],
                close: [100, 101, 102, 103, 104],
                volume: [0.000001, 0.000001, 0.000001, 0.000001, 0.000001] // Very small volumes
            };
            const amihud = ta.amihud(testData, 3);
            expect(Array.isArray(amihud)).toBe(true);
            expect(amihud.length).toBe(testData.close.length);
            // Should handle precision issues gracefully
            expect(amihud.every(val => isFinite(val) || isNaN(val))).toBe(true);
        });
        it('should handle array bounds correctly in window processing', () => {
            const largeData = Array.from({ length: 1000000 }, (_, i) => i); // Large array
            // Test that window processing doesn't cause overflow
            const result = ta.highest(largeData, 100);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(largeData.length);
            // Should not throw error with large arrays
            expect(result.every(val => isFinite(val) || isNaN(val))).toBe(true);
        });
    });
    describe('Trend Indicators', () => {
        it('should calculate trend indicators with CSV data', () => {
            const ichimokuResult = ta.ichimoku(marketData);
            const supertrendResult = ta.supertrend(marketData, 10, 3);
            const psarResult = ta.psar(marketData, 0.02, 0.2);
            expect(ichimokuResult).toHaveProperty('tenkan');
            expect(ichimokuResult).toHaveProperty('kijun');
            expect(ichimokuResult).toHaveProperty('senkouA');
            expect(ichimokuResult).toHaveProperty('senkouB');
            expect(ichimokuResult).toHaveProperty('chikou');
            expect(supertrendResult).toHaveProperty('superTrend');
            expect(supertrendResult).toHaveProperty('direction');
            expect(Array.isArray(psarResult)).toBe(true);
            expect(Array.isArray(ichimokuResult.tenkan)).toBe(true);
            expect(Array.isArray(ichimokuResult.kijun)).toBe(true);
            expect(Array.isArray(ichimokuResult.senkouA)).toBe(true);
            expect(Array.isArray(ichimokuResult.senkouB)).toBe(true);
            expect(Array.isArray(ichimokuResult.chikou)).toBe(true);
            expect(Array.isArray(supertrendResult.superTrend)).toBe(true);
            expect(Array.isArray(supertrendResult.direction)).toBe(true);
            expect(psarResult.length).toBeGreaterThan(0);
        });
        it('should calculate trend indicators with trending data', () => {
            const ichimokuResult = ta.ichimoku(trendingData);
            const supertrendResult = ta.supertrend(trendingData, 10, 3);
            expect(ichimokuResult).toHaveProperty('tenkan');
            expect(ichimokuResult).toHaveProperty('kijun');
            expect(supertrendResult).toHaveProperty('superTrend');
            expect(supertrendResult).toHaveProperty('direction');
            expect(Array.isArray(ichimokuResult.tenkan)).toBe(true);
            expect(Array.isArray(ichimokuResult.kijun)).toBe(true);
            expect(Array.isArray(supertrendResult.superTrend)).toBe(true);
            expect(Array.isArray(supertrendResult.direction)).toBe(true);
        });
    });
    describe('Statistical Functions', () => {
        it('should calculate mean', () => {
            expect(ta.mean([1, 2, 3, 4, 5])).toBe(3);
        });
        it('should calculate variance', () => {
            const data = [1, 2, 3, 4, 5];
            const result = ta.variance(data);
            expect(result).toBeCloseTo(2.5, 1); // Use proper precision
        });
        it('should calculate standard deviation', () => {
            const data = [1, 2, 3, 4, 5];
            const result = ta.stdev(data);
            expect(result).toBeCloseTo(1.58, 1); // Use proper precision
        });
        it('should calculate statistics with CSV data', () => {
            const mean = ta.mean(marketData.close.slice(0, 100));
            const variance = ta.variance(marketData.close.slice(0, 100));
            const stdev = ta.stdev(marketData.close.slice(0, 100));
            expect(typeof mean).toBe('number');
            expect(typeof variance).toBe('number');
            expect(typeof stdev).toBe('number');
            expect(mean).toBeGreaterThan(0);
            expect(variance).toBeGreaterThanOrEqual(0);
            expect(stdev).toBeGreaterThanOrEqual(0);
        });
    });
    describe('Utility Functions', () => {
        it('should perform safe division', () => {
            expect(ta.div(10, 2)).toBe(5);
            expect(ta.div(10, 0)).toBe(0);
        });
        it('should fill arrays with NaN', () => {
            const result = ta.fill([1, NaN, 3, 4], 0);
            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([1, 0, 3, 4]);
        });
        it('should shift arrays', () => {
            const result = ta.shiftArray([1, 2, 3, 4], 2);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(4);
        });
        it('should calculate rolling statistics with CSV data', () => {
            const rollingMean = ta.rolling(marketData.close.slice(0, 50), 10, 'mean');
            const rollingMin = ta.rolling(marketData.close.slice(0, 50), 10, 'min');
            const rollingMax = ta.rolling(marketData.close.slice(0, 50), 10, 'max');
            expect(Array.isArray(rollingMean)).toBe(true);
            expect(Array.isArray(rollingMin)).toBe(true);
            expect(Array.isArray(rollingMax)).toBe(true);
            expect(rollingMean.length).toBeGreaterThan(0);
            expect(rollingMin.length).toBeGreaterThan(0);
            expect(rollingMax.length).toBeGreaterThan(0);
        });
    });
    describe('Error Handling', () => {
        it('should handle empty arrays', () => {
            expect(ta.average([])).toBeNaN(); // Returns NaN for empty arrays
            expect(ta.sum([])).toBe(0); // Returns 0 for empty arrays
            expect(ta.min([])).toBeNaN(); // Returns NaN for empty arrays
            expect(ta.max([])).toBeNaN(); // Returns NaN for empty arrays
        });
        it('should handle invalid parameters', () => {
            expect(() => ta.sma(testData, 0)).toThrow();
            expect(() => ta.sma(testData, -1)).toThrow();
        });
        it('should handle null/undefined data', () => {
            expect(() => ta.sma(null, 3)).toThrow();
            expect(() => ta.sma(undefined, 3)).toThrow();
        });
    });
    describe('Real Market Data Integration', () => {
        it('should handle large datasets', () => {
            const largeData = loadTestDataSubset(0, 500);
            const rsiResult = ta.rsi(largeData.close, 14);
            const smaResult = ta.sma(largeData.close, 20);
            const bbResult = ta.bbands(largeData.close, 20, 2);
            expect(Array.isArray(rsiResult)).toBe(true);
            expect(Array.isArray(smaResult)).toBe(true);
            expect(bbResult).toHaveProperty('upper');
            expect(bbResult).toHaveProperty('middle');
            expect(bbResult).toHaveProperty('lower');
            expect(rsiResult.length).toBeGreaterThan(0);
            expect(smaResult.length).toBeGreaterThan(0);
            expect(bbResult.upper.length).toBeGreaterThan(0);
        });
        it('should handle different market conditions', () => {
            // Test with trending market
            const trendingRSI = ta.rsi(trendingData.close, 14);
            const trendingSMA = ta.sma(trendingData.close, 20);
            // Test with volatile market
            const volatileRSI = ta.rsi(volatileData.close, 14);
            const volatileSMA = ta.sma(volatileData.close, 20);
            // Test with stable market
            const stableRSI = ta.rsi(stableData.close, 14);
            const stableSMA = ta.sma(stableData.close, 20);
            expect(Array.isArray(trendingRSI)).toBe(true);
            expect(Array.isArray(trendingSMA)).toBe(true);
            expect(Array.isArray(volatileRSI)).toBe(true);
            expect(Array.isArray(volatileSMA)).toBe(true);
            expect(Array.isArray(stableRSI)).toBe(true);
            expect(Array.isArray(stableSMA)).toBe(true);
        });
    });
});
