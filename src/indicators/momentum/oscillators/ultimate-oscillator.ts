import { BaseIndicator } from '@base/base-indicator'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { MathUtils } from '@utils/math-utils'

/**
 * Calculate True Range for Ultimate Oscillator
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
 * Calculate buying and selling pressure for Ultimate Oscillator
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @returns Object with buying and selling pressure arrays
 */
function calculatePressure(high: number[], low: number[], close: number[]): {
  buyingPressure: number[]
  sellingPressure: number[]
} {
  const buyingPressure: number[] = []
  const sellingPressure: number[] = []

  for (let i = 0; i < close.length; i++) {
    const currentClose = close[i]!
    const currentLow = low[i]!
    const currentHigh = high[i]!

    // Buying pressure = close - low
    const bp = currentClose - currentLow

    // Selling pressure = high - close
    const sp = currentHigh - currentClose

    buyingPressure.push(bp)
    sellingPressure.push(sp)
  }

  return { buyingPressure, sellingPressure }
}

/**
 * Calculate smoothed averages using Wilder's smoothing
 *
 * @param data - Input data array
 * @param period - Smoothing period
 * @returns Smoothed data array
 */
function wildersSmoothing(data: number[], period: number): number[] {
  const smoothed: number[] = []
  let sum = 0

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      sum += data[i]!
      smoothed.push(NaN)
    } else if (i === period - 1) {
      sum += data[i]!
      smoothed.push(sum / period)
    } else {
      sum = smoothed[i - 1]! * (period - 1) + data[i]!
      smoothed.push(sum / period)
    }
  }

  return smoothed
}

/**
 * Calculate Ultimate Oscillator using multiple timeframe analysis
 * Combines buying and selling pressure across three timeframes
 *
 * @param data - Market data with OHLC arrays
 * @param period1 - First timeframe period (default: 7)
 * @param period2 - Second timeframe period (default: 14)
 * @param period3 - Third timeframe period (default: 28)
 * @param weight1 - Weight for first timeframe (default: 4)
 * @param weight2 - Weight for second timeframe (default: 2)
 * @param weight3 - Weight for third timeframe (default: 1)
 * @returns Array of Ultimate Oscillator values
 */
function calculateUltimateOscillator(
  data: MarketData,
  period1: number = 7,
  period2: number = 14,
  period3: number = 28,
  weight1: number = 4,
  weight2: number = 2,
  weight3: number = 1
): number[] {
  const { buyingPressure } = calculatePressure(data.high, data.low, data.close)
  const trueRange = calculateTrueRange(data.high, data.low, data.close)

  // Calculate smoothed buying and selling pressure for each timeframe
  const bp1 = wildersSmoothing(buyingPressure, period1)
  const tr1 = wildersSmoothing(trueRange, period1)

  const bp2 = wildersSmoothing(buyingPressure, period2)
  const tr2 = wildersSmoothing(trueRange, period2)

  const bp3 = wildersSmoothing(buyingPressure, period3)
  const tr3 = wildersSmoothing(trueRange, period3)

  return ArrayUtils.processArray(data.close, (_, i) => {
    if (i < MathUtils.max([period1, period2, period3]) - 1) {
      return NaN
    }

    // Calculate weighted averages
    const avg7 = tr1[i]! > 0 ? (bp1[i]! / tr1[i]!) * 100 : 0
    const avg14 = tr2[i]! > 0 ? (bp2[i]! / tr2[i]!) * 100 : 0
    const avg28 = tr3[i]! > 0 ? (bp3[i]! / tr3[i]!) * 100 : 0

    // Calculate weighted sum
    const weightedSum = (avg7 * weight1) + (avg14 * weight2) + (avg28 * weight3)
    const totalWeight = weight1 + weight2 + weight3

    return weightedSum / totalWeight
  })
}

/**
 * Ultimate Oscillator Indicator
 *
 * Combines buying and selling pressure across multiple timeframes.
 * Uses weighted averages to identify overbought/oversold conditions.
 * Higher values indicate stronger buying pressure.
 *
 * @example
 * ```typescript
 * const ultimate = new UltimateOscillator()
 * const result = ultimate.calculate(marketData, { period1: 7, period2: 14, period3: 28 })
 * console.log(result.values) // Ultimate Oscillator values
 * ```
 */
export class UltimateOscillator extends BaseIndicator {
  constructor() {
    super('UltimateOscillator', 'Ultimate Oscillator', 'momentum')
  }

  override validateInput(data: MarketData | number[], config?: IndicatorConfig): void {
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const period1 = (config?.['period1'] as number) || 7
    const period2 = (config?.['period2'] as number) || 14
    const period3 = (config?.['period3'] as number) || 28
    const weight1 = (config?.['weight1'] as number) || 4
    const weight2 = (config?.['weight2'] as number) || 2
    const weight3 = (config?.['weight3'] as number) || 1

    if (period1 <= 0 || period2 <= 0 || period3 <= 0) {
      throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
    }
    if (weight1 <= 0 || weight2 <= 0 || weight3 <= 0) {
      throw new Error('Weights must be positive')
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const period1 = (config?.['period1'] as number) || 7
    const period2 = (config?.['period2'] as number) || 14
    const period3 = (config?.['period3'] as number) || 28
    const weight1 = (config?.['weight1'] as number) || 4
    const weight2 = (config?.['weight2'] as number) || 2
    const weight3 = (config?.['weight3'] as number) || 1

    const values = calculateUltimateOscillator(data as MarketData, period1, period2, period3, weight1, weight2, weight3)
    return {
      values,
      metadata: {
        length: values.length,
        period1,
        period2,
        period3,
        weight1,
        weight2,
        weight3,
        source: config?.source || 'close'
      }
    }
  }
}

/**
 * Calculate Ultimate Oscillator using wrapper function
 *
 * @param data - Market data with OHLC arrays
 * @param period1 - First timeframe period (default: 7)
 * @param period2 - Second timeframe period (default: 14)
 * @param period3 - Third timeframe period (default: 28)
 * @param weight1 - Weight for first timeframe (default: 4)
 * @param weight2 - Weight for second timeframe (default: 2)
 * @param weight3 - Weight for third timeframe (default: 1)
 * @returns Array of Ultimate Oscillator values
 */
export function ultimateOscillator(
  data: MarketData,
  period1: number = 7,
  period2: number = 14,
  period3: number = 28,
  weight1: number = 4,
  weight2: number = 2,
  weight3: number = 1
): number[] {
  return createIndicatorWrapper(UltimateOscillator, data, undefined, undefined, {
    period1,
    period2,
    period3,
    weight1,
    weight2,
    weight3
  })
}
