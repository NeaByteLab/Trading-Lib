import { BaseIndicator } from '@base/base-indicator'
import { movingAverage } from '@calculations/moving-averages'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { pineSource } from '@utils/pine-script-utils'

/**
 * Multiple Moving Averages Indicator
 *
 * Calculates multiple moving averages simultaneously for trend analysis.
 * Returns an object with all MA values for easy comparison and analysis.
 *
 * @example
 * ```typescript
 * const mma = new MultipleMovingAverages()
 * const result = mma.calculate(marketData, { periods: [10, 20, 50], types: ['sma', 'ema'] })
 * console.log(result.values) // Primary MA values
 * console.log(result.metadata.movingAveragesKeys) // MA keys
 * ```
 */
export class MultipleMovingAverages extends BaseIndicator {
  constructor() {
    super('MultipleMovingAverages', 'Multiple Moving Averages', 'trend')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const source = pineSource(data, config?.source)
    const periods = (config?.['periods'] as unknown as number[]) || [10, 20, 50]
    const types = (config?.['types'] as unknown as string[]) || ['sma', 'ema']
    if (!Array.isArray(periods) || periods.length === 0) {
      throw new Error('Periods must be a non-empty array')
    }
    if (!Array.isArray(types) || types.length === 0) {
      throw new Error('Types must be a non-empty array')
    }
    if (periods.some(p => p <= 0)) {
      throw new Error('All periods must be positive')
    }
    const validTypes = ['sma', 'ema', 'wma', 'hull']
    if (types.some(t => !validTypes.includes(t))) {
      throw new Error('Invalid moving average type')
    }
    const { movingAverages, primary } = this.calculateMultipleMAs(source, periods, types)
    return {
      values: primary,
      metadata: {
        length: periods[0] || 10,
        periods: periods.join(','),
        types: types.join(','),
        source: config?.source || 'close',
        movingAveragesKeys: Object.keys(movingAverages).join(',')
      }
    }
  }

  private calculateMultipleMAs(data: number[], periods: number[], types: string[]): {
    movingAverages: Record<string, number[]>
    primary: number[]
  } {
    const movingAverages: Record<string, number[]> = {}
    for (const period of periods) {
      for (const type of types) {
        const key = `${type}_${period}`
        movingAverages[key] = movingAverage(data, period, type as 'sma' | 'ema' | 'wma' | 'hull')
      }
    }
    const primary = movingAverages[`${types[0]}_${periods[0]}`] || []
    return { movingAverages, primary }
  }
}

/**
 * Multiple Moving Averages wrapper function
 *
 * @param data - Market data or price array
 * @param config - Configuration object with periods and types
 * @returns Moving averages result
 */
export function multipleMovingAverages(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
  const indicator = new MultipleMovingAverages()
  return indicator.calculate(data, config)
}
