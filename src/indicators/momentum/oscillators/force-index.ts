import { BaseIndicator } from '@base/base-indicator'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'


/**
 * Calculate Force Index
 * Measures the power behind price movements using volume
 *
 * @param data - Market data with close and volume arrays
 * @param length - Calculation period (default: 13)
 * @returns Array of Force Index values
 */
function calculateForceIndex(data: MarketData, length: number = 13): number[] {
  const { close, volume } = data

  if (close.length === 0 || !volume || volume.length === 0) {
    return []
  }

  // Calculate raw Force Index
  const rawForceIndex = ArrayUtils.processArray(close, (_, i) => {
    if (i === 0) {return NaN}

    const currentClose = close[i]!
    const previousClose = close[i - 1]!
    const currentVolume = volume[i] || 0

    // Force Index = Volume × (Current Close - Previous Close)
    return currentVolume * (currentClose - previousClose)
  })

  // Calculate EMA of Force Index
  const forceIndex: number[] = []
  let ema = 0
  const multiplier = 2 / (length + 1)

  for (let i = 0; i < rawForceIndex.length; i++) {
    if (isNaN(rawForceIndex[i]!)) {
      forceIndex.push(NaN)
      continue
    }

    if (i === 0 || isNaN(forceIndex[i - 1]!)) {
      ema = rawForceIndex[i]!
    } else {
      ema = (rawForceIndex[i]! * multiplier) + (ema * (1 - multiplier))
    }

    forceIndex.push(ema)
  }

  return forceIndex
}

/**
 * Force Index Indicator
 *
 * Measures the power behind price movements using volume.
 * Combines price change and volume to identify strong moves.
 * Positive values indicate buying pressure, negative values indicate selling pressure.
 *
 * @example
 * ```typescript
 * const force = new ForceIndex()
 * const result = force.calculate(marketData, { length: 13 })
 * console.log(result.values) // Force Index values
 * ```
 */
export class ForceIndex extends BaseIndicator {
  constructor() {
    super('ForceIndex', 'Force Index', 'momentum')
  }

  override validateInput(data: MarketData | number[], config?: IndicatorConfig): void {
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const length = (config?.['length'] as number) || 13
    if (length <= 0) {
      throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const length = (config?.['length'] as number) || 13

    const values = calculateForceIndex(data as MarketData, length)
    return {
      values,
      metadata: {
        length: values.length,
        period: length,
        source: config?.source || 'close'
      }
    }
  }
}

/**
 * Calculate Force Index using wrapper function
 *
 * @param data - Market data with close and volume arrays
 * @param length - Calculation period (default: 13)
 * @returns Array of Force Index values
 */
export function forceIndex(data: MarketData, length: number = 13): number[] {
  return createIndicatorWrapper(ForceIndex, data, length)
}
