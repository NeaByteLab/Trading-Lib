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
import { donchianChannel } from '../indicators/volatility/channels/donchian-channel';
import { keltnerChannel } from '../indicators/volatility/channels/keltner-channel';
import { atr } from '../indicators/volatility/range/atr';
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
export declare const ta: {
    highest: typeof import("..").highest;
    lowest: typeof import("..").lowest;
    change: typeof import("..").change;
    percentChange: typeof import("..").percentChange;
    shift: typeof import("..").shift;
    reverse: typeof import("..").reverse;
    take: typeof import("..").take;
    takeLast: typeof import("..").takeLast;
    tail: typeof import("..").tail;
    first: typeof import("..").first;
    head: typeof import("..").head;
    last: typeof import("..").last;
    isEmpty: typeof import("..").isEmpty;
    length: typeof import("..").length;
    slice: typeof import("..").slice;
    fill: typeof import("..").fill;
    map: typeof import("..").map;
    filter: typeof import("..").filter;
    findIndex: typeof import("..").findIndex;
    abs: typeof import("..").abs;
    rollingMin: typeof import("..").rollingMin;
    rollingMax: typeof import("..").rollingMax;
    sqrt: typeof import("..").sqrt;
    pow: typeof import("..").pow;
    log: typeof import("..").log;
    log10: typeof import("..").log10;
    sin: typeof import("..").sin;
    cos: typeof import("..").cos;
    tan: typeof import("..").tan;
    asin: typeof import("..").asin;
    acos: typeof import("..").acos;
    atan: typeof import("..").atan;
    floor: typeof import("..").floor;
    ceil: typeof import("..").ceil;
    sign: typeof import("..").sign;
    exp: typeof import("..").exp;
    mod: typeof import("..").mod;
    rem: typeof import("..").rem;
    factorial: typeof import("..").factorial;
    gcd: typeof import("..").gcd;
    lcm: typeof import("..").lcm;
    sum: typeof import("..").sum;
    average: typeof import("..").average;
    clamp: typeof import("..").clamp;
    round: typeof import("..").round;
    hl2: (data: import("..").MarketData) => number[];
    hlc3: (data: import("..").MarketData) => number[];
    ohlc4: (data: import("..").MarketData) => number[];
    mean: typeof import("..").calculateMean;
    variance: typeof import("..").calculateVariance;
    standardDeviation: typeof import("..").calculateStandardDeviation;
    rollingWindow: typeof import("..").rollingWindow;
    exponentialSmoothing: typeof import("..").exponentialSmoothing;
    wildersSmoothing: typeof import("..").wildersSmoothing;
    safeDivision: typeof import("..").safeDivision;
    sanitizeArray: typeof import("..").sanitizeArray;
    fillNaN: typeof import("..").fillNaN;
    shiftArray: typeof import("..").shiftArray;
    sma: typeof sma;
    ema: typeof ema;
    wma: typeof wma;
    hull: typeof hull;
    rsi: typeof rsi;
    macd: typeof macd;
    stochastic: typeof stochastic;
    williamsR: typeof williamsR;
    cci: typeof cci;
    adx: typeof adx;
    dmi: typeof dmi;
    bollingerBands: typeof bollingerBands;
    atr: typeof atr;
    keltnerChannel: typeof keltnerChannel;
    donchianChannel: typeof donchianChannel;
    parabolicSAR: typeof parabolicSAR;
    obv: typeof obv;
    vwap: typeof vwap;
    mfi: typeof mfi;
    cmf: typeof cmf;
    pine: {
        highest: typeof import("..").highest;
        lowest: typeof import("..").lowest;
        change: typeof import("..").change;
        percentChange: typeof import("..").percentChange;
        shift: typeof import("..").shift;
        reverse: typeof import("..").reverse;
        take: typeof import("..").take;
        takeLast: typeof import("..").takeLast;
        tail: typeof import("..").tail;
        first: typeof import("..").first;
        head: typeof import("..").head;
        last: typeof import("..").last;
        isEmpty: typeof import("..").isEmpty;
        length: typeof import("..").length;
        slice: typeof import("..").slice;
        fill: typeof import("..").fill;
        map: typeof import("..").map;
        filter: typeof import("..").filter;
        findIndex: typeof import("..").findIndex;
        abs: typeof import("..").abs;
        rollingMin: typeof import("..").rollingMin;
        rollingMax: typeof import("..").rollingMax;
        sqrt: typeof import("..").sqrt;
        pow: typeof import("..").pow;
        log: typeof import("..").log;
        log10: typeof import("..").log10;
        sin: typeof import("..").sin;
        cos: typeof import("..").cos;
        tan: typeof import("..").tan;
        asin: typeof import("..").asin;
        acos: typeof import("..").acos;
        atan: typeof import("..").atan;
        floor: typeof import("..").floor;
        ceil: typeof import("..").ceil;
        sign: typeof import("..").sign;
        exp: typeof import("..").exp;
        mod: typeof import("..").mod;
        rem: typeof import("..").rem;
        factorial: typeof import("..").factorial;
        gcd: typeof import("..").gcd;
        lcm: typeof import("..").lcm;
        sum: typeof import("..").sum;
        average: typeof import("..").average;
        min: typeof import("..").min;
        max: typeof import("..").max;
        clamp: typeof import("..").clamp;
        round: typeof import("..").round;
        hl2: (data: import("..").MarketData) => number[];
        hlc3: (data: import("..").MarketData) => number[];
        ohlc4: (data: import("..").MarketData) => number[];
        mean: typeof import("..").calculateMean;
        variance: typeof import("..").calculateVariance;
        standardDeviation: typeof import("..").calculateStandardDeviation;
        rollingWindow: typeof import("..").rollingWindow;
        exponentialSmoothing: typeof import("..").exponentialSmoothing;
        wildersSmoothing: typeof import("..").wildersSmoothing;
        safeDivision: typeof import("..").safeDivision;
        sanitizeArray: typeof import("..").sanitizeArray;
        fillNaN: typeof import("..").fillNaN;
        shiftArray: typeof import("..").shiftArray;
    };
    math: {
        abs: typeof import("..").abs;
        min: typeof import("..").rollingMin;
        max: typeof import("..").rollingMax;
        sqrt: typeof import("..").sqrt;
        pow: typeof import("..").pow;
        log: typeof import("..").log;
        log10: typeof import("..").log10;
        sin: typeof import("..").sin;
        cos: typeof import("..").cos;
        tan: typeof import("..").tan;
        asin: typeof import("..").asin;
        acos: typeof import("..").acos;
        atan: typeof import("..").atan;
        floor: typeof import("..").floor;
        ceil: typeof import("..").ceil;
        sign: typeof import("..").sign;
        exp: typeof import("..").exp;
        mod: typeof import("..").mod;
        rem: typeof import("..").rem;
        factorial: typeof import("..").factorial;
        gcd: typeof import("..").gcd;
        lcm: typeof import("..").lcm;
        sum: typeof import("..").sum;
        average: typeof import("..").average;
        clamp: typeof import("..").clamp;
        round: typeof import("..").round;
    };
    array: {
        highest: typeof import("..").highest;
        lowest: typeof import("..").lowest;
        change: typeof import("..").change;
        percentChange: typeof import("..").percentChange;
        shift: typeof import("..").shift;
        reverse: typeof import("..").reverse;
        take: typeof import("..").take;
        takeLast: typeof import("..").takeLast;
        tail: typeof import("..").tail;
        first: typeof import("..").first;
        head: typeof import("..").head;
        last: typeof import("..").last;
        isEmpty: typeof import("..").isEmpty;
        length: typeof import("..").length;
        slice: typeof import("..").slice;
        fill: typeof import("..").fill;
        map: typeof import("..").map;
        filter: typeof import("..").filter;
        findIndex: typeof import("..").findIndex;
    };
    price: {
        hl2: (data: import("..").MarketData) => number[];
        hlc3: (data: import("..").MarketData) => number[];
        ohlc4: (data: import("..").MarketData) => number[];
    };
    max: typeof import("..").rollingMax;
    min: typeof import("..").rollingMin;
    avg: typeof import("..").average;
    std: typeof import("..").calculateStandardDeviation;
    var: typeof import("..").calculateVariance;
};
//# sourceMappingURL=ta.d.ts.map