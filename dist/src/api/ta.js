import { movingAverage } from '@calculations/moving-averages';
import { bayesianGLM } from '@indicators/ml/bayesian-glm';
import { knn } from '@indicators/ml/knn';
import { multipleLinearRegression } from '@indicators/ml/mlr';
import { marketRegimeClassifier } from '@indicators/ml/mrc';
import { adx } from '@indicators/momentum/directional/adx';
import { aroon } from '@indicators/momentum/directional/aroon';
import { dmi } from '@indicators/momentum/directional/dmi';
import { acceleratorOscillator, awesomeOscillator } from '@indicators/momentum/oscillators/ao';
import { apo } from '@indicators/momentum/oscillators/apo';
import { balanceOfPower } from '@indicators/momentum/oscillators/bop';
import { cci } from '@indicators/momentum/oscillators/cci';
import { chaikinOscillator } from '@indicators/momentum/oscillators/chaikin-oscillator';
import { choppiness } from '@indicators/momentum/oscillators/choppiness';
import { cmo } from '@indicators/momentum/oscillators/cmo';
import { coppock } from '@indicators/momentum/oscillators/coppock';
import { dpo } from '@indicators/momentum/oscillators/dpo';
import { elderRayIndex } from '@indicators/momentum/oscillators/elder-ray';
import { easeOfMovement } from '@indicators/momentum/oscillators/eom';
import { klinger } from '@indicators/momentum/oscillators/klinger';
import { kst } from '@indicators/momentum/oscillators/kst';
import { macd } from '@indicators/momentum/oscillators/macd';
import { movingAverageOscillator } from '@indicators/momentum/oscillators/mao';
import { massIndex } from '@indicators/momentum/oscillators/mass-index';
import { momentum } from '@indicators/momentum/oscillators/momentum';
import { percentagePriceOscillator } from '@indicators/momentum/oscillators/ppo';
import { roc } from '@indicators/momentum/oscillators/roc';
import { rsi } from '@indicators/momentum/oscillators/rsi';
import { safezone } from '@indicators/momentum/oscillators/safezone';
import { shannon } from '@indicators/momentum/oscillators/shannon';
import { stochasticRsi } from '@indicators/momentum/oscillators/stoch-rsi';
import { stochastic } from '@indicators/momentum/oscillators/stochastic';
import { trix } from '@indicators/momentum/oscillators/trix';
import { tsi } from '@indicators/momentum/oscillators/tsi';
import { twiggsMomentum } from '@indicators/momentum/oscillators/twiggs-momentum';
import { williamsR } from '@indicators/momentum/oscillators/williams';
import { ichimokuCloud } from '@indicators/trend/ichimoku/ichimoku-cloud';
import { alma } from '@indicators/trend/moving-averages/alma';
import { dema } from '@indicators/trend/moving-averages/dema';
import { displaced } from '@indicators/trend/moving-averages/displaced';
import { kama } from '@indicators/trend/moving-averages/kama';
import { multipleMovingAverages } from '@indicators/trend/moving-averages/mma';
import { t3 } from '@indicators/trend/moving-averages/t3';
import { tema } from '@indicators/trend/moving-averages/tema';
import { trima } from '@indicators/trend/moving-averages/trima';
import { vidya } from '@indicators/trend/moving-averages/vidya';
import { wilders } from '@indicators/trend/moving-averages/wilders';
import { comparePrices } from '@indicators/trend/overlays/compare-prices';
import { priceComparison } from '@indicators/trend/overlays/price-comparison';
import { priceDifferential } from '@indicators/trend/overlays/price-differential';
import { priceEnvelope } from '@indicators/trend/overlays/price-envelope';
import { priceRatio } from '@indicators/trend/overlays/price-ratio';
import { movingAverageRibbon } from '@indicators/trend/overlays/rib';
import { typicalPrice } from '@indicators/trend/overlays/typical-price';
import { parabolicSAR } from '@indicators/trend/parabolic/parabolic-sar';
import { camarilla } from '@indicators/trend/pivots/camarilla';
import { demarkPivots } from '@indicators/trend/pivots/demark';
import { percentageBands } from '@indicators/trend/pivots/percentage-bands';
import { pivots } from '@indicators/trend/pivots/pivot-points';
import { percentageTrailingStops } from '@indicators/trend/pivots/pts';
import { woodie } from '@indicators/trend/pivots/woodie';
import { superTrend } from '@indicators/trend/supertrend/supertrend';
import { bollingerBandWidth } from '@indicators/volatility/bollinger/bb-width';
import { bollingerBands } from '@indicators/volatility/bollinger/bollinger-bands';
import { donchianChannel } from '@indicators/volatility/channels/donchian';
import { keltnerChannel } from '@indicators/volatility/channels/keltner';
import { priceChannels } from '@indicators/volatility/channels/price-channels';
import { atr } from '@indicators/volatility/range/atr';
import { chaikinVolatility } from '@indicators/volatility/range/chaikin-volatility';
import { std } from '@indicators/volatility/range/std';
import { twiggsVolatility } from '@indicators/volatility/range/twiggs-volatility';
import { accumulationDistribution } from '@indicators/volume/flow/ad';
import { amihudIlliquidity } from '@indicators/volume/flow/amihud';
import { cmf } from '@indicators/volume/flow/cmf';
import { kylesLambda } from '@indicators/volume/flow/kyle';
import { mfi } from '@indicators/volume/flow/mfi';
import { obv } from '@indicators/volume/flow/obv';
import { priceVolumeTrend } from '@indicators/volume/flow/pvt';
import { twiggsMoneyFlow } from '@indicators/volume/flow/twiggsmf';
import { vortex } from '@indicators/volume/flow/vortex';
import { vpin } from '@indicators/volume/flow/vpin';
import { positiveVolumeIndex } from '@indicators/volume/momentum/pvi';
import { vroc } from '@indicators/volume/momentum/vroc';
import { vama } from '@indicators/volume/weighted/vama';
import { volumeProfile } from '@indicators/volume/weighted/volume-profile';
import { vwap } from '@indicators/volume/weighted/vwap';
import { vwma } from '@indicators/volume/weighted/vwma';
import { vwsma } from '@indicators/volume/weighted/vwsma';
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
    // ===== ARRAY UTILITIES =====
    /**
     * Array utility functions for data processing and manipulation
     */
    average: (array) => MathUtils.average(array),
    changeArray: (array) => MathUtils.changeArray(array),
    fill: (data, fillValue) => CalculationUtils.fillNaN(data, fillValue),
    getWindowSlice: (data, currentIndex, windowSize) => ArrayUtils.getWindowSlice(data, currentIndex, windowSize),
    highest: (array, windowSize = 14) => MathUtils.highest(array, windowSize),
    lowest: (array, windowSize = 14) => MathUtils.lowest(array, windowSize),
    max: (array) => MathUtils.max(array),
    mean: (values) => CalculationUtils.calculateMean(values),
    min: (array) => MathUtils.min(array),
    processArray: (data, processor) => ArrayUtils.processArray(data, processor),
    processWindow: (data, windowSize, processor) => ArrayUtils.processWindow(data, windowSize, processor),
    rolling: (data, windowSize, statistic) => CalculationUtils.calculateRollingStatistic(data, windowSize, statistic),
    rollingStatistic: (data, windowSize, statistic) => ArrayUtils.rollingStatistic(data, windowSize, statistic),
    shift: (data, offset) => ArrayUtils.shift(data, offset),
    shiftArray: (data, shift) => CalculationUtils.shiftArray(data, shift),
    smoothing: (data, alpha) => CalculationUtils.exponentialSmoothing(data, alpha),
    stdev: (values) => CalculationUtils.calculateStandardDeviation(values),
    sum: (array) => MathUtils.sum(array),
    variance: (values) => CalculationUtils.calculateVariance(values),
    wildersSmooth: (data, length) => CalculationUtils.wildersSmoothing(data, length),
    // ===== K-SELECTION FUNCTIONS =====
    /**
     * K-selection functions for efficient order statistics
     */
    kthLargest: (array, k) => CalculationUtils.kthLargest(array, k),
    kthSmallest: (array, k) => CalculationUtils.kthSmallest(array, k),
    median: (array) => CalculationUtils.calculateMedian(array),
    percentile: (array, percentile) => CalculationUtils.calculatePercentile(array, percentile),
    // ===== MATHEMATICAL FUNCTIONS =====
    /**
     * Mathematical utility functions for calculations
     */
    abs: (value) => MathUtils.abs(value),
    acos: (value) => MathUtils.acos(value),
    asin: (value) => MathUtils.asin(value),
    atan: (value) => MathUtils.atan(value),
    ceil: (value) => MathUtils.ceil(value),
    clamp: (value, min, max) => MathUtils.clamp(value, min, max),
    cos: (value) => MathUtils.cos(value),
    div: (numerator, denominator) => CalculationUtils.safeDivision(numerator, denominator),
    exp: (value) => MathUtils.exp(value),
    factorial: (value) => MathUtils.factorial(value),
    floor: (value) => MathUtils.floor(value),
    gcd: (a, b) => MathUtils.gcd(a, b),
    lcm: (a, b) => MathUtils.lcm(a, b),
    log: (value) => MathUtils.log(value),
    log10: (value) => MathUtils.log10(value),
    mod: (dividend, divisor) => MathUtils.mod(dividend, divisor),
    momentumUtil: (data, length = 10) => CalculationUtils.calculateMomentum(data, length),
    percentrank: (value, min, max, multiplier) => CalculationUtils.calculateRangePercentage(value, min, max, multiplier),
    pow: (base, exponent) => MathUtils.pow(base, exponent),
    rem: (dividend, divisor) => MathUtils.rem(dividend, divisor),
    rocUtil: (data, length = 10) => CalculationUtils.calculateROC(data, length),
    round: (value, decimals = 0) => MathUtils.round(value, decimals),
    sign: (value) => MathUtils.sign(value),
    sin: (value) => MathUtils.sin(value),
    sqrt: (value) => MathUtils.sqrt(value),
    tan: (value) => MathUtils.tan(value),
    // ===== PRICE CALCULATIONS =====
    /**
     * Price calculation functions for OHLC data
     */
    change: (current, previous) => MathUtils.change(current, previous),
    hl2: (data) => CalculationUtils.PriceCalculations.hl2(data),
    hlc3: (data) => CalculationUtils.PriceCalculations.typical(data),
    highlow: (highData, lowData, currentIndex, windowSize) => CalculationUtils.calculateHighLowRange(highData, lowData, currentIndex, windowSize),
    ohlc4: (data) => CalculationUtils.PriceCalculations.ohlc4(data),
    // ===== MOVING AVERAGES =====
    /**
     * Moving average indicators for trend analysis
     */
    alma: (data, length = 9, sigma = 6) => alma(data, length, sigma),
    dema: (data, length = 20) => dema(data, length),
    displaced: (data, length = 20, displacement = 0, maType = 'sma') => displaced(data, length, displacement, maType),
    ema: (data, length) => movingAverage(data, length, 'ema'),
    hull: (data, length) => movingAverage(data, length, 'hull'),
    kama: (data, length = 10, fastPeriod = 2, slowPeriod = 30) => kama(data, length, fastPeriod, slowPeriod),
    rma: (data, length) => movingAverage(data, length, 'rma'),
    sma: (data, length) => movingAverage(data, length, 'sma'),
    t3: (data, length = 20, a = 0.7) => t3(data, length, a),
    tema: (data, length = 20) => tema(data, length),
    trima: (data, length = 20) => trima(data, length),
    vidya: (data, length = 14, cmoLength = 9) => vidya(data, length, cmoLength),
    wilders: (data, length = 14) => wilders(data, length),
    wma: (data, length) => movingAverage(data, length, 'wma'),
    mma: (data, config) => multipleMovingAverages(data, config),
    ribbon: (data, periods, maType, source) => movingAverageRibbon(data, periods, maType, source),
    // ===== MOMENTUM OSCILLATORS =====
    /**
     * Momentum oscillator indicators for overbought/oversold conditions
     */
    accel: (data, fastLength = 5, slowLength = 34) => acceleratorOscillator(data, fastLength, slowLength),
    ao: (data, fastLength = 5, slowLength = 34) => awesomeOscillator(data, fastLength, slowLength),
    aroon: (data, length = 14) => aroon(data, length),
    klinger: (data, shortPeriod = 34, longPeriod = 55) => klinger(data, shortPeriod, longPeriod),
    kst: (data, roc1, roc2, roc3, roc4, sma1, sma2, sma3, sma4, source) => kst(data, roc1, roc2, roc3, roc4, sma1, sma2, sma3, sma4, source),
    aroonDown: (data, length = 14) => {
        const result = aroon(data, length);
        return result.down;
    },
    aroonUp: (data, length = 14) => {
        const result = aroon(data, length);
        return result.up;
    },
    bop: (data, length = 14) => balanceOfPower(data, length),
    cci: (data, length = 20) => cci(data, length),
    chaikin: (data, fastLength = 3, slowLength = 10) => chaikinOscillator(data, fastLength, slowLength),
    choppiness: (data, length = 14) => choppiness(data, length),
    cmo: (data, length = 14) => cmo(data, length),
    coppock: (data, roc1Length = 14, roc2Length = 11, wmaLength = 10) => coppock(data, roc1Length, roc2Length, wmaLength),
    eom: (data, length = 14) => easeOfMovement(data, length),
    elderRay: (data, length = 13) => elderRayIndex(data, length),
    macd: (data, fastLength = 12, slowLength = 26, signalLength = 9) => {
        const result = macd(data, fastLength, slowLength, signalLength);
        return { macd: result.macd, signal: result.signal, histogram: result.histogram };
    },
    massIndex: (data, length = 9) => massIndex(data, length),
    mao: (data, fastLength = 10, slowLength = 20, maType = 'sma') => movingAverageOscillator(data, fastLength, slowLength, maType),
    momentum: (data, length = 10) => momentum(data, length),
    roc: (data, length = 10) => roc(data, length),
    rsi: (data, length = 14) => rsi(data, length),
    safezone: (data, length = 20, multiplier = 2.0) => safezone(data, length, multiplier),
    shannon: (data, length = 20, bins = 8) => shannon(data, length, bins),
    stochRsi: (data, length = 14, kLength = 14, dLength = 3) => stochasticRsi(data, length, kLength, dLength),
    stochastic: (data, kLength = 14, dLength = 3) => {
        const result = stochastic(data, kLength, dLength);
        return result.k;
    },
    williamsR: (data, length = 14) => williamsR(data, length),
    trix: (data, length = 18) => trix(data, length),
    tsi: (data, firstLength = 25, secondLength = 13) => tsi(data, firstLength, secondLength),
    twiggs: (data, length = 20, lookback = 10) => twiggsMomentum(data, length, lookback),
    twiggsMomentum: (data, length = 20, lookback = 10) => twiggsMomentum(data, length, lookback),
    // ===== DIRECTIONAL INDICATORS =====
    /**
     * Directional movement indicators for trend strength
     */
    adx: (data, length = 14) => adx(data, length),
    apo: (data, fastLength = 12, slowLength = 26) => apo(data, fastLength, slowLength),
    dmi: (data, length = 14) => dmi(data, length),
    dpo: (data, length = 20) => dpo(data, length, 'close'),
    // ===== VOLUME INDICATORS =====
    /**
     * Volume-based indicators for market participation analysis
     */
    ad: (data) => accumulationDistribution(data),
    amihud: (data, length = 20) => amihudIlliquidity(data, length),
    cmf: (data, length = 20) => cmf(data, length),
    kyle: (data) => kylesLambda(data),
    mfi: (data, length = 14) => mfi(data, length),
    obv: (data) => obv(data),
    pvi: (data) => positiveVolumeIndex(data),
    pvt: (data) => priceVolumeTrend(data),
    twiggsMF: (data, length = 21) => twiggsMoneyFlow(data, length),
    vwap: (data, length = 20) => vwap(data, length),
    vroc: (data, length = 14) => vroc(data, length),
    vwma: (data, length = 20) => vwma(data, length),
    vama: (data, length = 20, volumeThreshold = 0) => vama(data, length, volumeThreshold),
    vwsma: (data, length = 20) => vwsma(data, length),
    volumeProfile: (data, levels = 10) => volumeProfile(data, levels),
    vortex: (data, length = 14) => vortex(data, length),
    vpin: (data, length = 50, buckets = 50) => vpin(data, length, buckets),
    // ===== VOLATILITY INDICATORS =====
    /**
     * Volatility indicators for market volatility analysis
     */
    atr: (data, length = 14) => atr(data, length),
    bbands: (data, length = 20, multiplier = 2) => {
        const result = bollingerBands(data, length, multiplier);
        return { upper: result.upper, middle: result.middle, lower: result.lower };
    },
    chaikinVol: (data, length = 10) => chaikinVolatility(data, length),
    bbandsAdaptive: (data, length = 20, multiplier = 2) => {
        const result = bollingerBands(data, length, multiplier, 'close', 'ema');
        return { upper: result.upper, middle: result.middle, lower: result.lower };
    },
    bbwidth: (data, length = 20, multiplier = 2) => bollingerBandWidth(data, length, multiplier),
    donchian: (data, length = 20) => donchianChannel(data, length),
    keltner: (data, length = 20, multiplier = 2) => keltnerChannel(data, length, multiplier),
    std: (data, length = 20) => std(data, length),
    twiggsVol: (data, length = 20, lookback = 10) => twiggsVolatility(data, length, lookback),
    // ===== TREND INDICATORS =====
    /**
     * Trend-following indicators for market direction analysis
     */
    ichimoku: (data, tenkanPeriod = 9, kijunPeriod = 26, senkouBPeriod = 52, displacement = 26) => ichimokuCloud(data, tenkanPeriod, kijunPeriod, senkouBPeriod, displacement),
    psar: (data, acceleration = 0.02, maximum = 0.2) => parabolicSAR(data, acceleration, maximum),
    supertrend: (data, length = 10, multiplier = 3) => {
        const result = superTrend(data, length, multiplier);
        return { superTrend: result.superTrend, direction: result.direction };
    },
    woodie: (data) => woodie(data),
    demark: (data) => {
        const result = demarkPivots(data);
        return { pp: result.pp, r1: result.r1, r2: result.r2, r3: result.r3, s1: result.s1, s2: result.s2, s3: result.s3 };
    },
    // ===== PRICE SELECTION INDICATORS =====
    /**
     * Price-based selection and comparison indicators
     */
    pbands: (data, length = 20, percentage = 2.5) => {
        const result = percentageBands(data, length, percentage);
        return { upper: result.upper, middle: result.middle, lower: result.lower };
    },
    pchannels: (data, length = 20) => {
        const result = priceChannels(data, length);
        return { upper: result.upper, lower: result.lower };
    },
    pcmp: (price1, price2, basePrice = 100) => {
        const result = priceComparison(price1, price2, basePrice);
        return { ratio: result.ratio, performance: result.performance, correlation: result.correlation };
    },
    pcompare: (price1, price2, basePrice = 100) => {
        const result = comparePrices(price1, price2, basePrice);
        return { ratio: result.ratio, performance: result.performance, correlation: result.correlation };
    },
    pdiff: (price1, price2) => priceDifferential(price1, price2),
    penv: (data, length = 20, deviation = 2.5) => {
        const result = priceEnvelope(data, length, deviation);
        return { upper: result.upper, middle: result.middle, lower: result.lower };
    },
    typical: (data) => typicalPrice(data),
    camarilla: (data) => {
        const result = camarilla(data);
        return { pp: result.pp, r1: result.r1, r2: result.r2, r3: result.r3, s1: result.s1, s2: result.s2, s3: result.s3 };
    },
    pivots: (data) => {
        const result = pivots(data);
        return { pp: result.pp, r1: result.r1, r2: result.r2, r3: result.r3, s1: result.s1, s2: result.s2, s3: result.s3 };
    },
    ppo: (data, fastLength = 12, slowLength = 26, signalLength = 9) => {
        const result = percentagePriceOscillator(data, fastLength, slowLength, signalLength);
        return { ppo: result.ppo, signal: result.signal, histogram: result.histogram };
    },
    pratio: (price1, price2) => priceRatio(price1, price2),
    ptrail: (data, percentage = 2.5) => {
        const result = percentageTrailingStops(data, percentage);
        return { trailingStop: result.trailingStop };
    },
    // ===== MACHINE LEARNING =====
    /**
     * Machine learning indicators for advanced analysis
     */
    bayesianGlm: (data, lookback = 20, threshold = 0.5) => bayesianGLM(data, lookback, threshold),
    knn: (data, k, lookback, features) => knn(data, k, lookback, features),
    marketRegime: (data, length, threshold) => marketRegimeClassifier(data, length, threshold),
    mlr: (data, length, lookback) => multipleLinearRegression(data, length, lookback)
};
