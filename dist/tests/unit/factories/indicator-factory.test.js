import { createMovingAverageIndicator, createOscillatorIndicator } from '@core/factories/indicator-factory';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { calculateRSI } from '@utils/calculation-utils';
describe('Indicator Factory', () => {
    describe('createMovingAverageIndicator', () => {
        const testData = [10, 20, 15, 25, 12, 18, 22, 16, 14, 19];
        const marketData = {
            open: [10, 12, 14, 16, 18],
            high: [15, 17, 19, 21, 23],
            low: [8, 10, 12, 14, 16],
            close: [12, 14, 16, 18, 20],
            volume: [1000, 1200, 1400, 1600, 1800]
        };
        it('should create SMA indicator correctly', () => {
            const { class: SMA, function: sma } = createMovingAverageIndicator('SMA', 'Simple Moving Average', 'sma', DEFAULT_LENGTHS.SMA);
            expect(SMA.name).toBe('MovingAverageIndicator');
            expect(typeof sma).toBe('function');
            const result = sma(testData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
        it('should create EMA indicator correctly', () => {
            const { class: EMA, function: ema } = createMovingAverageIndicator('EMA', 'Exponential Moving Average', 'ema', DEFAULT_LENGTHS.EMA);
            expect(EMA.name).toBe('MovingAverageIndicator');
            expect(typeof ema).toBe('function');
            const result = ema(testData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
        it('should create WMA indicator correctly', () => {
            const { class: WMA, function: wma } = createMovingAverageIndicator('WMA', 'Weighted Moving Average', 'wma', DEFAULT_LENGTHS.WMA);
            expect(WMA.name).toBe('MovingAverageIndicator');
            expect(typeof wma).toBe('function');
            const result = wma(testData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
        it('should create Hull indicator correctly', () => {
            const { class: Hull, function: hull } = createMovingAverageIndicator('Hull', 'Hull Moving Average', 'hull', DEFAULT_LENGTHS.HULL);
            expect(Hull.name).toBe('MovingAverageIndicator');
            expect(typeof hull).toBe('function');
            const result = hull(testData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
        it('should handle market data correctly', () => {
            const { function: sma } = createMovingAverageIndicator('SMA', 'Simple Moving Average', 'sma', DEFAULT_LENGTHS.SMA);
            const result = sma(marketData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(marketData.close.length);
        });
        it('should use default length when not provided', () => {
            const { function: sma } = createMovingAverageIndicator('SMA', 'Simple Moving Average', 'sma', DEFAULT_LENGTHS.SMA);
            const result = sma(testData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
        it('should handle different source parameters', () => {
            const { function: sma } = createMovingAverageIndicator('SMA', 'Simple Moving Average', 'sma', DEFAULT_LENGTHS.SMA);
            const result = sma(marketData, 3, 'high');
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(marketData.high.length);
        });
    });
    describe('createOscillatorIndicator', () => {
        const testData = [10, 20, 15, 25, 12, 18, 22, 16, 14, 19];
        it('should create RSI indicator correctly', () => {
            const { class: RSI, function: rsi } = createOscillatorIndicator('RSI', 'Relative Strength Index', calculateRSI, DEFAULT_LENGTHS.RSI);
            expect(RSI.name).toBe('OscillatorIndicator');
            expect(typeof rsi).toBe('function');
            const result = rsi(testData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
        it('should handle market data correctly', () => {
            const marketData = {
                open: [10, 12, 14, 16, 18],
                high: [15, 17, 19, 21, 23],
                low: [8, 10, 12, 14, 16],
                close: [12, 14, 16, 18, 20],
                volume: [1000, 1200, 1400, 1600, 1800]
            };
            const { function: rsi } = createOscillatorIndicator('RSI', 'Relative Strength Index', calculateRSI, DEFAULT_LENGTHS.RSI);
            const result = rsi(marketData, 3);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(marketData.close.length);
        });
        it('should use default length when not provided', () => {
            const { function: rsi } = createOscillatorIndicator('RSI', 'Relative Strength Index', calculateRSI, DEFAULT_LENGTHS.RSI);
            const result = rsi(testData);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(testData.length);
        });
    });
});
//# sourceMappingURL=indicator-factory.test.js.map