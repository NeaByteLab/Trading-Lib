import { ArrayUtils } from '@utils/array-utils'

/**
 * Unified momentum calculation function to eliminate duplication
 *
 * Provides momentum and ROC calculations using centralized utilities.
 * Pine Script equivalent: momentum(src, length) and roc(src, length)
 *
 * @param data - Source data array
 * @param length - Window length for calculation
 * @param type - Calculation type ('momentum' or 'roc')
 * @returns Array of momentum or ROC values
 * @throws {Error} If data is not an array or length is invalid
 *
 * @example
 * ```typescript
 * const prices = [100, 101, 102, 103, 104, 105]
 * const momentum = calculateMomentum(prices, 2, 'momentum')
 * const roc = calculateMomentum(prices, 2, 'roc')
 * ```
 */

const DATA_ERROR = 'Data must be an array'
const LENGTH_ERROR = 'Length must be a positive integer'

export function calculateMomentum(
  data: number[],
  length: number,
  type: 'momentum' | 'roc' = 'momentum'
): number[] {
  if (!Array.isArray(data)) {
    throw new Error(DATA_ERROR)
  }
  if (length <= 0) {
    throw new Error(LENGTH_ERROR)
  }

  switch (type) {
  case 'momentum':
    return momentum(data, length)
  case 'roc':
    return roc(data, length)
  default:
    return momentum(data, length)
  }
}

/**
 * Calculate momentum (current price - price n periods ago)
 *
 * Uses centralized calculation utilities for consistency.
 * Pine Script equivalent: momentum(src, length)
 *
 * @param data - Source data array
 * @param length - Number of periods to look back
 * @returns Array of momentum values
 * @throws {Error} If data is not an array or length is invalid
 *
 * @example
 * ```typescript
 * const prices = [100, 101, 102, 103, 104, 105]
 * const momentum = momentum(prices, 2)
 * console.log(momentum) // [1, 1, 1, 1]
 * ```
 */
export function momentum(data: number[], length: number): number[] {
  if (!Array.isArray(data)) {
    throw new Error(DATA_ERROR)
  }
  if (length <= 0) {
    throw new Error(LENGTH_ERROR)
  }

  return ArrayUtils.processWindow(data, length, (_, i) => {
    const current = data[i]!
    const previous = data[i - length]!

    if (isNaN(current) || isNaN(previous)) {
      return NaN
    } else {
      return current - previous
    }
  })
}

/**
 * Calculate Rate of Change (ROC)
 *
 * Uses centralized calculation utilities for consistency.
 * Pine Script equivalent: roc(src, length)
 *
 * @param data - Source data array
 * @param length - Number of periods to look back
 * @returns Array of ROC values
 * @throws {Error} If data is not an array or length is invalid
 *
 * @example
 * ```typescript
 * const prices = [100, 101, 102, 103, 104, 105]
 * const roc = roc(prices, 2)
 * console.log(roc) // [2, 1.98, 1.96, 1.94]
 * ```
 */
export function roc(data: number[], length: number): number[] {
  if (!Array.isArray(data)) {
    throw new Error(DATA_ERROR)
  }
  if (length <= 0) {
    throw new Error(LENGTH_ERROR)
  }

  return ArrayUtils.processWindow(data, length, (_, i) => {
    const current = data[i]!
    const previous = data[i - length]!

    if (isNaN(current) || isNaN(previous) || previous === 0) {
      return NaN
    } else {
      return ((current - previous) / previous) * 100
    }
  })
}
