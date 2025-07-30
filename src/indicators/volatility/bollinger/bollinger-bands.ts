import { VolatilityIndicator } from '@base/volatility-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { calculateMean, calculateStandardDeviation } from '@utils/calculation-utils'
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils'
import { pineLength, pineSource } from '@utils/pine-script-utils'

/**
 * Calculate Bollinger Bands using centralized utilities
 *
 * @param data - Source data array
 * @param length - Calculation period
 * @param multiplier - Standard deviation multiplier
 * @returns Bollinger Bands values object
 */
function calculateBollingerBands(data: number[], length: number, multiplier: number): {
  upper: number[]
  middle: number[]
  lower: number[]
} {
  const result = {
    upper: [] as number[],
    middle: [] as number[],
    lower: [] as number[]
  }
  return ArrayUtils.processValidWindow(data, length, (window) => {
    const validValues = window.filter(val => !isNaN(val))
    if (validValues.length === 0) {
      return {
        upper: NaN,
        middle: NaN,
        lower: NaN
      }
    }
    const ma = calculateMean(validValues)
    const stdDev = calculateStandardDeviation(validValues)
    const bandDistance = stdDev * multiplier
    return {
      upper: ma + bandDistance,
      middle: ma,
      lower: ma - bandDistance
    }
  }).reduce((acc, curr) => {
    if (typeof curr === 'object' && curr !== null) {
      acc.upper.push(curr.upper)
      acc.middle.push(curr.middle)
      acc.lower.push(curr.lower)
    }
    return acc
  }, result)
}

/**
 * Bollinger Bands Indicator
 *
 * Creates volatility bands around a moving average using standard deviation.
 * Upper band = MA + (StdDev × Multiplier), Lower band = MA - (StdDev × Multiplier)
 * Helps identify overbought/oversold conditions and volatility expansion/contraction.
 *
 * @example
 * ```typescript
 * const bollinger = new BollingerBandsIndicator()
 * const result = bollinger.calculate(marketData, { length: 20, multiplier: 2 })
 * console.log(result.values) // Middle band (SMA)
 * console.log(result.metadata.upper) // Upper band
 * console.log(result.metadata.lower) // Lower band
 * ```
 */
export class BollingerBandsIndicator extends VolatilityIndicator {
  constructor() {
    super('BollingerBandsIndicator', 'Bollinger Bands', 20, 2.0, 1)
  }

  protected calculateVolatility(data: number[], length: number, multiplier: number): number[] {
    const { middle } = calculateBollingerBands(data, length, multiplier)
    return middle
  }

  override calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const source = pineSource(data, config?.source)
    const length = pineLength(config?.length || 20, 20)
    const multiplier = (config?.['multiplier'] as number) || 2.0
    const { upper, middle, lower } = calculateBollingerBands(source, length, multiplier)
    return {
      values: middle,
      metadata: {
        length,
        multiplier,
        source: config?.source || 'close',
        upper,
        lower
      }
    }
  }
}

/**
 * Calculate Bollinger Bands using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param multiplier - Standard deviation multiplier (default: 2.0)
 * @param source - Price source (default: 'close')
 * @returns Bollinger Bands with upper, middle, and lower bands
 */
export function bollinger(
  data: MarketData | number[],
  length?: number,
  multiplier?: number,
  source?: string
): {
  upper: number[]
  middle: number[]
  lower: number[]
} {
  const result = createMultiResultIndicatorWrapper(BollingerBandsIndicator, data, length, source, { multiplier })
  return {
    upper: result.metadata['upper'] as number[],
    middle: result.values,
    lower: result.metadata['lower'] as number[]
  }
}

// Export alias for backward compatibility
export const bollingerBands = bollinger
