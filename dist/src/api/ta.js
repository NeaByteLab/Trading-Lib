// Import Pine Script core functions
import { movingAverage } from '@calculations/moving-averages';
import { ArrayUtils } from '@utils/array-utils';
import * as CalculationUtils from '@utils/calculation-utils';
import { MathUtils } from '@utils/math-utils';
/**
 * Technical Analysis API
 *
 * Provides a unified Pine Script-like interface for all technical indicators.
 * All functions follow Pine Script v5 conventions and naming.
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const rsi = ta.rsi(data.close, 14)
 * const sma = ta.sma(data.close, 20)
 * const bb = ta.bbands(data.close, 20, 2)
 * ```
 */
export const ta = {
    // Math Functions
    abs: (value) => MathUtils.abs(value),
    sqrt: (value) => MathUtils.sqrt(value),
    pow: (base, exponent) => MathUtils.pow(base, exponent),
    log: (value) => MathUtils.log(value),
    log10: (value) => MathUtils.log10(value),
    sin: (value) => MathUtils.sin(value),
    cos: (value) => MathUtils.cos(value),
    tan: (value) => MathUtils.tan(value),
    asin: (value) => MathUtils.asin(value),
    acos: (value) => MathUtils.acos(value),
    atan: (value) => MathUtils.atan(value),
    floor: (value) => MathUtils.floor(value),
    ceil: (value) => MathUtils.ceil(value),
    sign: (value) => MathUtils.sign(value),
    exp: (value) => MathUtils.exp(value),
    mod: (dividend, divisor) => MathUtils.mod(dividend, divisor),
    rem: (dividend, divisor) => MathUtils.rem(dividend, divisor),
    factorial: (value) => MathUtils.factorial(value),
    gcd: (a, b) => MathUtils.gcd(a, b),
    lcm: (a, b) => MathUtils.lcm(a, b),
    sum: (array) => MathUtils.sum(array),
    average: (array) => MathUtils.average(array),
    min: (array) => MathUtils.min(array),
    max: (array) => MathUtils.max(array),
    highest: (array, windowSize = 14) => MathUtils.highest(array, windowSize),
    lowest: (array, windowSize = 14) => MathUtils.lowest(array, windowSize),
    change: (current, previous) => MathUtils.change(current, previous),
    clamp: (value, min, max) => MathUtils.clamp(value, min, max),
    round: (value, decimals = 0) => MathUtils.round(value, decimals),
    // Array Functions
    processArray: (data, processor) => ArrayUtils.processArray(data, processor),
    processWindow: (data, windowSize, processor) => ArrayUtils.processWindow(data, windowSize, processor),
    rollingStatistic: (data, windowSize, statistic) => ArrayUtils.rollingStatistic(data, windowSize, statistic),
    shift: (data, offset) => ArrayUtils.shift(data, offset),
    getWindowSlice: (data, currentIndex, windowSize) => ArrayUtils.getWindowSlice(data, currentIndex, windowSize),
    // Price Calculations
    hl2: (data) => CalculationUtils.PriceCalculations.hl2(data),
    hlc3: (data) => CalculationUtils.PriceCalculations.typical(data),
    ohlc4: (data) => CalculationUtils.PriceCalculations.ohlc4(data),
    // Calculation Functions
    fillNaN: (data, fillValue) => CalculationUtils.fillNaN(data, fillValue),
    shiftArray: (data, shift) => CalculationUtils.shiftArray(data, shift),
    calculateRSI: (data, length) => CalculationUtils.calculateRSI(data, length),
    calculateCCI: (data, length) => CalculationUtils.calculateCCI(data, length),
    calculateMean: (values) => CalculationUtils.calculateMean(values),
    calculateVariance: (values) => CalculationUtils.calculateVariance(values),
    calculateStandardDeviation: (values) => CalculationUtils.calculateStandardDeviation(values),
    calculateRollingStatistic: (data, windowSize, statistic) => CalculationUtils.calculateRollingStatistic(data, windowSize, statistic),
    exponentialSmoothing: (data, alpha) => CalculationUtils.exponentialSmoothing(data, alpha),
    wildersSmoothing: (data, length) => CalculationUtils.wildersSmoothing(data, length),
    safeDivision: (numerator, denominator) => CalculationUtils.safeDivision(numerator, denominator),
    calculateRangePercentage: (value, min, max, multiplier) => CalculationUtils.calculateRangePercentage(value, min, max, multiplier),
    calculateHighLowRange: (highData, lowData, currentIndex, windowSize) => CalculationUtils.calculateHighLowRange(highData, lowData, currentIndex, windowSize),
    // Moving Averages
    sma: (data, length) => movingAverage(data, length, 'sma'),
    ema: (data, length) => movingAverage(data, length, 'ema'),
    wma: (data, length) => movingAverage(data, length, 'wma'),
    hull: (data, length) => movingAverage(data, length, 'hull'),
    // Momentum Indicators
    rsi: (data, length = 14) => CalculationUtils.calculateRSI(data, length),
    cci: (data, length = 20) => CalculationUtils.calculateCCI(data, length),
    macd: (data, fastLength = 12, slowLength = 26, signalLength = 9) => {
        const fastEMA = movingAverage(data, fastLength, 'ema');
        const slowEMA = movingAverage(data, slowLength, 'ema');
        const macdLine = ArrayUtils.processArray(fastEMA, (fast, i) => {
            const slow = slowEMA[i];
            return fast !== undefined && slow !== undefined && !isNaN(fast) && !isNaN(slow) ? fast - slow : NaN;
        });
        const signal = movingAverage(macdLine, signalLength, 'ema');
        const histogram = ArrayUtils.processArray(macdLine, (macdVal, i) => {
            const signalVal = signal[i];
            return macdVal !== undefined && signalVal !== undefined && !isNaN(macdVal) && !isNaN(signalVal) ? macdVal - signalVal : NaN;
        });
        return { macd: macdLine, signal, histogram };
    },
    // Volatility Indicators
    bbands: (data, length = 20, multiplier = 2) => {
        const middle = movingAverage(data, length, 'sma');
        const stdDev = ArrayUtils.processWindow(data, length, (window) => CalculationUtils.calculateStandardDeviation(window));
        const upper = ArrayUtils.processArray(middle, (middleVal, i) => {
            const stdDevVal = stdDev[i];
            return middleVal !== undefined && stdDevVal !== undefined && !isNaN(middleVal) && !isNaN(stdDevVal) ? middleVal + (multiplier * stdDevVal) : NaN;
        });
        const lower = ArrayUtils.processArray(middle, (middleVal, i) => {
            const stdDevVal = stdDev[i];
            return middleVal !== undefined && stdDevVal !== undefined && !isNaN(middleVal) && !isNaN(stdDevVal) ? middleVal - (multiplier * stdDevVal) : NaN;
        });
        return { upper, middle, lower };
    }
};
