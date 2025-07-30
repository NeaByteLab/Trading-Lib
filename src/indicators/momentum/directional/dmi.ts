import { BaseIndicator } from '@base/base-indicator'
import { DEFAULT_LENGTHS, ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { calculateDirectionalMovement } from '@utils/calculation-utils'
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils'
import { pineLength } from '@utils/pine-script-utils'

/**
 * DMI (Directional Movement Index) Indicator
 *
 * Measures the strength and direction of price movement.
 * Consists of +DI and -DI components.
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
    const { plusDI, minusDI } = this.calculateDMI(data)
    return {
      values: plusDI,
      metadata: {
        length,
        source: 'hlc3',
        minusDI
      }
    }
  }

  private calculateDMI(data: MarketData): {
    plusDI: number[]
    minusDI: number[]
  } {
    const plusDI: number[] = []
    const minusDI: number[] = []

    for (let i = 0; i < data.close.length; i++) {
      if (i < 1) {
        plusDI.push(NaN)
        minusDI.push(NaN)
        continue
      }

      const { plusDI: plusDIVal, minusDI: minusDIVal } = this.calculateDI(data, i)
      plusDI.push(plusDIVal)
      minusDI.push(minusDIVal)
    }

    return { plusDI, minusDI }
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
  const result = createMultiResultIndicatorWrapper(DMI, data, length, source)
  return {
    plusDI: result.values,
    minusDI: result.metadata['minusDI'] as number[]
  }
}
