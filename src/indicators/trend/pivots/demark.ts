import { createPivotIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { extractResultProperties } from '@utils/calculation-utils'
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils'

/**
 * Calculate DeMark pivot points
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @returns DeMark pivot levels
 */
function calculateDeMarkPivots(high: number[], low: number[], close: number[]): {
  pp: number[]
  r1: number[]
  r2: number[]
  r3: number[]
  s1: number[]
  s2: number[]
  s3: number[]
} {
  const results = ArrayUtils.processArray(close, (_, i) => {
    if (i === 0) {
      return { pp: NaN, r1: NaN, r2: NaN, r3: NaN, s1: NaN, s2: NaN, s3: NaN }
    }
    const prevHigh = high[i - 1]!
    const prevLow = low[i - 1]!
    const prevClose = close[i - 1]!
    const x = prevClose > prevHigh ? prevHigh + (2 * (prevClose - prevHigh)) : prevClose
    const y = prevClose < prevLow ? prevLow - (2 * (prevLow - prevClose)) : prevClose
    const pivot = (x + y + prevClose) / 3
    const r1 = (2 * pivot) - prevLow
    const s1 = (2 * pivot) - prevHigh
    const r2 = pivot + (prevHigh - prevLow)
    const s2 = pivot - (prevHigh - prevLow)
    const r3 = prevHigh + (2 * (pivot - prevLow))
    const s3 = prevLow - (2 * (prevHigh - pivot))
    return {
      pp: isFinite(pivot) ? pivot : NaN,
      r1: isFinite(r1) ? r1 : NaN,
      r2: isFinite(r2) ? r2 : NaN,
      r3: isFinite(r3) ? r3 : NaN,
      s1: isFinite(s1) ? s1 : NaN,
      s2: isFinite(s2) ? s2 : NaN,
      s3: isFinite(s3) ? s3 : NaN
    }
  })
  const extracted = extractResultProperties(results, ['pp', 'r1', 'r2', 'r3', 's1', 's2', 's3'])
  return {
    pp: extracted['pp'] as number[],
    r1: extracted['r1'] as number[],
    r2: extracted['r2'] as number[],
    r3: extracted['r3'] as number[],
    s1: extracted['s1'] as number[],
    s2: extracted['s2'] as number[],
    s3: extracted['s3'] as number[]
  }
}

/**
 * DeMark Pivot Points Indicator
 *
 * Calculates pivot points using DeMark's methodology.
 * Uses previous high, low, and close to determine pivot levels.
 *
 * @example
 * ```typescript
 * const demark = new DeMarkPivots()
 * const result = demark.calculate(marketData)
 * console.log(result.values) // Pivot point values
 * console.log(result.metadata.r1) // R1 resistance values
 * ```
 */
export const DeMarkPivots = createPivotIndicator(
  'DeMarkPivots',
  'DeMark Pivot Points',
  calculateDeMarkPivots
)

/**
 * Calculate DeMark Pivots using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @returns DeMark pivot levels
 */
export function demarkPivots(data: MarketData): {
  pp: number[]
  r1: number[]
  r2: number[]
  r3: number[]
  s1: number[]
  s2: number[]
  s3: number[]
} {
  const result = createMultiResultIndicatorWrapper(DeMarkPivots, data)
  return {
    pp: result.values,
    r1: result.metadata['r1'] as number[],
    r2: result.metadata['r2'] as number[],
    r3: result.metadata['r3'] as number[],
    s1: result.metadata['s1'] as number[],
    s2: result.metadata['s2'] as number[],
    s3: result.metadata['s3'] as number[]
  }
}
