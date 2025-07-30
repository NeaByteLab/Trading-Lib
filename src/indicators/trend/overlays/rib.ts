import { BaseIndicator } from '@base/base-indicator'
import { movingAverage } from '@calculations/moving-averages'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { pineSource } from '@utils/pine-script-utils'

/**
 * Moving Average Ribbon Indicator
 *
 * Displays multiple moving averages to show trend strength and direction.
 * Creates a ribbon effect with multiple MAs of different periods.
 *
 * @example
 * ```typescript
 * const ribbon = new MovingAverageRibbon()
 * const result = ribbon.calculate(marketData, { periods: [10, 20, 30, 40] })
 * console.log(result.values) // Primary MA values
 * console.log(result.metadata.ribbon) // All MA values
 * ```
 */
export class MovingAverageRibbon extends BaseIndicator {
  constructor() {
    super('MovingAverageRibbon', 'Moving Average Ribbon', 'trend')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const source = pineSource(data, config?.source)
    const periods = (config?.['periods'] as unknown as number[]) || [10, 20, 30, 40]
    const maType = (config?.['maType'] as string) || 'sma'
    if (!Array.isArray(periods) || periods.length === 0) {
      throw new Error('Periods must be a non-empty array')
    }
    if (periods.some(p => p <= 0)) {
      throw new Error('All periods must be positive')
    }
    const { ribbon, primary } = this.calculateRibbon(source, periods, maType as 'sma' | 'ema' | 'wma' | 'hull')
    return {
      values: primary,
      metadata: {
        length: primary.length,
        periods,
        maType,
        source: config?.source || 'close',
        ribbon: ribbon as unknown as number[]
      }
    }
  }

  private calculateRibbon(data: number[], periods: number[], maType: 'sma' | 'ema' | 'wma' | 'hull'): {
    ribbon: number[][]
    primary: number[]
  } {
    const ribbon: number[][] = []
    for (const period of periods) {
      const ma = movingAverage(data, period, maType)
      ribbon.push(ma)
    }
    const primary = ribbon[0] || []
    return { ribbon, primary }
  }
}

/**
 * Calculate Moving Average Ribbon values using wrapper function
 *
 * @param data - Market data or price array
 * @param periods - Array of MA periods (default: [10, 20, 30, 40])
 * @param maType - Moving average type (default: 'sma')
 * @param source - Price source (default: 'close')
 * @returns Object with primary MA and ribbon arrays
 */
export function movingAverageRibbon(
  data: MarketData | number[],
  periods?: number[],
  maType?: 'sma' | 'ema' | 'wma' | 'hull',
  source?: string
): {
  ribbon: number[][]
  primary: number[]
} {
  const indicator = new MovingAverageRibbon()
  const config: IndicatorConfig = { ...source && { source }, periods: periods as unknown as number, maType }
  const result = indicator.calculate(data, config)
  return {
    ribbon: result.metadata['ribbon'] as unknown as number[][],
    primary: result.values
  }
}
