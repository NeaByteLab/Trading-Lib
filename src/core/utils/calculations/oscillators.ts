import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@core/utils/array-utils'
import { calculateROC } from '@core/utils/calculations/momentum'
import { movingAverage, wildersSmoothing } from '@core/utils/calculations/moving-averages'
import { calculateMean } from '@core/utils/calculations/statistical'
import { MathUtils } from '@core/utils/math-utils'
import { sanitizeArray } from '@core/utils/validation-utils'

/**
 * Relative Strength Index - measures momentum and overbought/oversold conditions
 * Formula: RSI = 100 - (100 / (1 + RS)) where RS = Average Gain / Average Loss
 *
 * @param data - Source data array
 * @param length - RSI period
 * @returns RSI values array
 *
 * @example
 * ```typescript
 * const rsi = calculateRSI(data.close, 14)
 * // Returns: [NaN, NaN, ..., 65.2, 67.8, ...]
 * ```
 */
export function calculateRSI(data: number[], length: number): number[] {
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  const changes = ArrayUtils.processArray(data, (current, i) => {
    if (i === 0) {
      return NaN
    }
    const previous = data[i - 1]!
    if (isNaN(current) || isNaN(previous) || !isFinite(current) || !isFinite(previous)) {
      return NaN
    }
    return current - previous
  })
  const gains = ArrayUtils.processArray(changes, (change) => {
    if (isNaN(change) || !isFinite(change)) {
      return NaN
    }
    return change > 0 ? change : 0
  })
  const losses = ArrayUtils.processArray(changes, (change) => {
    if (isNaN(change) || !isFinite(change)) {
      return NaN
    }
    return change < 0 ? MathUtils.abs(change) : 0
  })
  const avgGains = wildersSmoothing(gains, length)
  const avgLosses = wildersSmoothing(losses, length)
  return ArrayUtils.processArray(avgGains, (avgGain, i) => {
    const avgLoss = avgLosses[i]
    if (isNaN(avgGain) || avgLoss === undefined || isNaN(avgLoss) || !isFinite(avgGain) || !isFinite(avgLoss)) {
      return NaN
    }
    if (avgLoss === 0) {
      return avgGain > 0 ? 100 : 50
    }
    const rs = avgGain / avgLoss
    if (!isFinite(rs)) {
      return NaN
    }
    const rsi = 100 - (100 / (1 + rs))
    return isFinite(rsi) ? rsi : NaN
  })
}

/**
 * Commodity Channel Index - measures cyclical trends and overbought/oversold conditions
 * Formula: CCI = (Typical Price - SMA) / (0.015 × Mean Deviation)
 *
 * @param data - Source data array (should be typical prices HLC3)
 * @param length - CCI period
 * @returns CCI values array
 *
 * @example
 * ```typescript
 * const cci = calculateCCI(data.hlc3, 20)
 * // Returns: [NaN, NaN, ..., 125.6, -89.3, ...]
 * ```
 */
export function calculateCCI(data: number[], length: number): number[] {
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  const CCI_CONSTANT = 0.015
  const result: number[] = []

  for (let i = 0; i < data.length; i++) {
    if (i < length - 1) {
      result.push(NaN)
      continue
    }

    const window = data.slice(i - length + 1, i + 1)
    const validValues = sanitizeArray(window)
    if (validValues.length === 0) {
      result.push(NaN)
      continue
    }

    const currentPrice = data[i]!
    if (isNaN(currentPrice) || !isFinite(currentPrice)) {
      result.push(NaN)
      continue
    }

    const sma = calculateMean(validValues)
    if (!isFinite(sma)) {
      result.push(NaN)
      continue
    }

    const deviations = validValues.map(val => MathUtils.abs(val - sma))
    const meanDeviation = MathUtils.average(deviations)
    if (!isFinite(meanDeviation) || meanDeviation === 0) {
      result.push(NaN)
      continue
    }

    const cciValue = (currentPrice - sma) / (CCI_CONSTANT * meanDeviation)
    result.push(isFinite(cciValue) ? cciValue : NaN)
  }

  return result
}

/**
 * Commodity Channel Index from OHLC data - measures cyclical trends
 * Formula: CCI = (Typical Price - SMA) / (0.015 × Mean Deviation)
 *
 * @param data - Market data with high, low, close arrays
 * @param length - CCI period
 * @returns CCI values array
 *
 * @example
 * ```typescript
 * const cci = calculateCCIFromOHLC(data, 20)
 * // Returns: [NaN, NaN, ..., 125.6, -89.3, ...]
 * ```
 */
export function calculateCCIFromOHLC(data: { high: number[], low: number[], close: number[] }, length: number): number[] {
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  const typicalPrices = ArrayUtils.processArray(data.high, (_, i) => {
    const high = data.high[i]!
    const low = data.low[i]!
    const close = data.close[i]!
    return (high + low + close) / 3
  })
  return calculateCCI(typicalPrices, length)
}

