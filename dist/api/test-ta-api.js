// Test the TA API
import { ta } from './ta';
const testData = [10, 20, 15, 25, 12, 18, 22, 16, 14, 19];
// Market data for indicators that require OHLC
const marketData = {
    open: [10, 12, 14, 16, 18],
    high: [15, 17, 19, 21, 23],
    low: [8, 10, 12, 14, 16],
    close: [12, 14, 16, 18, 20],
    volume: [1000, 1200, 1400, 1600, 1800]
};
console.log('Original data:', testData);
console.log('Highest (3):', ta.highest(testData, 3));
console.log('Lowest (3):', ta.lowest(testData, 3));
console.log('Change:', ta.change(testData));
console.log('Percent Change:', ta.percentChange(testData));
console.log('SMA (3):', ta.sma(testData, 3));
console.log('EMA (3):', ta.ema(testData, 3));
console.log('WMA (3):', ta.wma(testData, 3));
console.log('Hull (3):', ta.hull(testData, 3));
console.log('RSI (3):', ta.rsi(testData, 3));
console.log('Bollinger Bands (3):', ta.bollingerBands(testData, 3));
// Test new momentum indicators
console.log('MACD:', ta.macd(testData, 3, 6, 3));
console.log('Stochastic:', ta.stochastic(marketData, 3, 3));
console.log('Williams %R:', ta.williamsR(marketData, 3));
console.log('CCI:', ta.cci(marketData, 3));
// Test new volatility indicators
console.log('ATR:', ta.atr(marketData, 3));
console.log('Keltner Channel:', ta.keltnerChannel(marketData, 3));
console.log('Donchian Channel:', ta.donchianChannel(marketData, 3));
// Test math functions
console.log('Abs:', ta.abs([-5, 10, -15]));
console.log('Rolling Min (3):', ta.rollingMin(testData, 3));
console.log('Rolling Max (3):', ta.rollingMax(testData, 3));
console.log('Sum:', ta.sum(testData));
console.log('Average:', ta.average(testData));
// Test price calculations
console.log('HL2:', ta.hl2(marketData));
console.log('HLC3:', ta.hlc3(marketData));
console.log('OHLC4:', ta.ohlc4(marketData));
// Test volume indicators
console.log('OBV:', ta.obv(marketData));
console.log('VWAP:', ta.vwap(marketData));
console.log('MFI:', ta.mfi(marketData, 3));
// Test utility functions
console.log('Safe Division (10/2):', ta.safeDivision(10, 2));
console.log('Safe Division (10/0):', ta.safeDivision(10, 0));
console.log('Sanitize Array:', ta.sanitizeArray([1, NaN, 3, Infinity, 5]));
console.log('Fill NaN (5, 2):', ta.fillNaN(5, 2));
console.log('Shift Array:', ta.shiftArray([1, 2, 3, 4], 2));
// Test Pine Script interfaces
console.log('Pine Core Highest:', ta.pine.highest(testData, 3));
console.log('Pine Math Abs:', ta.math.abs([-5, 10, -15]));
console.log('Pine Array Change:', ta.array.change(testData));
console.log('Pine Price HL2:', ta.price.hl2(marketData));
//# sourceMappingURL=test-ta-api.js.map