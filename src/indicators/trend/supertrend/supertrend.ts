import { BaseIndicator } from '@base/base-indicator'
import { DEFAULT_LENGTHS, DEFAULT_MULTIPLIERS, ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { atr } from '@indicators/volatility/range/atr'
import { ArrayUtils } from '@utils/array-utils'
import { PriceCalculations } from '@utils/calculation-utils'
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils'
import { PineCore } from '@utils/pine-core'
import { pineLength } from '@utils/pine-script-utils'


/**
 * Calculate basic upper and lower bands for Super Trend
 *
 * @param high - Current high price
 * @param low - Current low price
 * @param atrValue - ATR value
 * @param multiplier - ATR multiplier
 * @returns Basic upper and lower bands
 */
function calculateBasicBands(high: number, low: number, atrValue: number, multiplier: number): {
  basicUpper: number
  basicLower: number
} {
  const hl2 = PriceCalculations.hl2({ high: [high], low: [low] })[0]!
  const basicUpper = hl2 + (multiplier * atrValue)
  const basicLower = hl2 - (multiplier * atrValue)
  return { basicUpper, basicLower }
}

/**
 * Calculate final upper and lower bands for Super Trend
 *
 * @param basicUpper - Basic upper band
 * @param basicLower - Basic lower band
 * @param prevFinalUpper - Previous final upper band
 * @param prevFinalLower - Previous final lower band
 * @param index - Current index
 * @param period - Calculation period
 * @returns Final upper and lower bands
 */
function calculateFinalBands(
  basicUpper: number,
  basicLower: number,
  prevFinalUpper: number,
  prevFinalLower: number,
  index: number,
  period: number
): {
  finalUpper: number
  finalLower: number
} {
  if (index === period) {
    return { finalUpper: basicUpper, finalLower: basicLower }
  }
  const finalLower = PineCore.max([basicLower, prevFinalLower])
  const finalUpper = PineCore.min([basicUpper, prevFinalUpper])
  return { finalUpper, finalLower }
}

/**
 * Calculate Super Trend value based on current conditions
 *
 * @param prevSuperTrend - Previous Super Trend value
 * @param finalUpper - Final upper band
 * @param finalLower - Final lower band
 * @param currentClose - Current close price
 * @param prevDirection - Previous direction
 * @returns Super Trend value and current direction
 */
function calculateSuperTrendValue(
  prevSuperTrend: number,
  finalUpper: number,
  finalLower: number,
  currentClose: number,
  prevDirection: number
): { superTrendValue: number; currentDirection: number } {
  if (prevSuperTrend <= finalUpper && currentClose <= finalUpper) {
    return { superTrendValue: finalUpper, currentDirection: 1 }
  }
  if (prevSuperTrend >= finalLower && currentClose >= finalLower) {
    return { superTrendValue: finalLower, currentDirection: -1 }
  }
  if (currentClose > finalUpper) {
    return { superTrendValue: finalLower, currentDirection: -1 }
  }
  if (currentClose < finalLower) {
    return { superTrendValue: finalUpper, currentDirection: 1 }
  }
  return { superTrendValue: prevSuperTrend, currentDirection: prevDirection }
}

/**
 * Calculate Super Trend values using centralized utilities
 *
 * @param data - Market data
 * @param period - ATR period
 * @param multiplier - ATR multiplier
 * @returns Super Trend values and direction
 */
function calculateSuperTrend(data: MarketData, period: number, multiplier: number): { superTrend: number[], direction: number[] } {
  const atrValues = atr(data, period)
  const superTrend: number[] = []
  const direction: number[] = []
  let prevSuperTrend = 0
  let prevDirection = 0
  const results = ArrayUtils.processArray(data.close, (_, i) => {
    if (i < period) {
      superTrend.push(NaN)
      direction.push(NaN)
      return { superTrend: NaN, direction: NaN }
    }
    const high = data.high[i]!
    const low = data.low[i]!
    const close = data.close[i]!
    const atrValue = atrValues[i]!
    const { basicUpper, basicLower } = calculateBasicBands(high, low, atrValue, multiplier)
    const { finalUpper, finalLower } = calculateFinalBands(
      basicUpper, basicLower, prevSuperTrend, prevSuperTrend, i, period
    )
    const { superTrendValue, currentDirection } = calculateSuperTrendValue(
      prevSuperTrend, finalUpper, finalLower, close, prevDirection
    )
    prevSuperTrend = superTrendValue
    prevDirection = currentDirection
    superTrend.push(superTrendValue)
    direction.push(currentDirection)
    return { superTrend: superTrendValue, direction: currentDirection }
  })
  return {
    superTrend: ArrayUtils.processArray(results, r => r.superTrend),
    direction: ArrayUtils.processArray(results, r => r.direction)
  }
}

/**
 * Super Trend Indicator
 *
 * A trend-following indicator that combines ATR with price action.
 * Formula: Super Trend = ATR-based dynamic support/resistance levels
 *
 * @example
 * ```typescript
 * const superTrend = new SuperTrend()
 * const result = superTrend.calculate(marketData, { length: 10, multiplier: 3 })
 * console.log(result.values) // Super Trend values
 * console.log(result.metadata.direction) // Trend direction
 * ```
 */
export class SuperTrend extends BaseIndicator {
  constructor() {
    super('SuperTrend', 'Super Trend', 'trend')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const period = pineLength(config?.length || DEFAULT_LENGTHS.SUPER_TREND, DEFAULT_LENGTHS.SUPER_TREND)
    const multiplier = (config?.['multiplier'] as number) || DEFAULT_MULTIPLIERS.SUPER_TREND
    const { superTrend, direction } = calculateSuperTrend(data, period, multiplier)
    return {
      values: superTrend,
      metadata: {
        length: period,
        multiplier,
        source: 'hlc3',
        direction
      }
    }
  }
}

/**
 * Calculate Super Trend values using wrapper function
 *
 * @param data - Market data
 * @param length - ATR period (default: 10)
 * @param multiplier - ATR multiplier (default: 3)
 * @returns Super Trend values and direction
 */
export function superTrend(
  data: MarketData | number[],
  length?: number,
  multiplier?: number
): {
  superTrend: number[]
  direction: number[]
} {
  const result = createMultiResultIndicatorWrapper(
    SuperTrend,
    data,
    length,
    undefined,
    { multiplier }
  )
  return {
    superTrend: result.values,
    direction: result.metadata['direction'] as number[]
  }
}
