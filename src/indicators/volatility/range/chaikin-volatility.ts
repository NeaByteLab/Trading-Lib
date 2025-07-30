import { BaseIndicator } from '@core/base/base-indicator'
import { movingAverage } from '@core/calculations/moving-averages'
import { ERROR_MESSAGES } from '@core/constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@core/utils/array-utils'
import { validateIndicatorData } from '@core/utils/validation-utils'

/**
 * Calculate Chaikin Volatility
 *
 * Chaikin Volatility measures the rate of change of the trading range.
 * Formula: Chaikin Volatility = (EMA(High - Low, 10) - EMA(High - Low, 10)[10]) / EMA(High - Low, 10)[10] * 100
 *
 * @param data - Market data with high, low arrays
 * @param length - Calculation period (default: 10)
 * @returns Chaikin Volatility values array
 * @throws {Error} If data is invalid or missing required fields
 */
function calculateChaikinVolatility(data: MarketData, length: number = 10): number[] {
  validateIndicatorData(data)
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  const ranges = ArrayUtils.processArray(data.high, (high, i) => high - data.low[i]!)
  const emaRanges = movingAverage(ranges, length, 'ema')
  return ArrayUtils.processArray(emaRanges, (current, i) => {
    if (i < length) {
      return NaN
    }
    const previous = emaRanges[i - length]
    if (previous === undefined || isNaN(previous) || previous === 0) {
      return NaN
    }
    const result = ((current - previous) / previous) * 100
    return isFinite(result) ? result : NaN
  })
}

/**
 * Chaikin Volatility Indicator Class
 *
 * Measures the rate of change of the trading range using exponential moving averages.
 * Higher values indicate increasing volatility, lower values indicate decreasing volatility.
 *
 * @example
 * ```typescript
 * const chaikin = new ChaikinVolatilityIndicator()
 * const result = chaikin.calculate(marketData, { length: 10 })
 * console.log(result.values) // Chaikin Volatility values
 * ```
 */
export class ChaikinVolatilityIndicator extends BaseIndicator {
  constructor() {
    super('ChaikinVolatility', 'Chaikin Volatility', 'volatility')
  }

  override validateInput(data: MarketData | number[], _config?: IndicatorConfig): void {
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    validateIndicatorData(data)
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const marketData = data as MarketData
    const length = config?.length || 10
    const values = calculateChaikinVolatility(marketData, length)
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
 * Calculate Chaikin Volatility values using wrapper function
 *
 * @param data - Market data
 * @param length - Period length (default: 10)
 * @param source - Price source (default: 'close')
 * @returns Chaikin Volatility values
 * @throws {Error} If data is invalid or missing required fields
 */
export function chaikinVolatility(data: MarketData, length?: number, source?: string): number[] {
  const config: IndicatorConfig = { length: length || 10, source: source || 'close' }
  return new ChaikinVolatilityIndicator().calculate(data, config).values
}
