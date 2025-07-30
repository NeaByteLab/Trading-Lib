import { BaseIndicator } from '@base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'

/**
 * Median Price Indicator
 *
 * Calculates the median of high and low prices.
 * Formula: Median Price = (High + Low) / 2
 *
 * @example
 * ```typescript
 * const medianPrice = new MedianPrice()
 * const result = medianPrice.calculate(marketData)
 * console.log(result.values) // Median price values
 * ```
 */
export class MedianPrice extends BaseIndicator {
  constructor() {
    super('MedianPrice', 'Median Price', 'trend')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const values = this.calculateMedianPrice(data as MarketData)
    return {
      values,
      metadata: {
        length: values.length,
        source: config?.source || 'hl2'
      }
    }
  }

  private calculateMedianPrice(data: MarketData): number[] {
    return ArrayUtils.processArray(data.high, (high, i) => {
      const low = data.low[i]
      if (high === undefined || low === undefined) {return NaN}
      return (high + low) / 2
    })
  }
}

/**
 * Calculate Median Price values using wrapper function
 *
 * @param data - Market data
 * @returns Median price values array
 */
export function medianPrice(data: MarketData): number[] {
  return createIndicatorWrapper(MedianPrice, data)
}
