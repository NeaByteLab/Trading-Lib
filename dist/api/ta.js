// Import Pine Script core functions
import { PineArray, PineCore, PineMath, PinePrice } from '@core/utils/pine-core';
// Import existing indicators
import { adx } from '../indicators/momentum/directional/adx';
import { dmi } from '../indicators/momentum/directional/dmi';
import { cci } from '../indicators/momentum/oscillators/cci';
import { macd } from '../indicators/momentum/oscillators/macd';
import { rsi } from '../indicators/momentum/oscillators/rsi';
import { stochastic } from '../indicators/momentum/oscillators/stochastic';
import { williamsR } from '../indicators/momentum/oscillators/williams-r';
import { ema } from '../indicators/trend/moving-averages/ema';
import { hull } from '../indicators/trend/moving-averages/hull';
import { sma } from '../indicators/trend/moving-averages/sma';
import { wma } from '../indicators/trend/moving-averages/wma';
import { parabolicSAR } from '../indicators/trend/parabolic/parabolic-sar';
import { bollingerBands } from '../indicators/volatility/bollinger/bollinger-bands';
// Import new momentum indicators
// Import new volatility indicators
import { donchianChannel } from '../indicators/volatility/channels/donchian-channel';
import { keltnerChannel } from '../indicators/volatility/channels/keltner-channel';
import { atr } from '../indicators/volatility/range/atr';
// Import new trend indicators
// Import new volume indicators
import { cmf } from '../indicators/volume/flow/cmf';
import { mfi } from '../indicators/volume/flow/mfi';
import { obv } from '../indicators/volume/flow/obv';
import { vwap } from '../indicators/volume/weighted/vwap';
/**
 * Technical Analysis API
 *
 * Provides all Pine Script core functions and technical indicators
 * in a unified interface for easy access.
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * // Core functions
 * const highest = ta.highest(prices, 20)
 * const lowest = ta.lowest(prices, 20)
 * const changes = ta.change(prices)
 * const rsi = ta.rsi(prices, 14)
 *
 * // Math functions
 * const abs = ta.abs([-5, 10, -15])
 * const rollingMin = ta.rollingMin(prices, 10)
 * const rollingMax = ta.rollingMax(prices, 10)
 * ```
 */
export const ta = {
    // ===== PINE SCRIPT CORE FUNCTIONS =====
    // Array Operations
    highest: PineCore.highest,
    lowest: PineCore.lowest,
    change: PineCore.change,
    percentChange: PineCore.percentChange,
    shift: PineCore.shift,
    reverse: PineCore.reverse,
    take: PineCore.take,
    takeLast: PineCore.takeLast,
    tail: PineCore.tail,
    first: PineCore.first,
    head: PineCore.head,
    last: PineCore.last,
    isEmpty: PineCore.isEmpty,
    length: PineCore.length,
    slice: PineCore.slice,
    fill: PineCore.fill,
    map: PineCore.map,
    filter: PineCore.filter,
    findIndex: PineCore.findIndex,
    // Math Operations
    abs: PineCore.abs,
    rollingMin: PineCore.rollingMin,
    rollingMax: PineCore.rollingMax,
    sqrt: PineCore.sqrt,
    pow: PineCore.pow,
    log: PineCore.log,
    log10: PineCore.log10,
    sin: PineCore.sin,
    cos: PineCore.cos,
    tan: PineCore.tan,
    asin: PineCore.asin,
    acos: PineCore.acos,
    atan: PineCore.atan,
    floor: PineCore.floor,
    ceil: PineCore.ceil,
    sign: PineCore.sign,
    exp: PineCore.exp,
    mod: PineCore.mod,
    rem: PineCore.rem,
    factorial: PineCore.factorial,
    gcd: PineCore.gcd,
    lcm: PineCore.lcm,
    // Utility Functions
    sum: PineCore.sum,
    average: PineCore.average,
    clamp: PineCore.clamp,
    round: PineCore.round,
    // Price Calculations
    hl2: PineCore.hl2,
    hlc3: PineCore.hlc3,
    ohlc4: PineCore.ohlc4,
    // Statistical Functions
    mean: PineCore.mean,
    variance: PineCore.variance,
    standardDeviation: PineCore.standardDeviation,
    // Rolling Window Functions
    rollingWindow: PineCore.rollingWindow,
    // Smoothing Functions
    exponentialSmoothing: PineCore.exponentialSmoothing,
    wildersSmoothing: PineCore.wildersSmoothing,
    // Utility Functions
    safeDivision: PineCore.safeDivision,
    sanitizeArray: PineCore.sanitizeArray,
    fillNaN: PineCore.fillNaN,
    shiftArray: PineCore.shiftArray,
    // ===== TECHNICAL INDICATORS =====
    // Trend Indicators
    sma,
    ema,
    wma,
    hull,
    // Momentum Indicators
    rsi,
    macd,
    stochastic,
    williamsR,
    cci,
    adx,
    dmi,
    // Volatility Indicators
    bollingerBands,
    atr,
    keltnerChannel,
    donchianChannel,
    // Trend Indicators
    parabolicSAR,
    // Volume Indicators
    obv,
    vwap,
    mfi,
    cmf,
    // ===== UNIFIED INTERFACES =====
    // Pine Script interfaces for advanced usage
    pine: PineCore,
    math: PineMath,
    array: PineArray,
    price: PinePrice,
    // ===== ALIASES FOR COMMON FUNCTIONS =====
    // Common aliases for better usability
    max: PineCore.rollingMax,
    min: PineCore.rollingMin,
    avg: PineCore.average,
    std: PineCore.standardDeviation,
    var: PineCore.variance
};
//# sourceMappingURL=ta.js.map