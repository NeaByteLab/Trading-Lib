import { BaseIndicator } from '@base/base-indicator'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils'
import { MathUtils } from '@utils/math-utils'

/**
 * Calculate True Range for Chandelier Exits
 * True Range = max(high - low, |high - prevClose|, |low - prevClose|)
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @returns True Range values array
 */
function calculateTrueRange(high: number[], low: number[], close: number[]): number[] {
  return ArrayUtils.processArray(close, (_, i) => {
    if (i === 0) {
      return high[i]! - low[i]!
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
 * Update trailing stops based on current levels and previous values
 */
function updateTrailingStops(
  longExitLevel: number,
  shortExitLevel: number,
  prevLongExit: number | undefined,
  prevShortExit: number | undefined
): { longExit: number; shortExit: number } {
  let finalLongExit = longExitLevel
  let finalShortExit = shortExitLevel

  if (prevLongExit !== undefined && !isNaN(prevLongExit)) {
    finalLongExit = MathUtils.max([longExitLevel, prevLongExit])
  }

  if (prevShortExit !== undefined && !isNaN(prevShortExit)) {
    finalShortExit = MathUtils.min([shortExitLevel, prevShortExit])
  }

  return { longExit: finalLongExit, shortExit: finalShortExit }
}

/**
 * Calculate Chandelier Exits using ATR-based trailing stops
 * Provides long and short exit levels based on price action and volatility
 *
 * @param data - Market data with OHLC arrays
 * @param atrPeriod - ATR calculation period (default: 14)
 * @param multiplier - ATR multiplier for stop distance (default: 3)
 * @returns Object with long and short exit levels
 */
function calculateChandelierExits(data: MarketData, atrPeriod: number = 14, multiplier: number = 3): {
  longExit: number[]
  shortExit: number[]
} {
  const atrValues = calculateTrueRange(data.high, data.low, data.close)
  const longExit: number[] = []
  const shortExit: number[] = []

  let highestHigh = 0
  let lowestLow = Infinity

  for (let i = 0; i < data.close.length; i++) {
    if (i < atrPeriod - 1) {
      longExit.push(NaN)
      shortExit.push(NaN)
      continue
    }

    const currentHigh = data.high[i]!
    const currentLow = data.low[i]!

    // Update highest high and lowest low
    highestHigh = MathUtils.max([highestHigh, currentHigh])
    lowestLow = MathUtils.min([lowestLow, currentLow])

    // Calculate ATR for the period
    const atrWindow = atrValues.slice(Math.max(0, i - atrPeriod + 1), i + 1)
    const atr = MathUtils.average(atrWindow)

    // Calculate exit levels
    const longExitLevel = highestHigh - (atr * multiplier)
    const shortExitLevel = lowestLow + (atr * multiplier)

    // Update trailing stops
    const prevLongExit = i > 0 ? longExit[i - 1] : undefined
    const prevShortExit = i > 0 ? shortExit[i - 1] : undefined

    const { longExit: finalLongExit, shortExit: finalShortExit } = updateTrailingStops(
      longExitLevel, shortExitLevel, prevLongExit, prevShortExit
    )

    longExit.push(finalLongExit)
    shortExit.push(finalShortExit)
  }

  return { longExit, shortExit }
}

/**
 * Chandelier Exits Indicator
 *
 * Calculates trailing stop levels based on ATR and price action.
 * Provides long and short exit levels for position management.
 * Uses highest high/lowest low with ATR-based distance.
 *
 * @example
 * ```typescript
 * const chandelier = new ChandelierExits()
 * const result = chandelier.calculate(marketData, { atrPeriod: 14, multiplier: 3 })
 * console.log(result.values) // Long exit levels
 * console.log(result.metadata.shortExit) // Short exit levels
 * ```
 */
export class ChandelierExits extends BaseIndicator {
  constructor() {
    super('ChandelierExits', 'Chandelier Exit Levels', 'trend')
  }

  override validateInput(data: MarketData | number[], config?: IndicatorConfig): void {
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const atrPeriod = (config?.['atrPeriod'] as number) || 14
    const multiplier = (config?.['multiplier'] as number) || 3
    if (atrPeriod <= 0) {
      throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
    }
    if (multiplier <= 0) {
      throw new Error(ERROR_MESSAGES.INVALID_MULTIPLIER)
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const atrPeriod = (config?.['atrPeriod'] as number) || 14
    const multiplier = (config?.['multiplier'] as number) || 3
    const { longExit, shortExit } = calculateChandelierExits(data as MarketData, atrPeriod, multiplier)
    return {
      values: longExit,
      metadata: {
        length: longExit.length,
        atrPeriod,
        multiplier,
        shortExit,
        source: config?.source || 'close'
      }
    }
  }
}

/**
 * Calculate Chandelier Exits using wrapper function
 *
 * @param data - Market data with OHLC arrays
 * @param atrPeriod - ATR calculation period (default: 14)
 * @param multiplier - ATR multiplier for stop distance (default: 3)
 * @returns Object with long and short exit levels
 */
export function chandelierExits(data: MarketData, atrPeriod: number = 14, multiplier: number = 3): {
  longExit: number[]
  shortExit: number[]
} {
  const result = createMultiResultIndicatorWrapper(ChandelierExits, data, undefined, undefined, { atrPeriod, multiplier })
  return {
    longExit: result.values,
    shortExit: result.metadata['shortExit'] as number[]
  }
}
