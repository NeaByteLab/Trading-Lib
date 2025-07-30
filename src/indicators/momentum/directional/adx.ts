import { BaseIndicator } from '@base/base-indicator'
import { DEFAULT_LENGTHS, ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { calculateDirectionalMovement } from '@utils/calculation-utils'
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils'
import { pineLength } from '@utils/pine-script-utils'

/**
 * ADX (Average Directional Index) Indicator
 *
 * Measures the strength of a trend regardless of direction.
 * Combines +DI and -DI to determine trend strength.
 *
 * @example
 * ```typescript
 * const adx = new ADX()
 * const result = adx.calculate(marketData, { length: 14 })
 * console.log(result.values) // ADX values
 * console.log(result.metadata.plusDI) // +DI values
 * console.log(result.metadata.minusDI) // -DI values
 * ```
 */
export class ADX extends BaseIndicator {
  constructor() {
    super('ADX', 'Average Directional Index', 'momentum')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const length = pineLength(config?.length || DEFAULT_LENGTHS.ADX, DEFAULT_LENGTHS.ADX)
    const { adx, plusDI, minusDI } = this.calculateADX(data, length)
    return {
      values: adx,
      metadata: {
        length,
        source: 'hlc3',
        plusDI,
        minusDI
      }
    }
  }

  private calculateADX(data: MarketData, length: number): {
    adx: number[]
    plusDI: number[]
    minusDI: number[]
  } {
    const plusDI: number[] = []
    const minusDI: number[] = []
    const adx: number[] = []

    for (let i = 0; i < data.close.length; i++) {
      if (i < 1) {
        plusDI.push(NaN)
        minusDI.push(NaN)
        adx.push(NaN)
        continue
      }

      const { plusDI: plusDIVal, minusDI: minusDIVal } = this.calculateDI(data, i)
      plusDI.push(plusDIVal)
      minusDI.push(minusDIVal)

      if (i < length) {
        adx.push(NaN)
      } else {
        const adxValue = this.calculateADXValue(plusDIVal, minusDIVal)
        adx.push(adxValue)
      }
    }

    return { adx, plusDI, minusDI }
  }

  private calculateDI(data: MarketData, i: number): {
    plusDI: number
    minusDI: number
  } {
    const prevHigh = data.high[i - 1]!
    const prevLow = data.low[i - 1]!
    const { plusDM, minusDM } = calculateDirectionalMovement(data, i, prevHigh, prevLow)
    const tr = Math.max(
      data.high[i]! - data.low[i]!,
      Math.abs(data.high[i]! - data.close[i - 1]!),
      Math.abs(data.low[i]! - data.close[i - 1]!)
    )

    // Simple smoothing for DI calculation
    const smoothedTR = tr
    const smoothedPlusDM = plusDM
    const smoothedMinusDM = minusDM

    const plusDI = smoothedTR === 0 ? 0 : (smoothedPlusDM / smoothedTR) * 100
    const minusDI = smoothedTR === 0 ? 0 : (smoothedMinusDM / smoothedTR) * 100
    return { plusDI, minusDI }
  }

  private calculateADXValue(plusDI: number, minusDI: number): number {
    const diSum = plusDI + minusDI
    const diDiff = Math.abs(plusDI - minusDI)
    return diSum === 0 ? 0 : (diDiff / diSum) * 100
  }
}

/**
 * Calculate ADX values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns ADX, +DI, and -DI values
 */
export function adx(
  data: MarketData | number[],
  length?: number,
  source?: string
): {
  adx: number[]
  plusDI: number[]
  minusDI: number[]
} {
  const result = createMultiResultIndicatorWrapper(ADX, data, length, source)
  return {
    adx: result.values,
    plusDI: result.metadata['plusDI'] as number[],
    minusDI: result.metadata['minusDI'] as number[]
  }
}
