import { BaseIndicator } from '@base/base-indicator'
import { movingAverage } from '@calculations/moving-averages'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { pineLength } from '@utils/pine-script-utils'

/**
 * Calculate Ease of Movement
 *
 * Ease of Movement measures the relationship between price and volume.
 * Formula: EOM = (High + Low) / 2 - (Prior High + Prior Low) / 2
 * Box Ratio = Volume / (High - Low)
 * EOM = Distance Moved / Box Ratio
 *
 * @param data - Market data with OHLCV
 * @param length - Smoothing period (default: 14)
 * @returns Ease of Movement values array
 */
function calculateEaseOfMovement(data: MarketData, length: number = 14): number[] {
  const eom = ArrayUtils.processArray(data.close, (_, i) => {
    if (i === 0) {return NaN}
    const high = data.high[i]!
    const low = data.low[i]!
    const volume = data.volume?.[i] || 1
    const prevHigh = data.high[i - 1]!
    const prevLow = data.low[i - 1]!
    const midPoint = (high + low) / 2
    const prevMidPoint = (prevHigh + prevLow) / 2
    const distanceMoved = midPoint - prevMidPoint
    const boxRatio = volume / (high - low)
    if (boxRatio === 0) {return 0}
    const result = distanceMoved / boxRatio
    return isFinite(result) ? result : 0
  })
  return movingAverage(eom, length, 'sma')
}

/**
 * Ease of Movement Indicator
 *
 * Measures the relationship between price and volume to identify buying/selling pressure.
 * Positive values indicate buying pressure, negative values indicate selling pressure.
 * The indicator is smoothed using a simple moving average.
 *
 * @example
 * ```typescript
 * const eom = new EaseOfMovement()
 * const result = eom.calculate(marketData, { length: 14 })
 * console.log(result.values) // Ease of Movement values
 * ```
 */
export class EaseOfMovement extends BaseIndicator {
  constructor() {
    super('EaseOfMovement', 'Ease of Movement', 'momentum')
  }

  override validateInput(data: MarketData | number[], _config?: IndicatorConfig): void {
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    if (!data.volume) {
      throw new Error(ERROR_MESSAGES.VOLUME_REQUIRED)
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const length = pineLength(config?.length || 14, 14)
    const values = calculateEaseOfMovement(data as MarketData, length)
    return {
      values,
      metadata: {
        length,
        source: config?.source || 'close'
      }
    }
  }
}

/**
 * Calculate Ease of Movement using wrapper function
 *
 * @param data - Market data with OHLCV
 * @param length - Smoothing period (default: 14)
 * @returns Ease of Movement values array
 */
export function easeOfMovement(data: MarketData, length: number = 14): number[] {
  return createIndicatorWrapper(EaseOfMovement, data, length)
}
