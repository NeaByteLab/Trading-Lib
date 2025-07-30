import { BaseIndicator } from '@base/base-indicator'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { calculatePriceComparison } from '@utils/calculation-utils'

/**
 * Calculate Compare Prices
 *
 * Compares two price series and calculates ratio, performance, and correlation.
 * Formula: Ratio = Price1 / Price2, Performance = (Price1 - Price2) / Price2 * 100
 *
 * @param price1 - First price array
 * @param price2 - Second price array
 * @param basePrice - Base price for comparison (default: 100)
 * @returns Comparison results
 */
function calculateComparePrices(price1: number[], price2: number[], basePrice: number = 100): {
  ratio: number[]
  performance: number[]
  correlation: number
} {
  return calculatePriceComparison(price1, price2, basePrice)
}

/**
 * Compare Prices Indicator
 *
 * Compares two price series to analyze their relative performance.
 * Provides ratio, performance percentage, and correlation coefficient.
 *
 * @example
 * ```typescript
 * const compare = new ComparePrices()
 * const result = compare.calculate([price1, price2], { basePrice: 100 })
 * console.log(result.values) // Ratio values
 * console.log(result.metadata.performance) // Performance values
 * console.log(result.metadata.correlation) // Correlation coefficient
 * ```
 */
export class ComparePrices extends BaseIndicator {
  constructor() {
    super('ComparePrices', 'Compare Prices', 'trend')
  }

  override validateInput(data: MarketData | number[], _config?: IndicatorConfig): void {
    if (!Array.isArray(data) || data.length !== 2) {
      throw new Error('Data must be an array with exactly 2 price arrays')
    }
    const [price1, price2] = data
    if (!Array.isArray(price1) || !Array.isArray(price2)) {
      throw new Error('Both elements must be price arrays')
    }
    if (price1.length !== price2.length) {
      throw new Error(ERROR_MESSAGES.ARRAY_LENGTH_MISMATCH)
    }
    if (price1.length === 0 || price2.length === 0) {
      throw new Error(ERROR_MESSAGES.EMPTY_DATA)
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const [price1, price2] = data as unknown as [number[], number[]]
    const basePrice = (config?.['basePrice'] as number) || 100
    const { ratio, performance, correlation } = calculateComparePrices(price1!, price2!, basePrice)
    return {
      values: ratio,
      metadata: {
        length: ratio.length,
        performance,
        correlation,
        basePrice,
        source: config?.source || 'close'
      }
    }
  }
}

/**
 * Calculate Compare Prices using wrapper function
 *
 * @param price1 - First price array
 * @param price2 - Second price array
 * @param basePrice - Base price for comparison (default: 100)
 * @returns Comparison results
 */
export function comparePrices(price1: number[], price2: number[], basePrice: number = 100): {
  ratio: number[]
  performance: number[]
  correlation: number
} {
  const indicator = new ComparePrices()
  const result = indicator.calculate([price1, price2] as unknown as MarketData | number[], { basePrice })
  return {
    ratio: result.values,
    performance: result.metadata['performance'] as number[],
    correlation: result.metadata['correlation'] as number
  }
}