/**
 * Williams %R - momentum oscillator measuring overbought/oversold levels
 * Formula: %R = ((Highest High - Close) / (Highest High - Lowest Low)) × -100
 *
 * @param close - Close prices array
 * @param high - High prices array
 * @param low - Low prices array
 * @param length - Lookback period
 * @returns Williams %R values array
 *
 * @example
 * ```typescript
 * const williams = calculateWilliamsR(data.close, data.high, data.low, 14)
 * // Returns: [NaN, NaN, ..., -25.6, -18.9, ...]
 * ```
 */
export function calculateWilliamsR(close: number[], high: number[], low: number[], length: number): number[] {
  return ArrayUtils.processArray(close, (currentClose, i) => {
    if (i < length - 1) {
      return NaN
    }
    const windowHigh = ArrayUtils.getWindowSlice(high, i, length)
    const windowLow = ArrayUtils.getWindowSlice(low, i, length)
    const validHigh = windowHigh.filter(val => !isNaN(val))
    const validLow = windowLow.filter(val => !isNaN(val))
    if (validHigh.length === 0 || validLow.length === 0) {
      return NaN
    }
    const highestHigh = MathUtils.max(validHigh)
    const lowestLow = MathUtils.min(validLow)
    const range = highestHigh - lowestLow
    if (range === 0) {
      return NaN
    }
    return ((currentClose - lowestLow) / range) * -100
  })
}

/**
 * Stochastic Oscillator - momentum indicator measuring price position within range
 * Formula: %K = ((Current Close - Lowest Low) / (Highest High - Lowest Low)) × 100
 *
 * @param data - Source data array
 * @param high - High prices array
 * @param low - Low prices array
 * @param length - Calculation period
 * @returns Stochastic values array
 * @throws {Error} If data is empty or length is invalid
 *
 * @example
 * ```typescript
 * const stoch = calculateStochastic(data.close, data.high, data.low, 14)
 * // Returns: [NaN, NaN, ..., 65.2, 72.8, ...]
 * ```
 */
