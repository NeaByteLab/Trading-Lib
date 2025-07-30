import type { MarketData } from '@core/types/indicator-types';
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
export declare const ta: {
    abs: (value: number) => number;
    sqrt: (value: number) => number;
    pow: (base: number, exponent: number) => number;
    log: (value: number) => number;
    log10: (value: number) => number;
    sin: (value: number) => number;
    cos: (value: number) => number;
    tan: (value: number) => number;
    asin: (value: number) => number;
    acos: (value: number) => number;
    atan: (value: number) => number;
    floor: (value: number) => number;
    ceil: (value: number) => number;
    sign: (value: number) => number;
    exp: (value: number) => number;
    mod: (dividend: number, divisor: number) => number;
    rem: (dividend: number, divisor: number) => number;
    factorial: (value: number) => number;
    gcd: (a: number, b: number) => number;
    lcm: (a: number, b: number) => number;
    sum: (array: number[]) => number;
    average: (array: number[]) => number;
    min: (array: number[]) => number;
    max: (array: number[]) => number;
    highest: (array: number[], windowSize?: number) => number[];
    lowest: (array: number[], windowSize?: number) => number[];
    change: (current: number, previous: number) => number;
    clamp: (value: number, min: number, max: number) => number;
    round: (value: number, decimals?: number) => number;
    processArray: <T, R>(data: T[], processor: (value: T, index: number) => R) => R[];
    processWindow: <T, R>(data: T[], windowSize: number, processor: (window: T[], index: number) => R) => R[];
    rollingStatistic: (data: number[], windowSize: number, statistic: "min" | "max" | "mean" | "sum") => number[];
    shift: (data: number[], offset: number) => number[];
    getWindowSlice: <T>(data: T[], currentIndex: number, windowSize: number) => T[];
    hl2: (data: MarketData) => number[];
    hlc3: (data: MarketData) => number[];
    ohlc4: (data: MarketData) => number[];
    fillNaN: (data: number[], fillValue: number) => number[];
    shiftArray: (data: number[], shift: number) => number[];
    calculateRSI: (data: number[], length: number) => number[];
    calculateCCI: (data: number[], length: number) => number[];
    calculateMean: (values: number[]) => number;
    calculateVariance: (values: number[]) => number;
    calculateStandardDeviation: (values: number[]) => number;
    calculateRollingStatistic: (data: number[], windowSize: number, statistic: "mean" | "median" | "min" | "max" | "sum") => number[];
    exponentialSmoothing: (data: number[], alpha: number) => number[];
    wildersSmoothing: (data: number[], length: number) => number[];
    safeDivision: (numerator: number, denominator: number) => number;
    calculateRangePercentage: (value: number, min: number, max: number, multiplier: number) => number;
    calculateHighLowRange: (highData: number[], lowData: number[], currentIndex: number, windowSize: number) => {
        highest: number;
        lowest: number;
    };
    sma: (data: number[], length: number) => number[];
    ema: (data: number[], length: number) => number[];
    wma: (data: number[], length: number) => number[];
    hull: (data: number[], length: number) => number[];
    alma: (data: number[], length?: number, sigma?: number) => number[];
    wilders: (data: number[], length?: number) => number[];
    rsi: (data: number[], length?: number) => number[];
    cci: (data: number[], length?: number) => number[];
    apo: (data: number[], fastLength?: number, slowLength?: number) => number[];
    accel: (data: MarketData, fastLength?: number, slowLength?: number) => number[];
    ao: (data: MarketData, fastLength?: number, slowLength?: number) => number[];
    aroon: (data: MarketData, length?: number) => number[];
    macd: (data: number[], fastLength?: number, slowLength?: number, signalLength?: number) => {
        macd: number[];
        signal: number[];
        histogram: number[];
    };
    shannon: (data: number[], length?: number, bins?: number) => number[];
    safezone: (data: number[], length?: number, multiplier?: number) => {
        upper: number[];
        middle: number[];
        lower: number[];
    };
    ad: (data: MarketData) => number[];
    amihud: (data: MarketData, length?: number) => number[];
    bbands: (data: number[], length?: number, multiplier?: number) => {
        upper: number[];
        middle: number[];
        lower: number[];
    };
    std: (data: number[], length?: number) => number[];
    woodie: (data: MarketData) => {
        pp: number[];
        r1: number[];
        r2: number[];
        r3: number[];
        s1: number[];
        s2: number[];
        s3: number[];
    };
};
//# sourceMappingURL=ta.d.ts.map