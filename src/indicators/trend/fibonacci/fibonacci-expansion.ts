import { BaseIndicator } from '@core/base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { validateMarketDataOnly } from '@core/utils/validation-utils'

/**
 * Fibonacci expansion levels
 */
export type FibonacciExpansionLevel = 1.272 | 1.618 | 2.0 | 2.618 | 3.618

/**
 * Fibonacci Expansion Indicator
 * Calculates Fibonacci expansion levels beyond swing high and low points
 */
export class FibonacciExpansionIndicator extends BaseIndicator {
  constructor() {
    super('FibonacciExpansion', 'Fibonacci Expansion', 'trend')
  }

  override validateInput(data: MarketData | number[], _config?: IndicatorConfig): void {
    validateMarketDataOnly(data)
  }

  /**
   * Calculate Fibonacci expansion levels
   * @param data - Market data with OHLC
   * @param config - Configuration with optional swing detection parameters
   * @returns Fibonacci expansion levels
   */
  calculate(data: MarketData | number[], config?: IndicatorConfig & {
    swingPeriod?: number
    levels?: FibonacciExpansionLevel[]
  }): IndicatorResult {
    this.validateInput(data, config)

    const marketData = data as MarketData
    const swingPeriod = config?.swingPeriod || 10
    const levels = config?.levels || [1.272, 1.618, 2.0, 2.618, 3.618]

    const { swingHighs, swingLows } = this.findSwingPoints(marketData, swingPeriod)
    const expansions = this.calculateExpansions(marketData, swingHighs, swingLows, levels)

    return {
      values: expansions.levels,
      metadata: {
        length: marketData.close.length,
        source: 'fibonacci-expansion',
        swingHighs: expansions.swingHighs,
        swingLows: expansions.swingLows,
        level1272: expansions.level1272,
        level1618: expansions.level1618,
        level200: expansions.level200,
        level2618: expansions.level2618,
        level3618: expansions.level3618
      }
    }
  }

  /**
   * Find swing high and low points
   */
  private findSwingPoints(data: MarketData, period: number): { swingHighs: number[], swingLows: number[] } {
    const swingHighs: number[] = []
    const swingLows: number[] = []

    for (let i = period; i < data.high.length - period; i++) {
      if (this.isSwingHigh(data, i, period)) {
        swingHighs.push(i)
      }
      if (this.isSwingLow(data, i, period)) {
        swingLows.push(i)
      }
    }

    return { swingHighs, swingLows }
  }

  /**
   * Check if point is a swing high
   */
  private isSwingHigh(data: MarketData, index: number, period: number): boolean {
    for (let j = index - period; j <= index + period; j++) {
      if (j === index) {continue}
      if (data.high[j] && data.high[index] && data.high[j]! >= data.high[index]!) {
        return false
      }
    }
    return true
  }

  /**
   * Check if point is a swing low
   */
  private isSwingLow(data: MarketData, index: number, period: number): boolean {
    for (let j = index - period; j <= index + period; j++) {
      if (j === index) {continue}
      if (data.low[j] && data.low[index] && data.low[j]! <= data.low[index]!) {
        return false
      }
    }
    return true
  }

  /**
   * Calculate Fibonacci expansion levels
   */
  private calculateExpansions(
    data: MarketData,
    swingHighs: number[],
    swingLows: number[],
    _levels: FibonacciExpansionLevel[]
  ): {
    levels: number[]
    swingHighs: number[]
    swingLows: number[]
    level1272: number[]
    level1618: number[]
    level200: number[]
    level2618: number[]
    level3618: number[]
  } {
    const expansions: number[] = []
    const level1272: number[] = []
    const level1618: number[] = []
    const level200: number[] = []
    const level2618: number[] = []
    const level3618: number[] = []

    for (let i = 0; i < data.close.length; i++) {
      const result = this.calculateExpansionForIndex(data, swingHighs, swingLows, i)

      level1272.push(result.level1272)
      level1618.push(result.level1618)
      level200.push(result.level200)
      level2618.push(result.level2618)
      level3618.push(result.level3618)
      expansions.push(result.currentLevel)
    }

    return {
      levels: expansions,
      swingHighs,
      swingLows,
      level1272,
      level1618,
      level200,
      level2618,
      level3618
    }
  }

