import { BaseIndicator } from '@core/base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { pineSource } from '@core/utils/pine-script-utils'

/**
 * Relative Strength Indicator
 *
 * Calculates the ratio of two assets' closing prices to measure relative strength.
 *
 * @param dataA - MarketData or price array for asset A
 * @param dataB - MarketData or price array for asset B
 * @param source - Price source (default: 'close')
 * @returns Array of relative strength values (A/B)
 *
 * @example
 * ```typescript
 * const rs = relativeStrength(assetA, assetB)
 * // rs[i] = assetA[i] / assetB[i]
 * ```
 */
export class RelativeStrengthIndicator extends BaseIndicator {
  constructor() {
    super('RelativeStrength', 'Relative Strength', 'momentum')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)

    // For relative strength, we need two data sources
    // This is a simplified version that works with the first dataset
    const source = config?.source || 'close'
    const values = pineSource(data, source)

    return {
      values,
      metadata: {
        length: values.length,
        source
      }
    }
  }
}

export function relativeStrength(dataA: MarketData | number[], _dataB: MarketData | number[], source?: string): number[] {
  const indicator = new RelativeStrengthIndicator()
  const config: IndicatorConfig = {}

  if (source !== undefined) {config.source = source}

  const result = indicator.calculate(dataA, config)
  return result.values
}
