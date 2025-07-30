import { createPivotIndicator } from '@core/factories/indicator-factory'
import type { MarketData } from '@core/types/indicator-types'
import { calculateWoodiePivots } from '@utils/calculation-utils'
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils'

/**
 * Woodie Pivots Indicator
 *
 * Calculates support and resistance levels based on the previous day's high, low, and close.
 * Uses a modified pivot point formula that gives more weight to the close price.
 *
 * @example
 * ```typescript
 * const woodie = new WoodiePivots()
 * const result = woodie.calculate(marketData)
 * console.log(result.values) // Pivot point values
 * console.log(result.metadata.r1) // R1 resistance levels
 * console.log(result.metadata.s1) // S1 support levels
 * ```
 */
export const WoodiePivots = createPivotIndicator(
  'WoodiePivots',
  'Woodie Pivot Points',
  calculateWoodiePivots
)

/**
 * Calculate Woodie Pivots using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @returns Woodie pivot levels
 */
export function woodie(data: MarketData): {
  pp: number[]
  r1: number[]
  r2: number[]
  r3: number[]
  s1: number[]
  s2: number[]
  s3: number[]
} {
  const result = createMultiResultIndicatorWrapper(WoodiePivots, data)
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
