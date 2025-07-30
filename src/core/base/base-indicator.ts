import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { PriceCalculations } from '@utils/calculation-utils'

/**
 * Base class for all technical indicators
 * Provides common functionality and validation
 */
export abstract class BaseIndicator {
  public name: string
  public description: string
  public category: string

  constructor(name: string, description: string, category: string) {
    this.name = name
    this.description = description
    this.category = category
  }

  /**
   * Validate input data and configuration
   *
   * @param _data - Input data (unused in base implementation)
   * @param _config - Configuration (unused in base implementation)
   */
  public validateInput(_data: MarketData | number[], _config?: IndicatorConfig): void {
    // Base implementation - override in subclasses for specific validation
  }

  /**
   * Get source data based on configuration
   */
  public getSourceData(data: MarketData, source?: string): number[] {
    switch (source) {
    case 'open':
      return data.open
    case 'high':
      return data.high
    case 'low':
      return data.low
    case 'close':
      return data.close
    case 'hl2':
      return PriceCalculations.hl2(data)
    case 'hlc3':
    case 'typical':
      return PriceCalculations.typical(data)
    case 'ohlc4':
      return PriceCalculations.ohlc4(data)
    case 'volume':
      if (!data.volume) {
        throw new Error(ERROR_MESSAGES.VOLUME_REQUIRED)
      }
      return data.volume
    default:
      return data.close
    }
  }

  /**
   * Calculate indicator values
   *
   * @param _data - Market data or price array
   * @param _config - Indicator configuration
   * @returns Indicator calculation result
   */

  abstract calculate(_data: MarketData | number[], _config?: IndicatorConfig): IndicatorResult
}
