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
    /**
     * Array utility functions for data processing and manipulation
     */
    average: (array: number[]) => number;
    changeArray: (array: number[]) => number[];
    fill: (data: number[], fillValue: number) => number[];
    getWindowSlice: <T>(data: T[], currentIndex: number, windowSize: number) => T[];
    highest: (array: number[], windowSize?: number) => number[];
    lowest: (array: number[], windowSize?: number) => number[];
    max: (array: number[]) => number;
    mean: (values: number[]) => number;
    min: (array: number[]) => number;
    processArray: <T, R>(data: T[], processor: (value: T, index: number) => R) => R[];
    processWindow: <T, R>(data: T[], windowSize: number, processor: (window: T[], index: number) => R) => R[];
    rolling: (data: number[], windowSize: number, statistic: "mean" | "median" | "min" | "max" | "sum") => number[];
    rollingStatistic: (data: number[], windowSize: number, statistic: "min" | "max" | "mean" | "sum") => number[];
    shift: (data: number[], offset: number) => number[];
    shiftArray: (data: number[], shift: number) => number[];
    smoothing: (data: number[], alpha: number) => number[];
    stdev: (values: number[]) => number;
    sum: (array: number[]) => number;
    variance: (values: number[]) => number;
    wildersSmooth: (data: number[], length: number) => number[];
    /**
     * K-selection functions for efficient order statistics
     */
    kthLargest: (array: number[], k: number) => number;
    kthSmallest: (array: number[], k: number) => number;
    median: (array: number[]) => number;
    percentile: (array: number[], percentile: number) => number;
    /**
     * Mathematical utility functions for calculations
     */
    abs: (value: number) => number;
    acos: (value: number) => number;
    asin: (value: number) => number;
    atan: (value: number) => number;
    ceil: (value: number) => number;
    clamp: (value: number, min: number, max: number) => number;
    cos: (value: number) => number;
    div: (numerator: number, denominator: number) => number;
    exp: (value: number) => number;
    factorial: (value: number) => number;
    floor: (value: number) => number;
    gcd: (a: number, b: number) => number;
    lcm: (a: number, b: number) => number;
    log: (value: number) => number;
    log10: (value: number) => number;
    mod: (dividend: number, divisor: number) => number;
    momentumUtil: (data: number[], length?: number) => number[];
    percentrank: (value: number, min: number, max: number, multiplier: number) => number;
    pow: (base: number, exponent: number) => number;
    rem: (dividend: number, divisor: number) => number;
    rocUtil: (data: number[], length?: number) => number[];
    round: (value: number, decimals?: number) => number;
    sign: (value: number) => number;
    sin: (value: number) => number;
    sqrt: (value: number) => number;
    tan: (value: number) => number;
    /**
     * Price calculation functions for OHLC data
     */
    change: (current: number, previous: number) => number;
    hl2: (data: MarketData) => number[];
    hlc3: (data: MarketData) => number[];
    highlow: (highData: number[], lowData: number[], currentIndex: number, windowSize: number) => {
        highest: number;
        lowest: number;
    };
    ohlc4: (data: MarketData) => number[];
    /**
     * Moving average indicators for trend analysis
     */
    alma: (data: number[], length?: number, sigma?: number) => number[];
    dema: (data: number[], length?: number) => number[];
    displaced: (data: number[], length?: number, displacement?: number, maType?: "sma" | "ema" | "wma" | "hull") => number[];
    ema: (data: number[], length: number) => number[];
    hull: (data: number[], length: number) => number[];
    kama: (data: number[], length?: number, fastPeriod?: number, slowPeriod?: number) => number[];
    rma: (data: number[], length: number) => number[];
    sma: (data: number[], length: number) => number[];
    t3: (data: number[], length?: number, a?: number) => number[];
    tema: (data: number[], length?: number) => number[];
    trima: (data: number[], length?: number) => number[];
    vidya: (data: number[], length?: number, cmoLength?: number) => number[];
    wilders: (data: number[], length?: number) => number[];
    wma: (data: number[], length: number) => number[];
    mma: (data: MarketData | number[], config?: {
        length?: number;
        source?: string;
    }) => import("@core/types/indicator-types").IndicatorResult;
    ribbon: (data: MarketData | number[], periods?: number[], maType?: "sma" | "ema" | "wma" | "hull", source?: string) => {
        ribbon: number[][];
        primary: number[];
    };
    /**
     * Momentum oscillator indicators for overbought/oversold conditions
     */
    accel: (data: MarketData, fastLength?: number, slowLength?: number) => number[];
    ao: (data: MarketData, fastLength?: number, slowLength?: number) => number[];
    aroon: (data: MarketData, length?: number) => {
        up: number[];
        down: number[];
    };
    klinger: (data: MarketData, shortPeriod?: number, longPeriod?: number) => number[];
    kst: (data: MarketData | number[], roc1?: number, roc2?: number, roc3?: number, roc4?: number, sma1?: number, sma2?: number, sma3?: number, sma4?: number, source?: string) => number[];
    aroonDown: (data: MarketData, length?: number) => number[];
    aroonUp: (data: MarketData, length?: number) => number[];
    bop: (data: MarketData, length?: number) => number[];
    cci: (data: MarketData, length?: number) => number[];
    chaikin: (data: MarketData, fastLength?: number, slowLength?: number) => number[];
    choppiness: (data: MarketData, length?: number) => number[];
    cmo: (data: MarketData | number[], length?: number) => number[];
    coppock: (data: MarketData | number[], roc1Length?: number, roc2Length?: number, wmaLength?: number) => number[];
    eom: (data: MarketData, length?: number) => number[];
    elderRay: (data: MarketData, length?: number) => {
        bullPower: number[];
        bearPower: number[];
    };
    macd: (data: number[], fastLength?: number, slowLength?: number, signalLength?: number) => {
        macd: number[];
        signal: number[];
        histogram: number[];
    };
    massIndex: (data: MarketData, length?: number) => number[];
    mao: (data: MarketData | number[], fastLength?: number, slowLength?: number, maType?: "sma" | "ema" | "wma" | "hull") => number[];
    momentum: (data: number[], length?: number) => number[];
    roc: (data: number[], length?: number) => number[];
    rsi: (data: number[], length?: number) => number[];
    safezone: (data: number[], length?: number, multiplier?: number) => {
        upper: number[];
        middle: number[];
        lower: number[];
    };
    shannon: (data: number[], length?: number, bins?: number) => number[];
    stochRsi: (data: number[], length?: number, kLength?: number, dLength?: number) => {
        k: number[];
        d: number[];
    };
    stochastic: (data: MarketData, kLength?: number, dLength?: number) => number[];
    williamsR: (data: MarketData, length?: number) => number[];
    trix: (data: number[], length?: number) => number[];
    tsi: (data: number[], firstLength?: number, secondLength?: number) => number[];
    twiggs: (data: number[], length?: number, lookback?: number) => number[];
    twiggsMomentum: (data: number[], length?: number, lookback?: number) => number[];
    /**
     * Directional movement indicators for trend strength
     */
    adx: (data: MarketData, length?: number) => {
        adx: number[];
        plusDI: number[];
        minusDI: number[];
    };
    apo: (data: number[], fastLength?: number, slowLength?: number) => number[];
    dmi: (data: MarketData, length?: number) => {
        plusDI: number[];
        minusDI: number[];
    };
    dpo: (data: MarketData | number[], length?: number) => number[];
    /**
     * Volume-based indicators for market participation analysis
     */
    ad: (data: MarketData) => number[];
    amihud: (data: MarketData, length?: number) => number[];
    cmf: (data: MarketData, length?: number) => number[];
    kyle: (data: MarketData) => number[];
    mfi: (data: MarketData, length?: number) => number[];
    obv: (data: MarketData) => number[];
    pvi: (data: MarketData) => number[];
    pvt: (data: MarketData) => number[];
    twiggsMF: (data: MarketData, length?: number) => number[];
    vwap: (data: MarketData, length?: number) => number[];
    vroc: (data: MarketData, length?: number) => number[];
    vwma: (data: MarketData, length?: number) => number[];
    vama: (data: MarketData, length?: number, volumeThreshold?: number) => number[];
    vwsma: (data: MarketData, length?: number) => number[];
    volumeProfile: (data: MarketData, levels?: number) => {
        priceLevels: number[];
        volumeDistribution: number[];
        poc: number;
    };
    vortex: (data: MarketData, length?: number) => {
        viPlus: number[];
        viMinus: number[];
    };
    vpin: (data: MarketData, length?: number, buckets?: number) => number[];
    /**
     * Volatility indicators for market volatility analysis
     */
    atr: (data: MarketData, length?: number) => number[];
    bbands: (data: number[], length?: number, multiplier?: number) => {
        upper: number[];
        middle: number[];
        lower: number[];
    };
    chaikinVol: (data: MarketData, length?: number) => number[];
    bbandsAdaptive: (data: number[], length?: number, multiplier?: number) => {
        upper: number[];
        middle: number[];
        lower: number[];
    };
    bbwidth: (data: number[], length?: number, multiplier?: number) => number[];
    donchian: (data: MarketData, length?: number) => {
        upper: number[];
        middle: number[];
        lower: number[];
    };
    keltner: (data: MarketData, length?: number, multiplier?: number) => {
        upper: number[];
        middle: number[];
        lower: number[];
    };
    std: (data: number[], length?: number) => number[];
    twiggsVol: (data: MarketData, length?: number, lookback?: number) => number[];
    /**
     * Trend-following indicators for market direction analysis
     */
    ichimoku: (data: MarketData, tenkanPeriod?: number, kijunPeriod?: number, senkouBPeriod?: number, displacement?: number) => {
        tenkan: number[];
        kijun: number[];
        senkouA: number[];
        senkouB: number[];
        chikou: number[];
    };
    psar: (data: MarketData, acceleration?: number, maximum?: number) => number[];
    supertrend: (data: MarketData, length?: number, multiplier?: number) => {
        superTrend: number[];
        direction: number[];
    };
    woodie: (data: MarketData) => {
        pp: number[];
        r1: number[];
        r2: number[];
        r3: number[];
        s1: number[];
        s2: number[];
        s3: number[];
    };
    demark: (data: MarketData) => {
        pp: number[];
        r1: number[];
        r2: number[];
        r3: number[];
        s1: number[];
        s2: number[];
        s3: number[];
    };
    /**
     * Price-based selection and comparison indicators
     */
    pbands: (data: MarketData | number[], length?: number, percentage?: number) => {
        upper: number[];
        middle: number[];
        lower: number[];
    };
    pchannels: (data: MarketData, length?: number) => {
        upper: number[];
        lower: number[];
    };
    pcmp: (price1: number[], price2: number[], basePrice?: number) => {
        ratio: number[];
        performance: number[];
        correlation: number;
    };
    pcompare: (price1: number[], price2: number[], basePrice?: number) => {
        ratio: number[];
        performance: number[];
        correlation: number;
    };
    pdiff: (price1: number[], price2: number[]) => number[];
    penv: (data: MarketData | number[], length?: number, deviation?: number) => {
        upper: number[];
        middle: number[];
        lower: number[];
    };
    typical: (data: MarketData) => number[];
    camarilla: (data: MarketData) => {
        pp: number[];
        r1: number[];
        r2: number[];
        r3: number[];
        s1: number[];
        s2: number[];
        s3: number[];
    };
    pivots: (data: MarketData) => {
        pp: number[];
        r1: number[];
        r2: number[];
        r3: number[];
        s1: number[];
        s2: number[];
        s3: number[];
    };
    ppo: (data: MarketData | number[], fastLength?: number, slowLength?: number, signalLength?: number) => {
        ppo: number[];
        signal: number[];
        histogram: number[];
    };
    pratio: (price1: number[], price2: number[]) => number[];
    ptrail: (data: MarketData | number[], percentage?: number) => {
        trailingStop: number[];
    };
    /**
     * Machine learning indicators for advanced analysis
     */
    bayesianGlm: (data: MarketData, lookback?: number, threshold?: number) => number[];
    knn: (data: MarketData, k?: number, lookback?: number, features?: number) => number[];
    marketRegime: (data: MarketData, length?: number, threshold?: number) => number[];
    mlr: (data: MarketData, length?: number, lookback?: number) => number[];
};
//# sourceMappingURL=ta.d.ts.map