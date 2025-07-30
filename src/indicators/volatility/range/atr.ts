import { VolatilityIndicator } from '@base/volatility-indicator'
import { movingAverage } from '@calculations/moving-averages'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { MathUtils } from '@utils/math-utils'
import { pineLength } from '@utils/pine-script-utils'

/**
 * Calculate Average True Range (ATR)
 *
 * ATR = Average of True Range over n periods
 * True Range = max(High - Low, |High - Previous Close|, |Low - Previous Close|)
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @param length - Calculation period
 * @returns ATR values array
 */
function calculateATR(high: number[], low: number[], close: number[], _length: number): number[] {
  return ArrayUtils.processArray(close, (_currentClose, i) => {
    if (i === 0) {
      return NaN
    }
    const currentHigh = high[i]!
    const currentLow = low[i]!
    const previousClose = close[i - 1]!
    return MathUtils.max([
      currentHigh - currentLow,
      MathUtils.abs(currentHigh - previousClose),
      MathUtils.abs(currentLow - previousClose)
    ])
  })
}

/**
 * Average True Range (ATR) Indicator
 *
 * Measures market volatility by calculating the average of true range values.
 * True range is the greatest of: current high-low, |current high - previous close|, |current low - previous close|.
 * Higher ATR values indicate higher volatility.
 *
 * @example
 * ```typescript
 * const atr = new ATRIndicator()
 * const result = atr.calculate(marketData, { length: 14 })
 * console.log(result.values) // ATR values
 * ```
 */
export class ATRIndicator extends VolatilityIndicator {
  constructor() {
    super('ATRIndicator', 'Average True Range', 14, 1.0, 1)
  }

  protected calculateVolatility(_data: number[], _length: number, _multiplier: number): number[] {
    return []
  }

  override calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const length = pineLength(config?.length || 14, 14)
    const trueRanges = calculateATR(data.high, data.low, data.close, length)
    const atrValues = movingAverage(trueRanges, length, 'ema')
    return {
      values: atrValues,
      metadata: {
        length,
        source: config?.source || 'close'
      }
    }
  }
}

/**
 * Calculate Average True Range (ATR) using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @param length - Calculation period (default: 14)
 * @returns ATR values array
 */
export function atr(data: MarketData, length: number = 14): number[] {
  const indicator = new ATRIndicator()
  const result = indicator.calculate(data, { length })
  return result.values
}
