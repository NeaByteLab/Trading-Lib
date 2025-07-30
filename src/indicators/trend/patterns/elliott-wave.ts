import { BaseIndicator } from '@base/base-indicator'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { MathUtils } from '@utils/math-utils'

/**
 * Calculate Elliott Wave Pattern
 *
 * Elliott Wave Theory identifies recurring wave patterns in price movements.
 * This implementation provides basic wave identification based on swing highs and lows.
 * Wave 1: Initial impulse move
 * Wave 2: Retracement (typically 50-78.6% of Wave 1)
 * Wave 3: Strongest impulse move (typically 1.618x Wave 1)
 * Wave 4: Retracement (typically 23.6-38.2% of Wave 3)
 * Wave 5: Final impulse move
 *
 * @param data - Market data with high, low, close arrays
 * @param sensitivity - Wave detection sensitivity (default: 0.02)
 * @returns Elliott Wave pattern values
 */
function calculateElliottWave(data: MarketData, sensitivity: number = 0.02): number[] {
  return ArrayUtils.processArray(data.close, (_, i) => {
    if (i < 10) {return NaN}
    const window = data.close.slice(Math.max(0, i - 10), i + 1)
    const high = MathUtils.max(window)
    const low = MathUtils.min(window)
    const range = high - low
    const threshold = range * sensitivity
    let waveCount = 0
    let direction = 0
    for (let j = 1; j < window.length; j++) {
      const change = window[j]! - window[j - 1]!
      if (MathUtils.abs(change) > threshold) {
        if (change > 0 && direction <= 0) {
          waveCount++
          direction = 1
        } else if (change < 0 && direction >= 0) {
          waveCount++
          direction = -1
        }
      }
    }
    return waveCount > 0 ? waveCount : NaN
  })
}

/**
 * Elliott Wave Pattern Indicator
 *
 * Identifies Elliott Wave patterns in price movements.
 * Returns wave count based on swing high/low detection.
 * Higher values indicate more complex wave patterns.
 *
 * @example
 * ```typescript
 * const elliott = new ElliottWave()
 * const result = elliott.calculate(marketData, { sensitivity: 0.02 })
 * console.log(result.values) // Wave pattern values
 * ```
 */
export class ElliottWave extends BaseIndicator {
  constructor() {
    super('ElliottWave', 'Elliott Wave Pattern', 'trend')
  }

  override validateInput(data: MarketData | number[], config?: IndicatorConfig): void {
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const sensitivity = (config?.['sensitivity'] as number) || 0.02
    if (sensitivity <= 0 || sensitivity > 1) {
      throw new Error('Sensitivity must be between 0 and 1')
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const sensitivity = (config?.['sensitivity'] as number) || 0.02
    const values = calculateElliottWave(data as MarketData, sensitivity)
    return {
      values,
      metadata: {
        length: values.length,
        sensitivity,
        source: config?.source || 'close'
      }
    }
  }
}

/**
 * Calculate Elliott Wave Pattern using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @param sensitivity - Wave detection sensitivity (default: 0.02)
 * @returns Elliott Wave pattern values
 */
export function elliottWave(data: MarketData, sensitivity: number = 0.02): number[] {
  return createIndicatorWrapper(ElliottWave, data, undefined, undefined, { sensitivity })
}
