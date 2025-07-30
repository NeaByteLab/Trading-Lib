import { BaseIndicator } from '@base/base-indicator'
import { movingAverage } from '@calculations/moving-averages'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { pineLength, pineSource } from '@utils/pine-script-utils'

/**
 * Calculate Moving Average Envelopes
 *
 * Creates bands around a moving average by adding/subtracting a percentage.
 * Formula: Upper = MA + (MA * percentage), Lower = MA - (MA * percentage)
 *
 * @param data - Price data array
 * @param length - Calculation period (default: 20)
 * @param percentage - Envelope percentage (default: 0.025)
 * @param maType - Moving average type (default: 'sma')
 * @returns Object with upper, middle, and lower band arrays
 * @throws {Error} If data is empty or parameters are invalid
 */
function calculateEnvelopes(data: number[], length: number = 20, percentage: number = 0.025, maType: 'sma' | 'ema' | 'wma' | 'hull'): {
  upper: number[]
  middle: number[]
  lower: number[]
} {
  if (percentage < 0) {
    throw new Error('Percentage must be positive')
  }
  const middle = movingAverage(data, length, maType)
  const upper = ArrayUtils.processArray(middle, (ma) => {
    if (ma === undefined || isNaN(ma)) {
      return NaN
    }
    return ma * (1 + percentage)
  })
  const lower = ArrayUtils.processArray(middle, (ma) => {
    if (ma === undefined || isNaN(ma)) {
      return NaN
    }
    return ma * (1 - percentage)
  })
  return { upper, middle, lower }
}

/**
 * Moving Average Envelopes Indicator
 *
 * Creates bands around a moving average by adding/subtracting a percentage.
 * Formula: Upper = MA + (MA * percentage), Lower = MA - (MA * percentage)
 *
 * @example
 * ```typescript
 * const envelopes = new MovingAverageEnvelopes()
 * const result = envelopes.calculate(marketData, { length: 20, percentage: 0.025 })
 * console.log(result.values) // Middle line values
 * console.log(result.metadata.upper) // Upper band values
 * console.log(result.metadata.lower) // Lower band values
 * ```
 */
export class MovingAverageEnvelopes extends BaseIndicator {
  constructor() {
    super('MovingAverageEnvelopes', 'Moving Average Envelopes', 'trend')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const source = pineSource(data, config?.source)
    const length = pineLength(config?.length || 20, 20)
    const percentage = (config?.['percentage'] as number) || 0.025
    const maType = (config?.['maType'] as string) || 'sma'
    if (percentage < 0) {
      throw new Error('Percentage must be positive')
    }
    const { upper, middle, lower } = calculateEnvelopes(source, length, percentage, maType as 'sma' | 'ema' | 'wma' | 'hull')
    return {
      values: middle,
      metadata: {
        length,
        percentage,
        maType,
        source: config?.source || 'close',
        upper,
        lower
      }
    }
  }
}

/**
 * Calculate Moving Average Envelopes values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param percentage - Envelope percentage (default: 0.025)
 * @param maType - Moving average type (default: 'sma')
 * @param source - Price source (default: 'close')
 * @returns Object with upper, middle, and lower band arrays
 */
export function movingAverageEnvelopes(
  data: MarketData | number[],
  length?: number,
  percentage?: number,
  maType?: 'sma' | 'ema' | 'wma' | 'hull',
  source?: string
): {
  upper: number[]
  middle: number[]
  lower: number[]
} {
  const indicator = new MovingAverageEnvelopes()
  const config: IndicatorConfig = { ...length && { length }, ...source && { source }, percentage, maType }
  const result = indicator.calculate(data, config)
  return {
    upper: result.metadata['upper'] as number[],
    middle: result.values,
    lower: result.metadata['lower'] as number[]
  }
}
