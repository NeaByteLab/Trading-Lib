import { BaseIndicator } from '@core/base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { validateIndicatorData } from '@core/utils/validation-utils'

/**
 * Base class for volatility indicators
 * Eliminates duplication in volatility validation and processing patterns
 */
export abstract class VolatilityIndicator extends BaseIndicator {
  protected defaultLength: number
  protected defaultMultiplier: number
  protected minLength: number
  protected maxLength?: number

  constructor(
    name: string,
    description: string,
    defaultLength: number = 20,
    defaultMultiplier: number = 2.0,
    minLength: number = 1,
    maxLength?: number
  ) {
    super(name, description, 'volatility')
    this.defaultLength = defaultLength
    this.defaultMultiplier = defaultMultiplier
    this.minLength = minLength
    if (maxLength !== undefined) {
      this.maxLength = maxLength
    }
  }

  /**
   * Centralized volatility validation
   * Eliminates duplication across all volatility indicators
   */
  override validateInput(data: MarketData | number[], config?: IndicatorConfig): void {
    validateIndicatorData(data)
    const length = config?.length !== undefined ? config.length : this.defaultLength
    this.validateLength(length, this.minLength, this.maxLength)
    const multiplier = config?.['multiplier'] as number
    if (multiplier !== undefined) {
      this.validateMultiplier(multiplier)
    }
  }

  /**
   * Abstract method for volatility calculation
   * Each volatility indicator must implement its specific calculation logic
   */
  protected abstract calculateVolatility(data: number[], length: number, multiplier: number): number[]

  /**
   * Standard volatility calculation wrapper
   * Provides consistent processing for all volatility indicators
   */
  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const source = Array.isArray(data) ? data : data.close
    const length = config?.length || this.defaultLength
    const multiplier = (config?.['multiplier'] as number) || this.defaultMultiplier
    const values = this.calculateVolatility(source, length, multiplier)
    return {
      values,
      metadata: {
        length,
        multiplier,
        source: config?.source || 'close'
      }
    }
  }
}
