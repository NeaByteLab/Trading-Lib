import { VolatilityIndicator } from '@core/base/volatility-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { calculateBands } from '@core/utils/calculation-utils'
import { createMultiResultIndicatorWrapper } from '@core/utils/indicator-utils'
import { pineSource } from '@core/utils/pine-script-utils'

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
    const { middle } = calculateBands(data, length, multiplier)
    return middle
  }

  override calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    const result = super.calculate(data, config)
    const source = pineSource(data, config?.source)
    const length = config?.length || 20
    const multiplier = (config?.['multiplier'] as number) || 2.0
    const { upper, lower } = calculateBands(source, length, multiplier)
    return {
      values: result.values,
      metadata: {
        ...result.metadata,
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
 * @param maType - Moving average type ('sma' or 'ema', default: 'sma')
 * @returns Bollinger Bands with upper, middle, and lower bands
 */
export function bollinger(
  data: MarketData | number[],
  length?: number,
  multiplier?: number,
  source?: string,
  maType: 'sma' | 'ema' = 'sma'
): {
  upper: number[]
  middle: number[]
  lower: number[]
} {
  const result = createMultiResultIndicatorWrapper(BollingerBandsIndicator, data, length, source, { multiplier, maType })
  return {
    upper: result.metadata['upper'] as number[],
    middle: result.values,
    lower: result.metadata['lower'] as number[]
  }
}

export const bollingerBands = bollinger
