import { BaseIndicator } from '@core/base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { validateMarketDataOnly } from '@core/utils/validation-utils'

/**
 * Fibonacci level types
 */
export type FibonacciLevelType = 'retracement' | 'extension' | 'projection'

/**
 * Fibonacci Level Indicator
 * Calculates specific Fibonacci levels based on a given range
 */
export class FibonacciLevelIndicator extends BaseIndicator {
  constructor() {
    super('FibonacciLevel', 'Fibonacci Level', 'trend')
  }

  override validateInput(data: MarketData | number[], _config?: IndicatorConfig): void {
    validateMarketDataOnly(data)
  }

  /**
   * Calculate Fibonacci levels
   * @param data - Market data with OHLC
   * @param config - Configuration with level parameters
   * @returns Fibonacci levels
   */
  calculate(data: MarketData | number[], config?: IndicatorConfig & {
    startIndex?: number
    endIndex?: number
    levelType?: FibonacciLevelType
    customLevels?: number[]
  }): IndicatorResult {
    this.validateInput(data, config)

    const marketData = data as MarketData
    const startIndex = config?.startIndex || 0
    const endIndex = config?.endIndex || marketData.close.length - 1
    const levelType = config?.levelType || 'retracement'
    const customLevels = config?.customLevels || [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1]

    const levels = this.calculateLevels(marketData, startIndex, endIndex, levelType, customLevels)

    return {
      values: levels.values,
      metadata: {
        length: marketData.close.length,
        source: 'fibonacci-level',
        startIndex,
        endIndex,
        levelType,
        customLevels,
        highPrice: levels.highPrice,
        lowPrice: levels.lowPrice,
        range: levels.range,
        calculatedLevels: levels.calculatedLevels
      }
    }
  }

  /**
   * Calculate Fibonacci levels based on range
   */
  private calculateLevels(
    data: MarketData,
    startIndex: number,
    endIndex: number,
    levelType: FibonacciLevelType,
    customLevels: number[]
  ): {
    values: number[]
    highPrice: number
    lowPrice: number
    range: number
    calculatedLevels: number[]
  } {
    const { highPrice, lowPrice } = this.findPriceRange(data, startIndex, endIndex)
    const range = highPrice - lowPrice

    if (range <= 0) {
      return this.getNaNLevels(data.close.length, customLevels.length, highPrice, lowPrice, range)
    }

    const calculatedLevels = this.calculateLevelValues(highPrice, lowPrice, range, levelType, customLevels)
    const values = this.determineCurrentLevels(data.close, calculatedLevels, customLevels, levelType)

    return {
      values,
      highPrice,
      lowPrice,
      range,
      calculatedLevels
    }
  }

  /**
   * Find high and low prices in the specified range
   */
  private findPriceRange(data: MarketData, startIndex: number, endIndex: number): { highPrice: number; lowPrice: number } {
    let highPrice = -Infinity
    let lowPrice = Infinity

    for (let i = startIndex; i <= endIndex && i < data.high.length; i++) {
      if (data.high[i] && data.high[i]! > highPrice) {
        highPrice = data.high[i]!
      }
      if (data.low[i] && data.low[i]! < lowPrice) {
        lowPrice = data.low[i]!
      }
    }

    return { highPrice, lowPrice }
  }

  /**
   * Calculate level values based on type
   */
  private calculateLevelValues(
    highPrice: number,
    lowPrice: number,
    range: number,
    levelType: FibonacciLevelType,
    customLevels: number[]
  ): number[] {
    return customLevels.map(level => {
      switch (levelType) {
      case 'retracement':
        return highPrice - (range * level)
      case 'extension':
        return highPrice + (range * level)
      case 'projection':
        return lowPrice + (range * level)
      default:
        return NaN
      }
    })
  }

  /**
   * Determine current levels for each data point
   */
  private determineCurrentLevels(
    closePrices: number[],
    calculatedLevels: number[],
    customLevels: number[],
    levelType: FibonacciLevelType
  ): number[] {
    return closePrices.map(currentPrice => {
      for (let j = 0; j < calculatedLevels.length; j++) {
        const calculatedLevel = calculatedLevels[j]
        if (calculatedLevel !== undefined && this.isPriceAtLevel(currentPrice, calculatedLevel, levelType)) {
          return customLevels[j]!
        }
      }
      return NaN
    })
  }

  /**
   * Check if price is at a specific level
   */
  private isPriceAtLevel(currentPrice: number, calculatedLevel: number, levelType: FibonacciLevelType): boolean {
    switch (levelType) {
    case 'retracement':
      return currentPrice >= calculatedLevel
    case 'extension':
    case 'projection':
      return currentPrice <= calculatedLevel
    default:
      return false
    }
  }

  /**
   * Return NaN levels for invalid cases
   */
  private getNaNLevels(
    closeLength: number,
    customLevelsLength: number,
    highPrice: number,
    lowPrice: number,
    range: number
  ): {
    values: number[]
    highPrice: number
    lowPrice: number
    range: number
    calculatedLevels: number[]
  } {
    const values = Array(closeLength).fill(NaN)
    const calculatedLevels = Array(customLevelsLength).fill(NaN)

    return {
      values,
      highPrice,
      lowPrice,
      range,
      calculatedLevels
    }
  }
}

/**
 * Calculate Fibonacci levels
 * @param data - Market data with OHLC
 * @param startIndex - Start index for range calculation (default: 0)
 * @param endIndex - End index for range calculation (default: last index)
 * @param levelType - Type of Fibonacci levels (default: 'retracement')
 * @param customLevels - Custom Fibonacci levels (default: [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1])
 * @returns Fibonacci levels and metadata
 */
export function fibonacciLevel(
  data: MarketData,
  startIndex?: number,
  endIndex?: number,
  levelType?: FibonacciLevelType,
  customLevels?: number[]
): {
  values: number[]
  highPrice: number
  lowPrice: number
  range: number
  calculatedLevels: number[]
} {
  const indicator = new FibonacciLevelIndicator()
  const config: IndicatorConfig & {
    startIndex?: number
    endIndex?: number
    levelType?: FibonacciLevelType
    customLevels?: number[]
  } = {}

  if (startIndex !== undefined) {config.startIndex = startIndex}
  if (endIndex !== undefined) {config.endIndex = endIndex}
  if (levelType !== undefined) {config.levelType = levelType}
  if (customLevels !== undefined) {config.customLevels = customLevels}

  const result = indicator.calculate(data, config)

  return {
    values: result.values,
    highPrice: result.metadata['highPrice'] as number,
    lowPrice: result.metadata['lowPrice'] as number,
    range: result.metadata['range'] as number,
    calculatedLevels: result.metadata['calculatedLevels'] as number[]
  }
}
