/**
 * Pine Script Core Functions
 *
 * This module provides all essential Pine Script functions for technical analysis.
 * These functions are designed to be compatible with Pine Script v5 syntax and behavior.
 *
 * @example
 * ```typescript
 * import { PineCore } from '@core/utils/pine-core'
 *
 * const prices = [10, 20, 15, 25, 12]
 * const highest = PineCore.highest(prices, 3) // [20, 25, 25]
 * const changes = PineCore.change(prices) // [10, -5, 10, -13]
 * ```
 */
import * as CalculationUtils from './calculation-utils';
import { sanitizeArray } from './validation-utils';
/**
 * Pine Script Core Functions Interface
 * Provides all essential Pine Script functions in a unified interface
 */
export declare const PineCore: {
    abs: (value: number) => number;
    rollingMin: (array: number[], windowSize: number) => number[];
    rollingMax: (array: number[], windowSize: number) => number[];
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
    factorial: (n: number) => number;
    gcd: (a: number, b: number) => number;
    lcm: (a: number, b: number) => number;
    sum: (array: number[]) => number;
    average: (array: number[]) => number;
    min: (array: number[]) => number;
    max: (array: number[]) => number;
    clamp: (value: number, min: number, max: number) => number;
    round: (value: number, decimals?: number) => number;
    hl2: (data: {
        high: number[];
        low: number[];
    }) => number[];
    hlc3: (data: {
        high: number[];
        low: number[];
        close: number[];
    }) => number[];
    ohlc4: (data: {
        open: number[];
        high: number[];
        low: number[];
        close: number[];
    }) => number[];
    mean: typeof CalculationUtils.calculateMean;
    variance: typeof CalculationUtils.calculateVariance;
    standardDeviation: typeof CalculationUtils.calculateStandardDeviation;
    rollingWindow: typeof CalculationUtils.rollingWindow;
    exponentialSmoothing: typeof CalculationUtils.exponentialSmoothing;
    wildersSmoothing: typeof CalculationUtils.wildersSmoothing;
    safeDivision: typeof CalculationUtils.safeDivision;
    sanitizeArray: typeof sanitizeArray;
    shiftArray: typeof CalculationUtils.shiftArray;
};
/**
 * Pine Script Price Functions
 * Provides price calculation functions using centralized PriceCalculations
 */
export declare const PinePrice: {
    hl2: (data: {
        high: number[];
        low: number[];
    }) => number[];
    hlc3: (data: {
        high: number[];
        low: number[];
        close: number[];
    }) => number[];
    ohlc4: (data: {
        open: number[];
        high: number[];
        low: number[];
        close: number[];
    }) => number[];
};
//# sourceMappingURL=pine-core.d.ts.map