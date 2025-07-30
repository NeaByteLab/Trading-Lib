import { ArrayUtils } from '@utils/array-utils'
import { MathUtils } from '@utils/math-utils'

/**
 * Calculate True Range (TR)
 *
 * True Range is the greatest of the following:
 * 1. Current High - Current Low
 * 2. |Current High - Previous Close|
 * 3. |Current Low - Previous Close|
 *
 * @param data - Market data with high, low, close arrays
 * @returns Array of True Range values
 */
export function trueRange(data: { high: number[], low: number[], close: number[] }): number[] {
  return ArrayUtils.processArray(data.high, (_, i) => {
    const high = data.high[i]!
    const low = data.low[i]!
    if (i === 0) {
      return high - low
    }
    const prevClose = data.close[i - 1]!
    const tr1 = high - low
    const tr2 = MathUtils.abs(high - prevClose)
    const tr3 = MathUtils.abs(low - prevClose)
    return MathUtils.max([tr1, tr2, tr3])
  })
}
