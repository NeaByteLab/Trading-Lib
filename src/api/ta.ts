// Import Pine Script core functions
import { movingAverage } from '@calculations/moving-averages'
import type { MarketData } from '@core/types/indicator-types'
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
  // Math Functions
  abs: (value: number) => MathUtils.abs(value),
  sqrt: (value: number) => MathUtils.sqrt(value),
  pow: (base: number, exponent: number) => MathUtils.pow(base, exponent),
  log: (value: number) => MathUtils.log(value),
  log10: (value: number) => MathUtils.log10(value),
  sin: (value: number) => MathUtils.sin(value),
  cos: (value: number) => MathUtils.cos(value),
  tan: (value: number) => MathUtils.tan(value),
  asin: (value: number) => MathUtils.asin(value),
  acos: (value: number) => MathUtils.acos(value),
  atan: (value: number) => MathUtils.atan(value),
  floor: (value: number) => MathUtils.floor(value),
  ceil: (value: number) => MathUtils.ceil(value),
  sign: (value: number) => MathUtils.sign(value),
  exp: (value: number) => MathUtils.exp(value),
  mod: (dividend: number, divisor: number) => MathUtils.mod(dividend, divisor),
  rem: (dividend: number, divisor: number) => MathUtils.rem(dividend, divisor),
  factorial: (value: number) => MathUtils.factorial(value),
  gcd: (a: number, b: number) => MathUtils.gcd(a, b),
  lcm: (a: number, b: number) => MathUtils.lcm(a, b),
  sum: (array: number[]) => MathUtils.sum(array),
  average: (array: number[]) => MathUtils.average(array),
  min: (array: number[]) => MathUtils.min(array),
  max: (array: number[]) => MathUtils.max(array),
  highest: (array: number[], windowSize: number = 14) => MathUtils.highest(array, windowSize),
  lowest: (array: number[], windowSize: number = 14) => MathUtils.lowest(array, windowSize),
  change: (current: number, previous: number) => MathUtils.change(current, previous),
  clamp: (value: number, min: number, max: number) => MathUtils.clamp(value, min, max),
  round: (value: number, decimals: number = 0) => MathUtils.round(value, decimals),

  // Array Functions
  processArray: <T, R>(data: T[], processor: (value: T, index: number) => R) => ArrayUtils.processArray(data, processor),
  processWindow: <T, R>(data: T[], windowSize: number, processor: (window: T[], index: number) => R) => ArrayUtils.processWindow(data, windowSize, processor),
  rollingStatistic: (data: number[], windowSize: number, statistic: 'min' | 'max' | 'mean' | 'sum') => ArrayUtils.rollingStatistic(data, windowSize, statistic),
  shift: (data: number[], offset: number) => ArrayUtils.shift(data, offset),
  getWindowSlice: <T>(data: T[], currentIndex: number, windowSize: number) => ArrayUtils.getWindowSlice(data, currentIndex, windowSize),

  // Price Calculations
  hl2: (data: MarketData) => CalculationUtils.PriceCalculations.hl2(data),
  hlc3: (data: MarketData) => CalculationUtils.PriceCalculations.typical(data),
  ohlc4: (data: MarketData) => CalculationUtils.PriceCalculations.ohlc4(data),

  // Calculation Functions
  fillNaN: (data: number[], fillValue: number) => CalculationUtils.fillNaN(data, fillValue),
  shiftArray: (data: number[], shift: number) => CalculationUtils.shiftArray(data, shift),
  calculateRSI: (data: number[], length: number) => CalculationUtils.calculateRSI(data, length),
  calculateCCI: (data: number[], length: number) => CalculationUtils.calculateCCI(data, length),
  calculateMean: (values: number[]) => CalculationUtils.calculateMean(values),
  calculateVariance: (values: number[]) => CalculationUtils.calculateVariance(values),
  calculateStandardDeviation: (values: number[]) => CalculationUtils.calculateStandardDeviation(values),
  calculateRollingStatistic: (data: number[], windowSize: number, statistic: 'mean' | 'median' | 'min' | 'max' | 'sum') => CalculationUtils.calculateRollingStatistic(data, windowSize, statistic),
  exponentialSmoothing: (data: number[], alpha: number) => CalculationUtils.exponentialSmoothing(data, alpha),
  wildersSmoothing: (data: number[], length: number) => CalculationUtils.wildersSmoothing(data, length),
  safeDivision: (numerator: number, denominator: number) => CalculationUtils.safeDivision(numerator, denominator),
  calculateRangePercentage: (value: number, min: number, max: number, multiplier: number) => CalculationUtils.calculateRangePercentage(value, min, max, multiplier),
  calculateHighLowRange: (highData: number[], lowData: number[], currentIndex: number, windowSize: number) => CalculationUtils.calculateHighLowRange(highData, lowData, currentIndex, windowSize),

  // Moving Averages
  sma: (data: number[], length: number) => movingAverage(data, length, 'sma'),
  ema: (data: number[], length: number) => movingAverage(data, length, 'ema'),
  wma: (data: number[], length: number) => movingAverage(data, length, 'wma'),
  hull: (data: number[], length: number) => movingAverage(data, length, 'hull'),

  // Momentum Indicators
  rsi: (data: number[], length: number = 14) => CalculationUtils.calculateRSI(data, length),
  cci: (data: number[], length: number = 20) => CalculationUtils.calculateCCI(data, length),
  macd: (data: number[], fastLength: number = 12, slowLength: number = 26, signalLength: number = 9) => {
    const fastEMA = movingAverage(data, fastLength, 'ema')
    const slowEMA = movingAverage(data, slowLength, 'ema')
    const macdLine = ArrayUtils.processArray(fastEMA, (fast, i) => {
      const slow = slowEMA[i]
      return fast !== undefined && slow !== undefined && !isNaN(fast) && !isNaN(slow) ? fast - slow : NaN
    })
    const signal = movingAverage(macdLine, signalLength, 'ema')
    const histogram = ArrayUtils.processArray(macdLine, (macdVal, i) => {
      const signalVal = signal[i]
      return macdVal !== undefined && signalVal !== undefined && !isNaN(macdVal) && !isNaN(signalVal) ? macdVal - signalVal : NaN
    })
    return { macd: macdLine, signal, histogram }
  },

  // Volatility Indicators
  bbands: (data: number[], length: number = 20, multiplier: number = 2) => {
    const middle = movingAverage(data, length, 'sma')
    const stdDev = ArrayUtils.processWindow(data, length, (window) => CalculationUtils.calculateStandardDeviation(window))
    const upper = ArrayUtils.processArray(middle, (middleVal, i) => {
      const stdDevVal = stdDev[i]
      return middleVal !== undefined && stdDevVal !== undefined && !isNaN(middleVal) && !isNaN(stdDevVal) ? middleVal + (multiplier * stdDevVal) : NaN
    })
    const lower = ArrayUtils.processArray(middle, (middleVal, i) => {
      const stdDevVal = stdDev[i]
      return middleVal !== undefined && stdDevVal !== undefined && !isNaN(middleVal) && !isNaN(stdDevVal) ? middleVal - (multiplier * stdDevVal) : NaN
    })
    return { upper, middle, lower }
  }
}
