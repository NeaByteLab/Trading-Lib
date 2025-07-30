import { movingAverage } from '@calculations/moving-averages'
import type { MarketData } from '@core/types/indicator-types'
import { bayesianGLM } from '@indicators/ml/bayesian-glm'
import { knn } from '@indicators/ml/knn'
import { multipleLinearRegression } from '@indicators/ml/mlr'
import { marketRegimeClassifier } from '@indicators/ml/mrc'
import { adx } from '@indicators/momentum/directional/adx'
import { aroon } from '@indicators/momentum/directional/aroon'
import { dmi } from '@indicators/momentum/directional/dmi'
import { acceleratorOscillator, awesomeOscillator } from '@indicators/momentum/oscillators/ao'
import { apo } from '@indicators/momentum/oscillators/apo'
import { balanceOfPower } from '@indicators/momentum/oscillators/bop'
import { cci } from '@indicators/momentum/oscillators/cci'
import { chaikinOscillator } from '@indicators/momentum/oscillators/chaikin-oscillator'
import { choppiness } from '@indicators/momentum/oscillators/choppiness'
import { cmo } from '@indicators/momentum/oscillators/cmo'
import { coppock } from '@indicators/momentum/oscillators/coppock'
import { dpo } from '@indicators/momentum/oscillators/dpo'
import { elderRayIndex } from '@indicators/momentum/oscillators/elder-ray'
import { easeOfMovement } from '@indicators/momentum/oscillators/eom'
import { klinger } from '@indicators/momentum/oscillators/klinger'
import { kst } from '@indicators/momentum/oscillators/kst'
import { macd } from '@indicators/momentum/oscillators/macd'
import { movingAverageOscillator } from '@indicators/momentum/oscillators/mao'
import { massIndex } from '@indicators/momentum/oscillators/mass-index'
import { momentum } from '@indicators/momentum/oscillators/momentum'
import { percentagePriceOscillator } from '@indicators/momentum/oscillators/ppo'
import { roc } from '@indicators/momentum/oscillators/roc'
import { rsi } from '@indicators/momentum/oscillators/rsi'
import { safezone } from '@indicators/momentum/oscillators/safezone'
import { shannon } from '@indicators/momentum/oscillators/shannon'
import { stochasticRsi } from '@indicators/momentum/oscillators/stoch-rsi'
import { stochastic } from '@indicators/momentum/oscillators/stochastic'
import { trix } from '@indicators/momentum/oscillators/trix'
import { tsi } from '@indicators/momentum/oscillators/tsi'
import { twiggsMomentum } from '@indicators/momentum/oscillators/twiggs-momentum'
import { williamsR } from '@indicators/momentum/oscillators/williams'
import { ichimokuCloud } from '@indicators/trend/ichimoku/ichimoku-cloud'
import { alma } from '@indicators/trend/moving-averages/alma'
import { dema } from '@indicators/trend/moving-averages/dema'
import { displaced } from '@indicators/trend/moving-averages/displaced'
import { kama } from '@indicators/trend/moving-averages/kama'
import { multipleMovingAverages } from '@indicators/trend/moving-averages/mma'
import { t3 } from '@indicators/trend/moving-averages/t3'
import { tema } from '@indicators/trend/moving-averages/tema'
import { trima } from '@indicators/trend/moving-averages/trima'
import { vidya } from '@indicators/trend/moving-averages/vidya'
import { wilders } from '@indicators/trend/moving-averages/wilders'
import { comparePrices } from '@indicators/trend/overlays/compare-prices'
import { priceComparison } from '@indicators/trend/overlays/price-comparison'
import { priceDifferential } from '@indicators/trend/overlays/price-differential'
import { priceEnvelope } from '@indicators/trend/overlays/price-envelope'
import { priceRatio } from '@indicators/trend/overlays/price-ratio'
import { movingAverageRibbon } from '@indicators/trend/overlays/rib'
import { typicalPrice } from '@indicators/trend/overlays/typical-price'
import { parabolicSAR } from '@indicators/trend/parabolic/parabolic-sar'
import { camarilla } from '@indicators/trend/pivots/camarilla'
import { demarkPivots } from '@indicators/trend/pivots/demark'
import { percentageBands } from '@indicators/trend/pivots/percentage-bands'
import { pivots } from '@indicators/trend/pivots/pivot-points'
import { percentageTrailingStops } from '@indicators/trend/pivots/pts'
import { woodie } from '@indicators/trend/pivots/woodie'
import { superTrend } from '@indicators/trend/supertrend/supertrend'
import { bollingerBandWidth } from '@indicators/volatility/bollinger/bb-width'
import { bollingerBands } from '@indicators/volatility/bollinger/bollinger-bands'
import { donchianChannel } from '@indicators/volatility/channels/donchian'
import { keltnerChannel } from '@indicators/volatility/channels/keltner'
import { priceChannels } from '@indicators/volatility/channels/price-channels'
import { atr } from '@indicators/volatility/range/atr'
import { chaikinVolatility } from '@indicators/volatility/range/chaikin-volatility'
import { std } from '@indicators/volatility/range/std'
import { twiggsVolatility } from '@indicators/volatility/range/twiggs-volatility'
import { accumulationDistribution } from '@indicators/volume/flow/ad'
import { amihudIlliquidity } from '@indicators/volume/flow/amihud'
import { cmf } from '@indicators/volume/flow/cmf'
import { kylesLambda } from '@indicators/volume/flow/kyle'
import { mfi } from '@indicators/volume/flow/mfi'
import { obv } from '@indicators/volume/flow/obv'
import { priceVolumeTrend } from '@indicators/volume/flow/pvt'
import { twiggsMoneyFlow } from '@indicators/volume/flow/twiggsmf'
import { vortex } from '@indicators/volume/flow/vortex'
import { vpin } from '@indicators/volume/flow/vpin'
import { positiveVolumeIndex } from '@indicators/volume/momentum/pvi'
import { vroc } from '@indicators/volume/momentum/vroc'
import { vama } from '@indicators/volume/weighted/vama'
import { volumeProfile } from '@indicators/volume/weighted/volume-profile'
import { vwap } from '@indicators/volume/weighted/vwap'
import { vwma } from '@indicators/volume/weighted/vwma'
import { vwsma } from '@indicators/volume/weighted/vwsma'
import { ArrayUtils } from '@utils/array-utils'
import * as CalculationUtils from '@utils/calculation-utils'
import { MathUtils } from '@utils/math-utils'

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
  average: (array: number[]) => MathUtils.average(array),
  changeArray: (array: number[]) => MathUtils.changeArray(array),
  fill: (data: number[], fillValue: number) => CalculationUtils.fillNaN(data, fillValue),
  getWindowSlice: <T>(data: T[], currentIndex: number, windowSize: number) => ArrayUtils.getWindowSlice(data, currentIndex, windowSize),
  highest: (array: number[], windowSize: number = 14) => MathUtils.highest(array, windowSize),
  lowest: (array: number[], windowSize: number = 14) => MathUtils.lowest(array, windowSize),
  max: (array: number[]) => MathUtils.max(array),
  mean: (values: number[]) => CalculationUtils.calculateMean(values),
  min: (array: number[]) => MathUtils.min(array),
  processArray: <T, R>(data: T[], processor: (value: T, index: number) => R) => ArrayUtils.processArray(data, processor),
  processWindow: <T, R>(data: T[], windowSize: number, processor: (window: T[], index: number) => R) => ArrayUtils.processWindow(data, windowSize, processor),
  rolling: (data: number[], windowSize: number, statistic: 'mean' | 'median' | 'min' | 'max' | 'sum') => CalculationUtils.calculateRollingStatistic(data, windowSize, statistic),
  rollingStatistic: (data: number[], windowSize: number, statistic: 'min' | 'max' | 'mean' | 'sum') => ArrayUtils.rollingStatistic(data, windowSize, statistic),
  shift: (data: number[], offset: number) => ArrayUtils.shift(data, offset),
  shiftArray: (data: number[], shift: number) => CalculationUtils.shiftArray(data, shift),
  smoothing: (data: number[], alpha: number) => CalculationUtils.exponentialSmoothing(data, alpha),
  stdev: (values: number[]) => CalculationUtils.calculateStandardDeviation(values),
  sum: (array: number[]) => MathUtils.sum(array),
  variance: (values: number[]) => CalculationUtils.calculateVariance(values),
  wildersSmooth: (data: number[], length: number) => CalculationUtils.wildersSmoothing(data, length),

  // ===== K-SELECTION FUNCTIONS =====
  /**
   * K-selection functions for efficient order statistics
   */
  kthLargest: (array: number[], k: number) => CalculationUtils.kthLargest(array, k),
  kthSmallest: (array: number[], k: number) => CalculationUtils.kthSmallest(array, k),
  median: (array: number[]) => CalculationUtils.calculateMedian(array),
  percentile: (array: number[], percentile: number) => CalculationUtils.calculatePercentile(array, percentile),

  // ===== MATHEMATICAL FUNCTIONS =====
  /**
   * Mathematical utility functions for calculations
   */
  abs: (value: number) => MathUtils.abs(value),
  acos: (value: number) => MathUtils.acos(value),
  asin: (value: number) => MathUtils.asin(value),
  atan: (value: number) => MathUtils.atan(value),
  ceil: (value: number) => MathUtils.ceil(value),
  clamp: (value: number, min: number, max: number) => MathUtils.clamp(value, min, max),
  cos: (value: number) => MathUtils.cos(value),
  div: (numerator: number, denominator: number) => CalculationUtils.safeDivision(numerator, denominator),
  exp: (value: number) => MathUtils.exp(value),
  factorial: (value: number) => MathUtils.factorial(value),
  floor: (value: number) => MathUtils.floor(value),
  gcd: (a: number, b: number) => MathUtils.gcd(a, b),
  lcm: (a: number, b: number) => MathUtils.lcm(a, b),
  log: (value: number) => MathUtils.log(value),
  log10: (value: number) => MathUtils.log10(value),
  mod: (dividend: number, divisor: number) => MathUtils.mod(dividend, divisor),
  momentumUtil: (data: number[], length: number = 10) => CalculationUtils.calculateMomentum(data, length),
  percentrank: (value: number, min: number, max: number, multiplier: number) => CalculationUtils.calculateRangePercentage(value, min, max, multiplier),
  pow: (base: number, exponent: number) => MathUtils.pow(base, exponent),
  rem: (dividend: number, divisor: number) => MathUtils.rem(dividend, divisor),
  rocUtil: (data: number[], length: number = 10) => CalculationUtils.calculateROC(data, length),
  round: (value: number, decimals: number = 0) => MathUtils.round(value, decimals),
  sign: (value: number) => MathUtils.sign(value),
  sin: (value: number) => MathUtils.sin(value),
  sqrt: (value: number) => MathUtils.sqrt(value),
  tan: (value: number) => MathUtils.tan(value),

  // ===== PRICE CALCULATIONS =====
  /**
   * Price calculation functions for OHLC data
   */
  change: (current: number, previous: number) => MathUtils.change(current, previous),
  hl2: (data: MarketData) => CalculationUtils.PriceCalculations.hl2(data),
  hlc3: (data: MarketData) => CalculationUtils.PriceCalculations.typical(data),
  highlow: (highData: number[], lowData: number[], currentIndex: number, windowSize: number) => CalculationUtils.calculateHighLowRange(highData, lowData, currentIndex, windowSize),
  ohlc4: (data: MarketData) => CalculationUtils.PriceCalculations.ohlc4(data),

  // ===== MOVING AVERAGES =====
  /**
   * Moving average indicators for trend analysis
   */
  alma: (data: number[], length: number = 9, sigma: number = 6) => alma(data, length, sigma),
  dema: (data: number[], length: number = 20) => dema(data, length),
  displaced: (data: number[], length: number = 20, displacement: number = 0, maType: 'sma' | 'ema' | 'wma' | 'hull' = 'sma') => displaced(data, length, displacement, maType),
  ema: (data: number[], length: number) => movingAverage(data, length, 'ema'),
  hull: (data: number[], length: number) => movingAverage(data, length, 'hull'),
  kama: (data: number[], length: number = 10, fastPeriod: number = 2, slowPeriod: number = 30) => kama(data, length, fastPeriod, slowPeriod),
  rma: (data: number[], length: number) => movingAverage(data, length, 'rma'),
  sma: (data: number[], length: number) => movingAverage(data, length, 'sma'),
  t3: (data: number[], length: number = 20, a: number = 0.7) => t3(data, length, a),
  tema: (data: number[], length: number = 20) => tema(data, length),
  trima: (data: number[], length: number = 20) => trima(data, length),
  vidya: (data: number[], length: number = 14, cmoLength: number = 9) => vidya(data, length, cmoLength),
  wilders: (data: number[], length: number = 14) => wilders(data, length),
  wma: (data: number[], length: number) => movingAverage(data, length, 'wma'),
  mma: (data: MarketData | number[], config?: { length?: number, source?: string }) => multipleMovingAverages(data, config),
  ribbon: (data: MarketData | number[], periods?: number[], maType?: 'sma' | 'ema' | 'wma' | 'hull', source?: string) => movingAverageRibbon(data, periods, maType, source),

  // ===== MOMENTUM OSCILLATORS =====
  /**
   * Momentum oscillator indicators for overbought/oversold conditions
   */
  accel: (data: MarketData, fastLength: number = 5, slowLength: number = 34) => acceleratorOscillator(data, fastLength, slowLength),
  ao: (data: MarketData, fastLength: number = 5, slowLength: number = 34) => awesomeOscillator(data, fastLength, slowLength),
  aroon: (data: MarketData, length: number = 14) => aroon(data, length),
  klinger: (data: MarketData, shortPeriod: number = 34, longPeriod: number = 55) => klinger(data, shortPeriod, longPeriod),
  kst: (data: MarketData | number[], roc1?: number, roc2?: number, roc3?: number, roc4?: number, sma1?: number, sma2?: number, sma3?: number, sma4?: number, source?: string) => kst(data, roc1, roc2, roc3, roc4, sma1, sma2, sma3, sma4, source),
  aroonDown: (data: MarketData, length: number = 14) => {
    const result = aroon(data, length)
    return result.down
  },
  aroonUp: (data: MarketData, length: number = 14) => {
    const result = aroon(data, length)
    return result.up
  },
  bop: (data: MarketData, length: number = 14) => balanceOfPower(data, length),
  cci: (data: MarketData, length: number = 20) => cci(data, length),
  chaikin: (data: MarketData, fastLength: number = 3, slowLength: number = 10) => chaikinOscillator(data, fastLength, slowLength),
  choppiness: (data: MarketData, length: number = 14) => choppiness(data, length),
  cmo: (data: MarketData | number[], length: number = 14) => cmo(data, length),
  coppock: (data: MarketData | number[], roc1Length: number = 14, roc2Length: number = 11, wmaLength: number = 10) => coppock(data, roc1Length, roc2Length, wmaLength),
  eom: (data: MarketData, length: number = 14) => easeOfMovement(data, length),
  elderRay: (data: MarketData, length: number = 13) => elderRayIndex(data, length),
  macd: (data: number[], fastLength: number = 12, slowLength: number = 26, signalLength: number = 9) => {
    const result = macd(data, fastLength, slowLength, signalLength)
    return { macd: result.macd, signal: result.signal, histogram: result.histogram }
  },
  massIndex: (data: MarketData, length: number = 9) => massIndex(data, length),
  mao: (data: MarketData | number[], fastLength: number = 10, slowLength: number = 20, maType: 'sma' | 'ema' | 'wma' | 'hull' = 'sma') => movingAverageOscillator(data, fastLength, slowLength, maType),
  momentum: (data: number[], length: number = 10) => momentum(data, length),
  roc: (data: number[], length: number = 10) => roc(data, length),
  rsi: (data: number[], length: number = 14) => rsi(data, length),
  safezone: (data: number[], length: number = 20, multiplier: number = 2.0) => safezone(data, length, multiplier),
  shannon: (data: number[], length: number = 20, bins: number = 8) => shannon(data, length, bins),
  stochRsi: (data: number[], length: number = 14, kLength: number = 14, dLength: number = 3) => stochasticRsi(data, length, kLength, dLength),
  stochastic: (data: MarketData, kLength: number = 14, dLength: number = 3) => {
    const result = stochastic(data, kLength, dLength)
    return result.k
  },
  williamsR: (data: MarketData, length: number = 14) => williamsR(data, length),
  trix: (data: number[], length: number = 18) => trix(data, length),
  tsi: (data: number[], firstLength: number = 25, secondLength: number = 13) => tsi(data, firstLength, secondLength),
  twiggs: (data: number[], length: number = 20, lookback: number = 10) => twiggsMomentum(data, length, lookback),
  twiggsMomentum: (data: number[], length: number = 20, lookback: number = 10) => twiggsMomentum(data, length, lookback),

  // ===== DIRECTIONAL INDICATORS =====
  /**
   * Directional movement indicators for trend strength
   */
  adx: (data: MarketData, length: number = 14) => adx(data, length),
  apo: (data: number[], fastLength: number = 12, slowLength: number = 26) => apo(data, fastLength, slowLength),
  dmi: (data: MarketData, length: number = 14) => dmi(data, length),
  dpo: (data: MarketData | number[], length: number = 20) => dpo(data, length, 'close'),

  // ===== VOLUME INDICATORS =====
  /**
   * Volume-based indicators for market participation analysis
   */
  ad: (data: MarketData) => accumulationDistribution(data),
  amihud: (data: MarketData, length: number = 20) => amihudIlliquidity(data, length),
  cmf: (data: MarketData, length: number = 20) => cmf(data, length),
  kyle: (data: MarketData) => kylesLambda(data),
  mfi: (data: MarketData, length: number = 14) => mfi(data, length),
  obv: (data: MarketData) => obv(data),
  pvi: (data: MarketData) => positiveVolumeIndex(data),
  pvt: (data: MarketData) => priceVolumeTrend(data),
  twiggsMF: (data: MarketData, length: number = 21) => twiggsMoneyFlow(data, length),
  vwap: (data: MarketData, length: number = 20) => vwap(data, length),
  vroc: (data: MarketData, length: number = 14) => vroc(data, length),
  vwma: (data: MarketData, length: number = 20) => vwma(data, length),
  vama: (data: MarketData, length: number = 20, volumeThreshold: number = 0) => vama(data, length, volumeThreshold),
  vwsma: (data: MarketData, length: number = 20) => vwsma(data, length),
  volumeProfile: (data: MarketData, levels: number = 10) => volumeProfile(data, levels),
  vortex: (data: MarketData, length: number = 14) => vortex(data, length),
  vpin: (data: MarketData, length: number = 50, buckets: number = 50) => vpin(data, length, buckets),

  // ===== VOLATILITY INDICATORS =====
  /**
   * Volatility indicators for market volatility analysis
   */
  atr: (data: MarketData, length: number = 14) => atr(data, length),
  bbands: (data: number[], length: number = 20, multiplier: number = 2) => {
    const result = bollingerBands(data, length, multiplier)
    return { upper: result.upper, middle: result.middle, lower: result.lower }
  },
  chaikinVol: (data: MarketData, length: number = 10) => chaikinVolatility(data, length),
  bbandsAdaptive: (data: number[], length: number = 20, multiplier: number = 2) => {
    const result = bollingerBands(data, length, multiplier, 'close', 'ema')
    return { upper: result.upper, middle: result.middle, lower: result.lower }
  },
  bbwidth: (data: number[], length: number = 20, multiplier: number = 2) => bollingerBandWidth(data, length, multiplier),
  donchian: (data: MarketData, length: number = 20) => donchianChannel(data, length),
  keltner: (data: MarketData, length: number = 20, multiplier: number = 2) => keltnerChannel(data, length, multiplier),
  std: (data: number[], length: number = 20) => std(data, length),
  twiggsVol: (data: MarketData, length: number = 20, lookback: number = 10) => twiggsVolatility(data, length, lookback),

  // ===== TREND INDICATORS =====
  /**
   * Trend-following indicators for market direction analysis
   */
  ichimoku: (data: MarketData, tenkanPeriod: number = 9, kijunPeriod: number = 26, senkouBPeriod: number = 52, displacement: number = 26) => ichimokuCloud(data, tenkanPeriod, kijunPeriod, senkouBPeriod, displacement),
  psar: (data: MarketData, acceleration: number = 0.02, maximum: number = 0.2) => parabolicSAR(data, acceleration, maximum),
  supertrend: (data: MarketData, length: number = 10, multiplier: number = 3) => {
    const result = superTrend(data, length, multiplier)
    return { superTrend: result.superTrend, direction: result.direction }
  },
  woodie: (data: MarketData) => woodie(data),
  demark: (data: MarketData) => {
    const result = demarkPivots(data)
    return { pp: result.pp, r1: result.r1, r2: result.r2, r3: result.r3, s1: result.s1, s2: result.s2, s3: result.s3 }
  },

  // ===== PRICE SELECTION INDICATORS =====
  /**
   * Price-based selection and comparison indicators
   */
  pbands: (data: MarketData | number[], length: number = 20, percentage: number = 2.5) => {
    const result = percentageBands(data, length, percentage)
    return { upper: result.upper, middle: result.middle, lower: result.lower }
  },
  pchannels: (data: MarketData, length: number = 20) => {
    const result = priceChannels(data, length)
    return { upper: result.upper, lower: result.lower }
  },
  pcmp: (price1: number[], price2: number[], basePrice: number = 100) => {
    const result = priceComparison(price1, price2, basePrice)
    return { ratio: result.ratio, performance: result.performance, correlation: result.correlation }
  },
  pcompare: (price1: number[], price2: number[], basePrice: number = 100) => {
    const result = comparePrices(price1, price2, basePrice)
    return { ratio: result.ratio, performance: result.performance, correlation: result.correlation }
  },
  pdiff: (price1: number[], price2: number[]) => priceDifferential(price1, price2),
  penv: (data: MarketData | number[], length: number = 20, deviation: number = 2.5) => {
    const result = priceEnvelope(data, length, deviation)
    return { upper: result.upper, middle: result.middle, lower: result.lower }
  },
  typical: (data: MarketData) => typicalPrice(data),
  camarilla: (data: MarketData) => {
    const result = camarilla(data)
    return { pp: result.pp, r1: result.r1, r2: result.r2, r3: result.r3, s1: result.s1, s2: result.s2, s3: result.s3 }
  },
  pivots: (data: MarketData) => {
    const result = pivots(data)
    return { pp: result.pp, r1: result.r1, r2: result.r2, r3: result.r3, s1: result.s1, s2: result.s2, s3: result.s3 }
  },
  ppo: (data: MarketData | number[], fastLength: number = 12, slowLength: number = 26, signalLength: number = 9) => {
    const result = percentagePriceOscillator(data, fastLength, slowLength, signalLength)
    return { ppo: result.ppo, signal: result.signal, histogram: result.histogram }
  },
  pratio: (price1: number[], price2: number[]) => priceRatio(price1, price2),
  ptrail: (data: MarketData | number[], percentage: number = 2.5) => {
    const result = percentageTrailingStops(data, percentage)
    return { trailingStop: result.trailingStop }
  },

  // ===== MACHINE LEARNING =====
  /**
   * Machine learning indicators for advanced analysis
   */
  bayesianGlm: (data: MarketData, lookback: number = 20, threshold: number = 0.5) => bayesianGLM(data, lookback, threshold),
  knn: (data: MarketData, k?: number, lookback?: number, features?: number) => knn(data, k, lookback, features),
  marketRegime: (data: MarketData, length?: number, threshold?: number) => marketRegimeClassifier(data, length, threshold),
  mlr: (data: MarketData, length?: number, lookback?: number) => multipleLinearRegression(data, length, lookback)
}
