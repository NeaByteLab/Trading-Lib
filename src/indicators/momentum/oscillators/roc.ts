import { BaseIndicator } from '@base/base-indicator'
import { DEFAULT_LENGTHS } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { pineLength, pineSource } from '@utils/pine-script-utils'

/**
 * Rate of Change (ROC) indicator
 *
 * A momentum oscillator that measures the percentage change in price over a specified period.
 * Formula: ROC = ((Current Price - Price n periods ago) / Price n periods ago) × 100
 *
 * @example
 * ```typescript
 * const roc = new ROC()
 * const result = roc.calculate(marketData, { length: 14 })
 * console.log(result.values) // ROC values
 * ```
 */
export class ROC extends BaseIndicator {
  constructor() {
    super('ROC', 'Rate of Change', 'momentum')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const source = pineSource(data, config?.source)
    const length = pineLength(config?.length || DEFAULT_LENGTHS.ROC || 14, DEFAULT_LENGTHS.ROC || 14)
    const values = this.calculateROC(source, length)
    return {
      values,
      metadata: {
        length,
        source: config?.source || 'close'
      }
    }
  }

  private calculateROC(data: number[], length: number): number[] {
    return ArrayUtils.percentChange(data, length)
  }
}

/**
 * Calculate ROC values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'close')
 * @returns ROC values array
 */
export function roc(data: MarketData | number[], length?: number, source?: string): number[] {
  return createIndicatorWrapper(ROC, data, length, source)
}
