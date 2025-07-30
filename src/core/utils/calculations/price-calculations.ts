import { ArrayUtils } from '@core/utils/array-utils'

/**
 * Price calculation utilities
 *
 * Provides centralized price calculation functions to eliminate code duplication.
 * All indicators should use these utilities instead of manual implementations.
 */
export const PriceCalculations = {
  /**
   * Calculate typical price (HLC3)
   *
   * @param data - Market data with high, low, close arrays
   * @returns Array of typical prices
   */
  typical(data: { high: number[], low: number[], close: number[] }): number[] {
    return ArrayUtils.processArray(data.high, (_, i) => {
      const high = data.high[i]!
      const low = data.low[i]!
      const close = data.close[i]!
      return (high + low + close) / 3
    })
  },

  /**
   * Calculate HL2 (High + Low) / 2
   *
   * @param data - Market data with high, low arrays
   * @returns Array of HL2 values
   */
  hl2(data: { high: number[], low: number[] }): number[] {
    return ArrayUtils.processArray(data.high, (_, i) => {
      const high = data.high[i]!
      const low = data.low[i]!
      return (high + low) / 2
    })
  },

  /**
   * Calculate OHLC4 (Open + High + Low + Close) / 4
   *
   * @param data - Market data with open, high, low, close arrays
   * @returns Array of OHLC4 values
   */
  ohlc4(data: { open: number[], high: number[], low: number[], close: number[] }): number[] {
    return ArrayUtils.processArray(data.open, (_, i) => {
      const open = data.open[i]!
      const high = data.high[i]!
      const low = data.low[i]!
      const close = data.close[i]!
      return (open + high + low + close) / 4
    })
  }
}

/**
 * Calculate HLC3 (High + Low + Close) / 3
 *
 * @param high - High price
 * @param low - Low price
 * @param close - Close price
 * @returns HLC3 value
 */
export function calculateHLC3(high: number, low: number, close: number): number {
  return (high + low + close) / 3
}

/**
 * Calculate money flow multiplier for volume indicators
 *
 * @param high - High price
 * @param low - Low price
 * @param close - Close price
 * @returns Money flow multiplier
 */
export function calculateMoneyFlowMultiplier(high: number, low: number, close: number): number {
  const range = high - low
  if (range === 0) {
    return 0
  }
  return ((close - low) - (high - close)) / range
}
