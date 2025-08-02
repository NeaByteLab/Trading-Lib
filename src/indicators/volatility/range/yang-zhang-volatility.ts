import { BaseIndicator } from '@base/base-indicator'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { MathUtils } from '@utils/math-utils'

/**
 * Calculate Rogers-Satchell volatility estimator
 * Accounts for high-low-open-close relationships
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param open - Open prices array
 * @param close - Close prices array
 * @returns Rogers-Satchell volatility values
 */
function calculateRogersSatchell(high: number[], low: number[], open: number[], close: number[]): number[] {
  return ArrayUtils.processArray(close, (_, i) => {
    const h = high[i]!
    const l = low[i]!
    const o = open[i]!
    const c = close[i]!

    // Rogers-Satchell formula
    return MathUtils.sqrt(
      (h - c) * (h - o) + (l - c) * (l - o)
    )
  })
}

/**
 * Calculate Garman-Klass volatility estimator
 * Uses high-low-open-close data for improved accuracy
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param open - Open prices array
 * @param close - Close prices array
 * @returns Garman-Klass volatility values
 */
function calculateGarmanKlass(high: number[], low: number[], open: number[], close: number[]): number[] {
  return ArrayUtils.processArray(close, (_, i) => {
    const h = high[i]!
    const l = low[i]!
    const o = open[i]!
    const c = close[i]!

    // Garman-Klass formula
    const logH = MathUtils.log(h / o)
    const logL = MathUtils.log(l / o)
    const logC = MathUtils.log(c / o)

    const gk = 0.5 * MathUtils.pow(logH - logL, 2) - (2 * MathUtils.log(2) - 1) * MathUtils.pow(logC, 2)

    return MathUtils.sqrt(gk)
  })
}

/**
 * Calculate Parkinson volatility estimator
 * Uses high-low range for volatility estimation
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @returns Parkinson volatility values
 */
function calculateParkinson(high: number[], low: number[]): number[] {
  return ArrayUtils.processArray(high, (_, i) => {
    const h = high[i]!
    const l = low[i]!

    // Parkinson formula
    const logHL = MathUtils.log(h / l)
    return MathUtils.sqrt(0.5 * MathUtils.pow(logHL, 2))
  })
}

/**
 * Calculate variance of an array
 *
 * @param values - Array of values
 * @returns Variance
 */
function calculateVariance(values: number[]): number {
  if (values.length === 0) {return 0}
  const mean = MathUtils.average(values)
  const squaredDiffs = values.map(val => MathUtils.pow(val - mean, 2))
  return MathUtils.average(squaredDiffs)
}

/**
 * Calculate Yang-Zhang volatility estimator
 * Combines multiple volatility estimators for improved accuracy
 *
 * @param data - Market data with OHLC arrays
 * @param length - Calculation period (default: 20)
 * @returns Array of Yang-Zhang volatility values
 */
function calculateYangZhangVolatility(data: MarketData, length: number = 20): number[] {
  const rs = calculateRogersSatchell(data.high, data.low, data.open, data.close)
  const gk = calculateGarmanKlass(data.high, data.low, data.open, data.close)
  const parkinson = calculateParkinson(data.high, data.low)

  // Calculate overnight volatility (close to open)
  const overnight = ArrayUtils.processArray(data.close, (_, i) => {
    if (i === 0) {return NaN}
    const currentOpen = data.open[i]!
    const prevClose = data.close[i - 1]!
    return MathUtils.log(currentOpen / prevClose)
  })

  return ArrayUtils.processArray(data.close, (_, i) => {
    if (i < length - 1) {return NaN}

    // Calculate rolling averages
    const rsWindow = rs.slice(Math.max(0, i - length + 1), i + 1)
    const gkWindow = gk.slice(Math.max(0, i - length + 1), i + 1)
    const parkinsonWindow = parkinson.slice(Math.max(0, i - length + 1), i + 1)
    const overnightWindow = overnight.slice(Math.max(0, i - length + 1), i + 1)

    // Filter out NaN values
    const validRS = rsWindow.filter(val => !isNaN(val))
    const validGK = gkWindow.filter(val => !isNaN(val))
    const validParkinson = parkinsonWindow.filter(val => !isNaN(val))
    const validOvernight = overnightWindow.filter(val => !isNaN(val))

    if (validRS.length === 0 || validGK.length === 0 || validParkinson.length === 0 || validOvernight.length === 0) {
      return NaN
    }

    // Calculate variances
    const rsVar = calculateVariance(validRS)
    const gkVar = calculateVariance(validGK)
    const parkinsonVar = calculateVariance(validParkinson)
    const overnightVar = calculateVariance(validOvernight)

    // Yang-Zhang formula
    const k = 0.34 / (1.34 + (length + 1) / (length - 1))
    return MathUtils.sqrt(
      overnightVar + k * parkinsonVar + (1 - k) * (rsVar + gkVar) / 2
    )
  })
}

/**
 * Yang-Zhang Volatility Indicator
 *
 * Combines multiple volatility estimators for improved accuracy.
 * Uses high-low-open-close data to account for overnight gaps.
 * Provides more accurate volatility measurement than traditional methods.
 *
 * @example
 * ```typescript
 * const yzVol = new YangZhangVolatility()
 * const result = yzVol.calculate(marketData, { length: 20 })
 * console.log(result.values) // Yang-Zhang volatility values
 * ```
 */
export class YangZhangVolatility extends BaseIndicator {
  constructor() {
    super('YangZhangVolatility', 'Yang-Zhang Volatility', 'volatility')
  }

  override validateInput(data: MarketData | number[], config?: IndicatorConfig): void {
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const length = (config?.['length'] as number) || 20
    if (length <= 0) {
      throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const length = (config?.['length'] as number) || 20
    const values = calculateYangZhangVolatility(data as MarketData, length)
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
 * Calculate Yang-Zhang Volatility using wrapper function
 *
 * @param data - Market data with OHLC arrays
 * @param length - Calculation period (default: 20)
 * @returns Array of Yang-Zhang volatility values
 */
export function yangZhangVolatility(data: MarketData, length: number = 20): number[] {
  return createIndicatorWrapper(YangZhangVolatility, data, length)
}
