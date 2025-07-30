import { BaseIndicator } from '@base/base-indicator'
import { trueRange } from '@calculations/volatility/true-range'
import { DEFAULT_LENGTHS, ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils'
import { pineLength } from '@utils/pine-script-utils'

/**
 * Directional Movement Index (DMI) indicator
 *
 * Measures the strength of directional movement in price.
 * Formula: +DI = (Smoothed +DM / Smoothed TR) × 100, -DI = (Smoothed -DM / Smoothed TR) × 100
 *
 * @example
 * ```typescript
 * const dmi = new DMI()
 * const result = dmi.calculate(marketData, { length: 14 })
 * console.log(result.values) // +DI values
 * console.log(result.metadata.minusDI) // -DI values
 * ```
 */
export class DMI extends BaseIndicator {
  constructor() {
    super('DMI', 'Directional Movement Index', 'momentum')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const length = pineLength(config?.length || DEFAULT_LENGTHS.DMI, DEFAULT_LENGTHS.DMI)
    const { plusDI, minusDI } = this.calculateDMI(data, length)
    return {
      values: plusDI,
      metadata: {
        length,
        source: 'hlc3',
        minusDI
      }
    }
  }

  private calculateDMI(data: MarketData, length: number): {
    plusDI: number[]
    minusDI: number[]
  } {
    const trValues = trueRange(data)
    const plusDIValues: number[] = []
    const minusDIValues: number[] = []
    let prevHigh = data.high[0]!
    let prevLow = data.low[0]!
    const results = ArrayUtils.processArray(data.close, (_, i) => {
      if (i === 0) {
        plusDIValues.push(NaN)
        minusDIValues.push(NaN)
        return { plusDI: NaN, minusDI: NaN }
      }
      const { plusDM, minusDM } = this.calculateDirectionalMovement(data, i, prevHigh, prevLow)
      const tr = trValues[i]!
      const { smoothedTR, smoothedPlusDM, smoothedMinusDM } = this.calculateSmoothedValues(
        tr, plusDM, minusDM, i, length, plusDIValues, minusDIValues, trValues
      )
      const plusDI = smoothedTR > 0 ? (smoothedPlusDM / smoothedTR) * 100 : 0
      const minusDI = smoothedTR > 0 ? (smoothedMinusDM / smoothedTR) * 100 : 0
      plusDIValues.push(plusDI)
      minusDIValues.push(minusDI)
      prevHigh = data.high[i]!
      prevLow = data.low[i]!
      return { plusDI, minusDI }
    })
    return {
      plusDI: results.map(r => r.plusDI),
      minusDI: results.map(r => r.minusDI)
    }
  }

  private calculateDirectionalMovement(data: MarketData, i: number, prevHigh: number, prevLow: number): {
    plusDM: number
    minusDM: number
  } {
    const currentHigh = data.high[i]!
    const currentLow = data.low[i]!
    const plusDM = currentHigh - prevHigh > prevLow - currentLow && currentHigh - prevHigh > 0
      ? currentHigh - prevHigh
      : 0
    const minusDM = prevLow - currentLow > currentHigh - prevHigh && prevLow - currentLow > 0
      ? prevLow - currentLow
      : 0
    return { plusDM, minusDM }
  }

  private calculateSmoothedValues(
    tr: number,
    plusDM: number,
    minusDM: number,
    i: number,
    length: number,
    plusDIValues: number[],
    minusDIValues: number[],
    trValues: number[]
  ): {
    smoothedTR: number
    smoothedPlusDM: number
    smoothedMinusDM: number
  } {
    const smoothedTR = i < length ? tr : (tr + (i - 1) * trValues[i - 1]!) / i
    const smoothedPlusDM = i < length ? plusDM : (plusDM + (i - 1) * (plusDIValues[i - 1] || 0)) / i
    const smoothedMinusDM = i < length ? minusDM : (minusDM + (i - 1) * (minusDIValues[i - 1] || 0)) / i
    return { smoothedTR, smoothedPlusDM, smoothedMinusDM }
  }
}

/**
 * Calculate DMI values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns +DI and -DI values
 */
export function dmi(
  data: MarketData | number[],
  length?: number,
  source?: string
): {
  plusDI: number[]
  minusDI: number[]
} {
  const result = createMultiResultIndicatorWrapper(
    DMI,
    data,
    length,
    source
  )
  return {
    plusDI: result.values,
    minusDI: result.metadata['minusDI'] as number[]
  }
}
