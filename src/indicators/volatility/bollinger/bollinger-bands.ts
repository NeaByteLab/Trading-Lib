import { BaseIndicator } from '@base/base-indicator'
import { movingAverage } from '@calculations/moving-averages'
import { DEFAULT_LENGTHS } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { calculateStandardDeviation } from '@utils/calculation-utils'
import { pineLength, pineSource } from '@utils/pine-script-utils'

/**
 * Bollinger Bands indicator
 *
 * Calculates upper, middle, and lower bands based on moving average and standard deviation.
 * Formula: Upper = SMA + (multiplier × standard deviation), Lower = SMA - (multiplier × standard deviation)
 *
 * @example
 * ```typescript
 * const bb = new BollingerBands()
 * const result = bb.calculate(marketData, { length: 20, multiplier: 2 })
 * console.log(result.values) // Middle band (SMA)
 * console.log(result.metadata.upper) // Upper band
 * console.log(result.metadata.lower) // Lower band
 * ```
 */
export class BollingerBands extends BaseIndicator {
  constructor() {
    super('BollingerBands', 'Bollinger Bands', 'volatility')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const source = pineSource(data, config?.source)
    const length = pineLength(config?.length || DEFAULT_LENGTHS.BOLLINGER, DEFAULT_LENGTHS.BOLLINGER)
    const multiplier = (config?.['multiplier'] as number) || 2
    const { upper, middle, lower } = this.calculateBollingerBands(source, length, multiplier)
    return {
      values: middle,
      metadata: {
        length,
        source: config?.source || 'close',
        multiplier,
        upper,
        lower
      }
    }
  }

  private calculateBollingerBands(data: number[], length: number, multiplier: number): {
    upper: number[]
    middle: number[]
    lower: number[]
  } {
    const middle = movingAverage(data, length, 'sma')
    const stdDev = ArrayUtils.processWindow(data, length, (window) => {
      return calculateStandardDeviation(window)
    })
    const upper = ArrayUtils.processArray(middle, (middleVal, i) => {
      const stdDevVal = stdDev[i]
      if (isNaN(middleVal) || stdDevVal === undefined || isNaN(stdDevVal)) {
        return NaN
      }
      return middleVal + (multiplier * stdDevVal)
    })
    const lower = ArrayUtils.processArray(middle, (middleVal, i) => {
      const stdDevVal = stdDev[i]
      if (isNaN(middleVal) || stdDevVal === undefined || isNaN(stdDevVal)) {
        return NaN
      }
      return middleVal - (multiplier * stdDevVal)
    })
    return { upper, middle, lower }
  }
}

/**
 * Calculate Bollinger Bands using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param multiplier - Standard deviation multiplier (default: 2)
 * @param source - Price source (default: 'close')
 * @returns Bollinger Bands result with upper, middle, and lower bands
 */
export function bollingerBands(
  data: MarketData | number[],
  length?: number,
  multiplier?: number,
  source?: string
): {
  upper: number[]
  middle: number[]
  lower: number[]
} {
  const bb = new BollingerBands()
  const config: IndicatorConfig = {}
  if (length !== undefined) {config.length = length}
  if (source !== undefined) {config.source = source}
  if (multiplier !== undefined) {config['multiplier'] = multiplier}
  const result = bb.calculate(data, config)
  return {
    upper: result.metadata['upper'] as number[],
    middle: result.values,
    lower: result.metadata['lower'] as number[]
  }
}