  /**
   * Calculate expansion levels for a specific index
   */
  private calculateExpansionForIndex(
    data: MarketData,
    swingHighs: number[],
    swingLows: number[],
    index: number
  ): {
    level1272: number
    level1618: number
    level200: number
    level2618: number
    level3618: number
    currentLevel: number
  } {
    const recentSwingHigh = this.findMostRecentSwing(swingHighs, index)
    const recentSwingLow = this.findMostRecentSwing(swingLows, index)

    if (recentSwingHigh === -1 || recentSwingLow === -1) {
      return this.getNaNLevels()
    }

    const highPrice = data.high[recentSwingHigh]
    const lowPrice = data.low[recentSwingLow]

    if (!highPrice || !lowPrice) {
      return this.getNaNLevels()
    }

    const range = highPrice - lowPrice
    if (range <= 0) {
      return this.getNaNLevels()
    }

    const currentPrice = data.close[index]
    if (currentPrice === undefined) {
      return this.getNaNLevels()
    }
    return this.calculateExpansionLevels(highPrice, range, currentPrice)
  }

  /**
   * Calculate expansion levels from swing high
   */
  private calculateExpansionLevels(highPrice: number, range: number, currentPrice: number) {
    const level1272Val = highPrice + (range * 0.272)
    const level1618Val = highPrice + (range * 0.618)
    const level200Val = highPrice + range
    const level2618Val = highPrice + (range * 1.618)
    const level3618Val = highPrice + (range * 2.618)

    const currentLevel = this.determineCurrentLevel(currentPrice, highPrice, level1272Val, level1618Val, level200Val, level2618Val)

    return {
      level1272: level1272Val,
      level1618: level1618Val,
      level200: level200Val,
      level2618: level2618Val,
      level3618: level3618Val,
      currentLevel
    }
  }

  /**
   * Determine current expansion level based on price position
   */
  private determineCurrentLevel(
    currentPrice: number,
    highPrice: number,
    level1272: number,
    level1618: number,
    level200: number,
    level2618: number
  ): number {
    if (currentPrice <= highPrice) {return 1}
    if (currentPrice <= level1272) {return 1.272}
    if (currentPrice <= level1618) {return 1.618}
    if (currentPrice <= level200) {return 2.0}
    if (currentPrice <= level2618) {return 2.618}
    return 3.618
  }

  /**
   * Return NaN levels for invalid cases
   */
  private getNaNLevels() {
    return {
      level1272: NaN,
      level1618: NaN,
      level200: NaN,
      level2618: NaN,
      level3618: NaN,
      currentLevel: NaN
    }
  }

  /**
   * Find the most recent swing point before the current index
   */
  private findMostRecentSwing(swingPoints: number[], currentIndex: number): number {
    for (let i = swingPoints.length - 1; i >= 0; i--) {
      const point = swingPoints[i]
      if (point !== undefined && point <= currentIndex) {
        return point
      }
    }
    return -1
  }
}

/**
 * Calculate Fibonacci expansion levels
 * @param data - Market data with OHLC
 * @param swingPeriod - Period for swing detection (default: 10)
 * @param levels - Fibonacci expansion levels to calculate (default: [1.272, 1.618, 2.0, 2.618, 3.618])
 * @returns Fibonacci expansion levels and metadata
 */
export function fibonacciExpansion(
  data: MarketData,
  swingPeriod?: number,
  levels?: FibonacciExpansionLevel[]
): {
  levels: number[]
  swingHighs: number[]
  swingLows: number[]
  level1272: number[]
  level1618: number[]
  level200: number[]
  level2618: number[]
  level3618: number[]
} {
  const indicator = new FibonacciExpansionIndicator()
  const result = indicator.calculate(data, {
    swingPeriod: swingPeriod || 10,
    levels: levels || [1.272, 1.618, 2.0, 2.618, 3.618]
  } as IndicatorConfig & { swingPeriod?: number; levels?: FibonacciExpansionLevel[] })

  return {
    levels: result.values,
    swingHighs: result.metadata['swingHighs'] as number[],
    swingLows: result.metadata['swingLows'] as number[],
    level1272: result.metadata['level1272'] as number[],
    level1618: result.metadata['level1618'] as number[],
    level200: result.metadata['level200'] as number[],
    level2618: result.metadata['level2618'] as number[],
    level3618: result.metadata['level3618'] as number[]
  }
}
