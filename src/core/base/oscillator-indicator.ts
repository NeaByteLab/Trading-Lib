import { BaseIndicator } from '@base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { validateIndicatorData } from '@utils/validation-utils'

/**
 * Base class for oscillator indicators
 * Eliminates duplication in oscillator validation and processing patterns
 */
export abstract class OscillatorIndicator extends BaseIndicator {
  protected defaultLength: number
  protected minLength: number
  protected maxLength?: number

  constructor(
    name: string,
    description: string,
    defaultLength: number = 14,
    minLength: number = 1,
    maxLength?: number
  ) {
    super(name, description, 'momentum')
    this.defaultLength = defaultLength
    this.minLength = minLength
    if (maxLength !== undefined) {
      this.maxLength = maxLength
    }
  }

  /**
   * Centralized oscillator validation
   * Eliminates duplication across all oscillator indicators
   */
  override validateInput(data: MarketData | number[], config?: IndicatorConfig): void {
    validateIndicatorData(data)
    const length = config?.length || this.defaultLength
    this.validateLength(length, this.minLength, this.maxLength)
  }

  /**
   * Abstract method for oscillator calculation
   * Each oscillator must implement its specific calculation logic
   */
  protected abstract calculateOscillator(data: number[], length: number): number[]

  /**
   * Standard oscillator calculation wrapper
   * Provides consistent processing for all oscillators
   */
  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const source = Array.isArray(data) ? data : data.close
    const length = config?.length || this.defaultLength
    const values = this.calculateOscillator(source, length)
    return {
      values,
      metadata: {
        length,
        source: config?.source || 'close'
      }
    }
  }
}
