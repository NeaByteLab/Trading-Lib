import { BaseIndicator } from '@base/base-indicator'
import { DEFAULT_MULTIPLIERS } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { PineCore } from '@utils/pine-core'
import { pineSource } from '@utils/pine-script-utils'

/**
 * Parabolic SAR (Stop and Reverse) indicator
 *
 * Calculates dynamic support and resistance levels that follow price action.
 * Used to identify potential reversal points and trend direction.
 *
 * @example
 * ```typescript
 * const sar = new ParabolicSAR()
 * const result = sar.calculate(marketData, { acceleration: 0.02, maximum: 0.2 })
 * console.log(result.values) // SAR values
 * ```
 */
export class ParabolicSAR extends BaseIndicator {
  constructor() {
    super('ParabolicSAR', 'Parabolic SAR', 'trend')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    pineSource(data, config?.source)
    const acceleration = (config?.['acceleration'] as number) || DEFAULT_MULTIPLIERS.PARABOLIC
    const maximum = (config?.['maximum'] as number) || 0.2

    if (Array.isArray(data)) {
      throw new Error('Parabolic SAR requires OHLC market data')
    }

    const sar = this.calculateParabolicSAR(data, acceleration, maximum)

    return {
      values: sar,
      metadata: {
        length: 1,
        acceleration,
        maximum,
        source: config?.source || 'close'
      }
    }
  }

  /**
   * Calculate Parabolic SAR values using centralized utilities
   *
   * @param data - Market data
   * @param acceleration - Acceleration factor
   * @param maximum - Maximum acceleration
   * @returns Parabolic SAR values array
   */
  private handleLongPosition(
    high: number,
    low: number,
    sar: number,
    ep: number,
    af: number,
    acceleration: number,
    maximum: number
  ): { isLong: boolean; sar: number; ep: number; af: number } {
    if (low < sar) {
      return { isLong: false, sar: ep, ep: low, af: acceleration }
    }

    let newEp = ep
    let newAf = af
    if (high > ep) {
      newEp = high
      newAf = PineCore.min([af + acceleration, maximum])
    }
    const newSar = sar + newAf * (newEp - sar)

    return { isLong: true, sar: newSar, ep: newEp, af: newAf }
  }

  private handleShortPosition(
    high: number,
    low: number,
    sar: number,
    ep: number,
    af: number,
    acceleration: number,
    maximum: number
  ): { isLong: boolean; sar: number; ep: number; af: number } {
    if (high > sar) {
      return { isLong: true, sar: ep, ep: high, af: acceleration }
    }

    let newEp = ep
    let newAf = af
    if (low < ep) {
      newEp = low
      newAf = PineCore.min([af + acceleration, maximum])
    }
    const newSar = sar + newAf * (newEp - sar)

    return { isLong: false, sar: newSar, ep: newEp, af: newAf }
  }

  private applyStopLoss(
    sar: number,
    isLong: boolean,
    data: MarketData,
    i: number
  ): number {
    if (isLong) {
      return PineCore.min([sar, data.low[i - 1]!, data.low[i - 2] || data.low[i - 1]!])
    }
    return PineCore.max([sar, data.high[i - 1]!, data.high[i - 2] || data.high[i - 1]!])
  }

  private calculateParabolicSAR(data: MarketData, acceleration: number, maximum: number): number[] {
    let isLong = true
    let af = acceleration
    let ep = data.low[0]!
    let sar = data.high[0]!

    return ArrayUtils.processArray(data.close, (_, i) => {
      if (i === 0) {
        return sar
      }

      const high = data.high[i]!
      const low = data.low[i]!

      if (isLong) {
        const result = this.handleLongPosition(high, low, sar, ep, af, acceleration, maximum)
        ;({ isLong, sar, ep, af } = result)
      } else {
        const result = this.handleShortPosition(high, low, sar, ep, af, acceleration, maximum)
        ;({ isLong, sar, ep, af } = result)
      }

      sar = this.applyStopLoss(sar, isLong, data, i)
      return sar
    })
  }
}

/**
 * Calculate Parabolic SAR values using wrapper function
 *
 * @param data - Market data
 * @param acceleration - Acceleration factor (default: 0.02)
 * @param maximum - Maximum acceleration (default: 0.2)
 * @param source - Price source (default: 'close')
 * @returns Parabolic SAR values array
 */
export function parabolicSAR(
  data: MarketData | number[],
  acceleration?: number,
  maximum?: number,
  source?: string
): number[] {
  return createIndicatorWrapper(ParabolicSAR, data, undefined, source, { acceleration, maximum })
}
