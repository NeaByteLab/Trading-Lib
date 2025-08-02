import { BaseIndicator } from '@base/base-indicator'
import { DEFAULT_LENGTHS } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { calculateVortexIndicator } from '@utils/calculation-utils'
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils'
import { validateVolumeData } from '@utils/validation-utils'

/**
 * Vortex Indicator
 *
 * Measures trend strength and direction using price momentum.
 * VI+ = |Current High - Prior Low| / True Range
 * VI- = |Current Low - Prior High| / True Range
 * Uses centralized calculation utilities for consistency.
 *
 * @example
 * ```typescript
 * const vortex = new Vortex()
 * const result = vortex.calculate(marketData, { length: 14 })
 * console.log(result.values) // VI+ values
 * ```
 */
export class Vortex extends BaseIndicator {
  constructor() {
    super('Vortex', 'Vortex Indicator', 'volume')
  }

  override validateInput(data: MarketData | number[], _config?: IndicatorConfig): void {
    if (Array.isArray(data)) {
      throw new Error('Market data required for Vortex calculation')
    }
    validateVolumeData(data)
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const marketData = data as MarketData
    const length = config?.length || DEFAULT_LENGTHS.ADX
    const result = calculateVortexIndicator(marketData.high, marketData.low, marketData.close, length)
    return {
      values: result.viPlus,
      metadata: {
        length,
        source: config?.source || 'close',
        viPlus: result.viPlus,
        viMinus: result.viMinus
      }
    }
  }
}

/**
 * Calculate Vortex Indicator values
 *
 * Vortex Indicator measures trend strength and direction using price momentum.
 * VI+ = |Current High - Prior Low| / True Range
 * VI- = |Current Low - Prior High| / True Range
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Object with VI+ and VI- arrays
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const { viPlus, viMinus } = ta.vortex(marketData, 14)
 * // Returns: { viPlus: [0.8, 0.9, 0.7, ...], viMinus: [0.2, 0.1, 0.3, ...] }
 * ```
 */
export function vortex(data: MarketData | number[], length?: number, source?: string): {
  viPlus: number[]
  viMinus: number[]
} {
  const result = createMultiResultIndicatorWrapper(Vortex, data, length, source)
  return {
    viPlus: result.metadata['viPlus'] as number[],
    viMinus: result.metadata['viMinus'] as number[]
  }
}