export function calculateStochastic(data: number[], high: number[], low: number[], length: number): number[] {
  if (!data || data.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  return ArrayUtils.processArray(data, (close, i) => {
    if (i < length - 1) {
      return NaN
    }
    const highSlice = ArrayUtils.getWindowSlice(high, i, length)
    const lowSlice = ArrayUtils.getWindowSlice(low, i, length)
    if (highSlice.length === 0 || lowSlice.length === 0) {
      return NaN
    }
    const highest = MathUtils.max(highSlice)
    const lowest = MathUtils.min(lowSlice)
    if (highest === lowest) {
      return 50
    }
    return ((close - lowest) / (highest - lowest)) * 100
  })
}

/**
 * Calculate Stochastic RSI using centralized utilities
 *
 * @param rsiValues - RSI values array
 * @param kLength - %K calculation period
 * @param dLength - %D calculation period
 * @returns Stochastic RSI values
 * @throws {Error} If data is empty or parameters are invalid
 */
export function calculateStochasticRSI(rsiValues: number[], kLength: number, dLength: number): {
  k: number[]
  d: number[]
} {
  if (!rsiValues || rsiValues.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (kLength <= 0 || dLength <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  const k = ArrayUtils.processWindow(rsiValues, kLength, (window, i) => {
    const currentRSI = rsiValues[i]!
    const validValues = sanitizeArray(window) as number[]
    if (validValues.length === 0) {
      return NaN
    }
    const maxRSI = MathUtils.max(validValues)
    const minRSI = MathUtils.min(validValues)
    if (maxRSI === minRSI) {
      return 50
    }
    return ((currentRSI - minRSI) / (maxRSI - minRSI)) * 100
  }) as number[]
  const d = movingAverage(k, dLength, 'sma')
  return { k, d }
}

/**
 * Calculate Chande Momentum Oscillator (CMO) using centralized utilities
 *
 * CMO is a momentum oscillator that measures the momentum of price changes.
 * Formula: CMO = 100 * (Sum of gains - Sum of losses) / (Sum of gains + Sum of losses)
 *
 * @param data - Source data array
 * @param length - Calculation period
 * @returns CMO values array
 * @throws {Error} If data is empty or length is invalid
 */
export function calculateCMO(data: number[], length: number): number[] {
  if (!data || data.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  return ArrayUtils.processWindow(data, length, (window, i) => {
    if (i < length - 1) {
      return NaN
    }
    let gains = 0
    let losses = 0
    for (let j = 1; j < window.length; j++) {
      const change = window[j]! - window[j - 1]!
      if (change > 0) {
        gains += change
      } else {
        losses += Math.abs(change)
      }
    }
    const total = gains + losses
    if (total === 0) {
      return 0
    }
    const result = 100 * (gains - losses) / total
    return isFinite(result) ? result : 0
  })
}

/**
 * Calculate Klinger Oscillator
 *
 * Klinger Oscillator combines price and volume to identify long-term trends.
 * Uses sum volume (SV) calculation to determine trend direction.
 *
 * @param data - Market data
 * @param shortPeriod - Short period (default: 34)
 * @param longPeriod - Long period (default: 55)
 * @returns Klinger Oscillator values array
 * @throws {Error} If data is empty or missing volume
 */
export function calculateKlingerOscillator(data: MarketData, shortPeriod: number = 34, longPeriod: number = 55): number[] {
  if (!data || !data.close || !data.volume) {
    throw new Error(ERROR_MESSAGES.MISSING_VOLUME)
  }
  if (shortPeriod <= 0 || longPeriod <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  const { close, high, low, volume } = data
  const sv = calculateSumVolume(close, high, low, volume)
  const result: number[] = []
  for (let i = longPeriod - 1; i < sv.length; i++) {
    const shortSum = calculateSum(sv, i, shortPeriod)
    const longSum = calculateSum(sv, i, longPeriod)
    const kvoValue = shortSum - longSum
    result.push(kvoValue)
  }
  return result
}

/**
 * Calculate Sum Volume (SV) for Klinger Oscillator
 *
 * @param close - Close prices array
 * @param high - High prices array
 * @param low - Low prices array
 * @param volume - Volume array
 * @returns Array of Sum Volume values
 */
function calculateSumVolume(close: number[], high: number[], low: number[], volume: number[]): number[] {
  const sv: number[] = []
  let trend = 0
  let prevSum = 0
  for (let i = 1; i < close.length; i++) {
    const currentSum = high[i]! + low[i]! + close[i]!
    // Determine trend based on price movement
    if (currentSum > prevSum) {
      trend = 1
    } else if (currentSum < prevSum) {
      trend = -1
    }
    // If equal, maintain previous trend
    // Calculate Sum Volume based on trend and volume
    let svValue: number
    if (trend === 1) {
      // Accumulation phase - add volume
      svValue = volume[i]!
    } else if (trend === -1) {
      // Distribution phase - subtract volume
      svValue = -volume[i]!
    } else {
      // No trend change - no volume contribution
      svValue = 0
    }
    sv.push(svValue)
    prevSum = currentSum
  }
  return sv
}

/**
 * Calculate sum of values over a period
 *
 * @param values - Array of values
 * @param currentIndex - Current index
 * @param period - Period length
 * @returns Sum of values over the period
 */
function calculateSum(values: number[], currentIndex: number, period: number): number {
  let sum = 0
  for (let i = currentIndex - period + 1; i <= currentIndex; i++) {
    if (i >= 0 && i < values.length) {
      sum += values[i]!
    }
  }
  return sum
}

/**
 * Calculate Know Sure Thing (KST) oscillator
 *
 * KST combines multiple rate of change calculations to identify long-term trends.
 * Uses four different ROC periods with different weights.
 *
 * @param data - Source data array
 * @param roc1 - First ROC period (default: 10)
 * @param roc2 - Second ROC period (default: 15)
 * @param roc3 - Third ROC period (default: 20)
 * @param roc4 - Fourth ROC period (default: 30)
 * @param sma1 - First SMA period (default: 10)
 * @param sma2 - Second SMA period (default: 10)
 * @param sma3 - Third SMA period (default: 10)
 * @param sma4 - Fourth SMA period (default: 15)
 * @returns KST values array
 * @throws {Error} If data is empty or periods are invalid
 */
export function calculateKST(
  data: number[],
  roc1: number = 10,
  roc2: number = 15,
  roc3: number = 20,
  roc4: number = 30,
  sma1: number = 10,
  sma2: number = 10,
  sma3: number = 10,
  sma4: number = 15
): number[] {
  if (!data || data.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (roc1 <= 0 || roc2 <= 0 || roc3 <= 0 || roc4 <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  const roc1Values = calculateROC(data, roc1)
  const roc2Values = calculateROC(data, roc2)
  const roc3Values = calculateROC(data, roc3)
  const roc4Values = calculateROC(data, roc4)
  const sma1Values = movingAverage(roc1Values, sma1, 'sma')
  const sma2Values = movingAverage(roc2Values, sma2, 'sma')
  const sma3Values = movingAverage(roc3Values, sma3, 'sma')
  const sma4Values = movingAverage(roc4Values, sma4, 'sma')
  return ArrayUtils.processArray(sma1Values, (sma1Val, i) => {
    const sma2Val = sma2Values[i]
    const sma3Val = sma3Values[i]
    const sma4Val = sma4Values[i]
    if (sma1Val === undefined || sma2Val === undefined || sma3Val === undefined || sma4Val === undefined) {
      return NaN
    }
    if (isNaN(sma1Val) || isNaN(sma2Val) || isNaN(sma3Val) || isNaN(sma4Val)) {
      return NaN
    }
    const kst = (sma1Val * 1) + (sma2Val * 2) + (sma3Val * 3) + (sma4Val * 4)
    return isFinite(kst) ? kst : NaN
  })
}
