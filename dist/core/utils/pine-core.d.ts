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
import * as ArrayUtils from './array-utils';
import * as CalculationUtils from './calculation-utils';
import * as MathUtils from './math-utils';
import { sanitizeArray } from './validation-utils';
/**
 * Pine Script Core Functions Interface
 * Provides all essential Pine Script functions in a unified interface
 */
export declare const PineCore: {
    highest: typeof MathUtils.highest;
    lowest: typeof MathUtils.lowest;
    change: typeof MathUtils.change;
    percentChange: typeof ArrayUtils.percentChange;
    shift: typeof ArrayUtils.shift;
    reverse: typeof ArrayUtils.reverse;
    take: typeof ArrayUtils.take;
    takeLast: typeof ArrayUtils.takeLast;
    tail: typeof ArrayUtils.tail;
    first: typeof ArrayUtils.first;
    head: typeof ArrayUtils.head;
    last: typeof ArrayUtils.last;
    isEmpty: typeof ArrayUtils.isEmpty;
    length: typeof ArrayUtils.length;
    slice: typeof ArrayUtils.slice;
    fill: typeof ArrayUtils.fill;
    map: typeof ArrayUtils.map;
    filter: typeof ArrayUtils.filter;
    findIndex: typeof ArrayUtils.findIndex;
    abs: typeof MathUtils.abs;
    rollingMin: typeof MathUtils.rollingMin;
    rollingMax: typeof MathUtils.rollingMax;
    sqrt: typeof MathUtils.sqrt;
    pow: typeof MathUtils.pow;
    log: typeof MathUtils.log;
    log10: typeof MathUtils.log10;
    sin: typeof MathUtils.sin;
    cos: typeof MathUtils.cos;
    tan: typeof MathUtils.tan;
    asin: typeof MathUtils.asin;
    acos: typeof MathUtils.acos;
    atan: typeof MathUtils.atan;
    floor: typeof MathUtils.floor;
    ceil: typeof MathUtils.ceil;
    sign: typeof MathUtils.sign;
    exp: typeof MathUtils.exp;
    mod: typeof MathUtils.mod;
    rem: typeof MathUtils.rem;
    factorial: typeof MathUtils.factorial;
    gcd: typeof MathUtils.gcd;
    lcm: typeof MathUtils.lcm;
    sum: typeof MathUtils.sum;
    average: typeof MathUtils.average;
    min: typeof MathUtils.min;
    max: typeof MathUtils.max;
    clamp: typeof MathUtils.clamp;
    round: typeof MathUtils.round;
    hl2: (data: import("../..").MarketData) => number[];
    hlc3: (data: import("../..").MarketData) => number[];
    ohlc4: (data: import("../..").MarketData) => number[];
    mean: typeof CalculationUtils.calculateMean;
    variance: typeof CalculationUtils.calculateVariance;
    standardDeviation: typeof CalculationUtils.calculateStandardDeviation;
    rollingWindow: typeof CalculationUtils.rollingWindow;
    exponentialSmoothing: typeof CalculationUtils.exponentialSmoothing;
    wildersSmoothing: typeof CalculationUtils.wildersSmoothing;
    safeDivision: typeof CalculationUtils.safeDivision;
    sanitizeArray: typeof sanitizeArray;
    fillNaN: typeof CalculationUtils.fillNaN;
    shiftArray: typeof CalculationUtils.shiftArray;
};
/**
 * Pine Script Math Functions
 * Provides math functions that operate on arrays (Pine Script style)
 */
export declare const PineMath: {
    abs: typeof MathUtils.abs;
    min: typeof MathUtils.rollingMin;
    max: typeof MathUtils.rollingMax;
    sqrt: typeof MathUtils.sqrt;
    pow: typeof MathUtils.pow;
    log: typeof MathUtils.log;
    log10: typeof MathUtils.log10;
    sin: typeof MathUtils.sin;
    cos: typeof MathUtils.cos;
    tan: typeof MathUtils.tan;
    asin: typeof MathUtils.asin;
    acos: typeof MathUtils.acos;
    atan: typeof MathUtils.atan;
    floor: typeof MathUtils.floor;
    ceil: typeof MathUtils.ceil;
    sign: typeof MathUtils.sign;
    exp: typeof MathUtils.exp;
    mod: typeof MathUtils.mod;
    rem: typeof MathUtils.rem;
    factorial: typeof MathUtils.factorial;
    gcd: typeof MathUtils.gcd;
    lcm: typeof MathUtils.lcm;
    sum: typeof MathUtils.sum;
    average: typeof MathUtils.average;
    clamp: typeof MathUtils.clamp;
    round: typeof MathUtils.round;
};
/**
 * Pine Script Array Functions
 * Provides array manipulation functions (Pine Script style)
 */
export declare const PineArray: {
    highest: typeof MathUtils.highest;
    lowest: typeof MathUtils.lowest;
    change: typeof MathUtils.change;
    percentChange: typeof ArrayUtils.percentChange;
    shift: typeof ArrayUtils.shift;
    reverse: typeof ArrayUtils.reverse;
    take: typeof ArrayUtils.take;
    takeLast: typeof ArrayUtils.takeLast;
    tail: typeof ArrayUtils.tail;
    first: typeof ArrayUtils.first;
    head: typeof ArrayUtils.head;
    last: typeof ArrayUtils.last;
    isEmpty: typeof ArrayUtils.isEmpty;
    length: typeof ArrayUtils.length;
    slice: typeof ArrayUtils.slice;
    fill: typeof ArrayUtils.fill;
    map: typeof ArrayUtils.map;
    filter: typeof ArrayUtils.filter;
    findIndex: typeof ArrayUtils.findIndex;
};
/**
 * Pine Script Price Functions
 * Provides price calculation functions using centralized PriceCalculations
 */
export declare const PinePrice: {
    hl2: (data: import("../..").MarketData) => number[];
    hlc3: (data: import("../..").MarketData) => number[];
    ohlc4: (data: import("../..").MarketData) => number[];
};
/**
 * Pine Script Calculation Functions
 * Provides advanced calculation functions
 */
export declare const PineCalculations: {
    calculateMean: typeof CalculationUtils.calculateMean;
    calculateVariance: typeof CalculationUtils.calculateVariance;
    calculateStandardDeviation: typeof CalculationUtils.calculateStandardDeviation;
    calculatePriceChanges: typeof CalculationUtils.calculatePriceChanges;
    calculateGainsAndLosses: typeof CalculationUtils.calculateGainsAndLosses;
    rollingWindow: typeof CalculationUtils.rollingWindow;
    exponentialSmoothing: typeof CalculationUtils.exponentialSmoothing;
    wildersSmoothing: typeof CalculationUtils.wildersSmoothing;
    safeDivision: typeof CalculationUtils.safeDivision;
    sanitizeArray: typeof sanitizeArray;
    fillNaN: typeof CalculationUtils.fillNaN;
    shiftArray: typeof CalculationUtils.shiftArray;
};
//# sourceMappingURL=pine-core.d.ts.map