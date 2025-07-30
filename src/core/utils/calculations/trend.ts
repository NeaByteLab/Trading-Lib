import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@core/utils/array-utils'
import { MathUtils } from '@core/utils/math-utils'

/**
 * Calculate directional movement (DM) values
 * Centralized utility to eliminate duplication between ADX and DMI indicators
 *
 * @param data - Market data
 * @param i - Current index
 * @param prevHigh - Previous high value
 * @param prevLow - Previous low value
 * @returns Object with plusDM and minusDM values
 */
export function calculateDirectionalMovement(
  data: MarketData,
  i: number,
  prevHigh: number,
  prevLow: number
): {
  plusDM: number
  minusDM: number
} {
  const currentHigh = data.high[i]!
  const currentLow = data.low[i]!
  const plusDM = currentHigh - prevHigh > prevLow - currentLow && currentHigh - prevHigh > 0
    ? currentHigh - prevHigh
    : 0
  const minusDM = prevLow - currentLow > currentHigh - prevHigh && prevLow - currentLow > 0
    ? prevLow - currentLow
    : 0
  return { plusDM, minusDM }
}

/**
 * Calculate smoothed values for directional indicators
 * Centralized utility to eliminate duplication between ADX and DMI indicators
 *
 * @param tr - True range value
 * @param plusDM - Plus directional movement
 * @param minusDM - Minus directional movement
 * @param i - Current index
 * @param length - Calculation period
 * @param plusDIValues - Array of previous +DI values
 * @param minusDIValues - Array of previous -DI values
 * @param trValues - Array of true range values
 * @returns Object with smoothed TR, +DM, and -DM values
 */
export function calculateSmoothedDirectionalValues(
  tr: number,
  plusDM: number,
  minusDM: number,
  i: number,
  length: number,
  plusDIValues: number[],
  minusDIValues: number[],
  trValues: number[]
): {
  smoothedTR: number
  smoothedPlusDM: number
  smoothedMinusDM: number
} {
  const smoothedTR = i < length ? tr : (tr + (i - 1) * trValues[i - 1]!) / i
  const smoothedPlusDM = i < length ? plusDM : (plusDM + (i - 1) * (plusDIValues[i - 1] || 0)) / i
  const smoothedMinusDM = i < length ? minusDM : (minusDM + (i - 1) * (minusDIValues[i - 1] || 0)) / i
  return { smoothedTR, smoothedPlusDM, smoothedMinusDM }
}

/**
 * Calculate Balance of Power using centralized utilities
 *
 * @param data - Market data with OHLC
 * @returns Raw BOP values array
 */
export function calculateBalanceOfPower(data: MarketData): number[] {
  return ArrayUtils.processArray(data.close, (close, i) => {
    const open = data.open[i]!
    const high = data.high[i]!
    const low = data.low[i]!
    const range = high - low
    return range === 0 ? 0 : (close - open) / range
  })
}

/**
 * Calculate high/low range for window
 *
 * @param highData - High prices array
 * @param lowData - Low prices array
 * @param currentIndex - Current index
 * @param windowSize - Window size
 * @returns Object with highest and lowest values
 */
export function calculateHighLowRange(highData: number[], lowData: number[], currentIndex: number, windowSize: number): {
  highest: number
  lowest: number
} {
  const highSlice = ArrayUtils.getWindowSlice(highData, currentIndex, windowSize)
  const lowSlice = ArrayUtils.getWindowSlice(lowData, currentIndex, windowSize)
  if (highSlice.length === 0 || lowSlice.length === 0) {
    return { highest: NaN, lowest: NaN }
  }
  return {
    highest: MathUtils.max(highSlice),
    lowest: MathUtils.min(lowSlice)
  }
}

/**
 * Find days since highest and lowest values using centralized utilities
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param currentIndex - Current index
 * @param length - Lookback period
 * @returns Days since highest and lowest values
 * @throws {Error} If data is empty or parameters are invalid
 */
export function findDaysSinceExtremes(high: number[], low: number[], currentIndex: number, length: number): {
  daysSinceHigh: number
  daysSinceLow: number
} {
  if (!high || !low || high.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  const startIndex = Math.max(0, currentIndex - length + 1)
  const highSlice = high.slice(startIndex, currentIndex + 1)
  const lowSlice = low.slice(startIndex, currentIndex + 1)
  const highestHigh = MathUtils.max(highSlice)
  const lowestLow = MathUtils.min(lowSlice)
  let daysSinceHigh = 0
  let daysSinceLow = 0
  for (let j = highSlice.length - 1; j >= 0; j--) {
    if (highSlice[j] === highestHigh) {
      daysSinceHigh = highSlice.length - 1 - j
      break
    }
  }
  for (let j = lowSlice.length - 1; j >= 0; j--) {
    if (lowSlice[j] === lowestLow) {
      daysSinceLow = lowSlice.length - 1 - j
      break
    }
  }
  return { daysSinceHigh, daysSinceLow }
}
