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
import { PriceCalculations } from './calculation-utils';
import * as MathUtils from './math-utils';
import { sanitizeArray } from './validation-utils';
/**
 * Pine Script Core Functions Interface
 * Provides all essential Pine Script functions in a unified interface
 */
export const PineCore = {
    // Array Operations
    highest: MathUtils.highest,
    lowest: MathUtils.lowest,
    change: MathUtils.change,
    percentChange: ArrayUtils.percentChange,
    shift: ArrayUtils.shift,
    reverse: ArrayUtils.reverse,
    take: ArrayUtils.take,
    takeLast: ArrayUtils.takeLast,
    tail: ArrayUtils.tail,
    first: ArrayUtils.first,
    head: ArrayUtils.head,
    last: ArrayUtils.last,
    isEmpty: ArrayUtils.isEmpty,
    length: ArrayUtils.length,
    slice: ArrayUtils.slice,
    fill: ArrayUtils.fill,
    map: ArrayUtils.map,
    filter: ArrayUtils.filter,
    findIndex: ArrayUtils.findIndex,
    // Math Operations
    abs: MathUtils.abs,
    rollingMin: MathUtils.rollingMin,
    rollingMax: MathUtils.rollingMax,
    sqrt: MathUtils.sqrt,
    pow: MathUtils.pow,
    log: MathUtils.log,
    log10: MathUtils.log10,
    sin: MathUtils.sin,
    cos: MathUtils.cos,
    tan: MathUtils.tan,
    asin: MathUtils.asin,
    acos: MathUtils.acos,
    atan: MathUtils.atan,
    floor: MathUtils.floor,
    ceil: MathUtils.ceil,
    sign: MathUtils.sign,
    exp: MathUtils.exp,
    mod: MathUtils.mod,
    rem: MathUtils.rem,
    factorial: MathUtils.factorial,
    gcd: MathUtils.gcd,
    lcm: MathUtils.lcm,
    // Utility Functions
    sum: MathUtils.sum,
    average: MathUtils.average,
    min: MathUtils.min,
    max: MathUtils.max,
    clamp: MathUtils.clamp,
    round: MathUtils.round,
    // Price Calculations - Using centralized PriceCalculations
    hl2: PriceCalculations.hl2,
    hlc3: PriceCalculations.typical,
    ohlc4: PriceCalculations.ohlc4,
    // Statistical Functions
    mean: CalculationUtils.calculateMean,
    variance: CalculationUtils.calculateVariance,
    standardDeviation: CalculationUtils.calculateStandardDeviation,
    // Rolling Window Functions
    rollingWindow: CalculationUtils.rollingWindow,
    // Smoothing Functions
    exponentialSmoothing: CalculationUtils.exponentialSmoothing,
    wildersSmoothing: CalculationUtils.wildersSmoothing,
    // Utility Functions
    safeDivision: CalculationUtils.safeDivision,
    sanitizeArray,
    fillNaN: CalculationUtils.fillNaN,
    shiftArray: CalculationUtils.shiftArray
};
/**
 * Pine Script Math Functions
 * Provides math functions that operate on arrays (Pine Script style)
 */
export const PineMath = {
    abs: MathUtils.abs,
    min: MathUtils.rollingMin,
    max: MathUtils.rollingMax,
    sqrt: MathUtils.sqrt,
    pow: MathUtils.pow,
    log: MathUtils.log,
    log10: MathUtils.log10,
    sin: MathUtils.sin,
    cos: MathUtils.cos,
    tan: MathUtils.tan,
    asin: MathUtils.asin,
    acos: MathUtils.acos,
    atan: MathUtils.atan,
    floor: MathUtils.floor,
    ceil: MathUtils.ceil,
    sign: MathUtils.sign,
    exp: MathUtils.exp,
    mod: MathUtils.mod,
    rem: MathUtils.rem,
    factorial: MathUtils.factorial,
    gcd: MathUtils.gcd,
    lcm: MathUtils.lcm,
    sum: MathUtils.sum,
    average: MathUtils.average,
    clamp: MathUtils.clamp,
    round: MathUtils.round
};
/**
 * Pine Script Array Functions
 * Provides array manipulation functions (Pine Script style)
 */
export const PineArray = {
    highest: MathUtils.highest,
    lowest: MathUtils.lowest,
    change: MathUtils.change,
    percentChange: ArrayUtils.percentChange,
    shift: ArrayUtils.shift,
    reverse: ArrayUtils.reverse,
    take: ArrayUtils.take,
    takeLast: ArrayUtils.takeLast,
    tail: ArrayUtils.tail,
    first: ArrayUtils.first,
    head: ArrayUtils.head,
    last: ArrayUtils.last,
    isEmpty: ArrayUtils.isEmpty,
    length: ArrayUtils.length,
    slice: ArrayUtils.slice,
    fill: ArrayUtils.fill,
    map: ArrayUtils.map,
    filter: ArrayUtils.filter,
    findIndex: ArrayUtils.findIndex
};
/**
 * Pine Script Price Functions
 * Provides price calculation functions using centralized PriceCalculations
 */
export const PinePrice = {
    hl2: PriceCalculations.hl2,
    hlc3: PriceCalculations.typical,
    ohlc4: PriceCalculations.ohlc4
};
/**
 * Pine Script Calculation Functions
 * Provides advanced calculation functions
 */
export const PineCalculations = {
    calculateMean: CalculationUtils.calculateMean,
    calculateVariance: CalculationUtils.calculateVariance,
    calculateStandardDeviation: CalculationUtils.calculateStandardDeviation,
    calculatePriceChanges: CalculationUtils.calculatePriceChanges,
    calculateGainsAndLosses: CalculationUtils.calculateGainsAndLosses,
    rollingWindow: CalculationUtils.rollingWindow,
    exponentialSmoothing: CalculationUtils.exponentialSmoothing,
    wildersSmoothing: CalculationUtils.wildersSmoothing,
    safeDivision: CalculationUtils.safeDivision,
    sanitizeArray,
    fillNaN: CalculationUtils.fillNaN,
    shiftArray: CalculationUtils.shiftArray
};
//# sourceMappingURL=pine-core.js.map