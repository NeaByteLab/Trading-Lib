import { BaseIndicator } from '@base/base-indicator'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { MathUtils } from '@utils/math-utils'

/**
 * Chart Pattern Types
 * Defines common chart patterns for identification
 */
export enum ChartPattern {
  ASCENDING_TRIANGLE = 1,
  DESCENDING_TRIANGLE = 2,
  SYMMETRICAL_TRIANGLE = 3,
  BULL_FLAG = 4,
  BEAR_FLAG = 5,
  ASCENDING_WEDGE = 6,
  DESCENDING_WEDGE = 7,
  DOUBLE_TOP = 8,
  DOUBLE_BOTTOM = 9,
  HEAD_AND_SHOULDERS = 10,
  INVERSE_HEAD_AND_SHOULDERS = 11,
  RECTANGLE = 12,
  NONE = 0
}

/**
 * Calculate swing highs and lows for pattern detection
 *
 * @param data - Price data array
 * @param windowSize - Window size for swing detection
 * @returns Object with swing highs and lows arrays
 */
function calculateSwingPoints(data: number[], windowSize: number = 5): {
  swingHighs: number[]
  swingLows: number[]
} {
  const swingHighs: number[] = []
  const swingLows: number[] = []

  for (let i = windowSize; i < data.length - windowSize; i++) {
    const current = data[i]!
    const leftWindow = data.slice(i - windowSize, i)
    const rightWindow = data.slice(i + 1, i + windowSize + 1)

    // Check for swing high
    const isSwingHigh = leftWindow.every(val => val < current) &&
                       rightWindow.every(val => val < current)

    // Check for swing low
    const isSwingLow = leftWindow.every(val => val > current) &&
                      rightWindow.every(val => val > current)

    swingHighs.push(isSwingHigh ? current : NaN)
    swingLows.push(isSwingLow ? current : NaN)
  }

  return { swingHighs, swingLows }
}

/**
 * Calculate chart patterns using price action analysis
 * Identifies common chart patterns based on swing points and trend analysis
 *
 * @param data - Market data with OHLC arrays
 * @param windowSize - Window size for swing detection (default: 5)
 * @param sensitivity - Pattern detection sensitivity (default: 0.1)
 * @returns Array of chart pattern values
 */
function calculateChartPatterns(data: MarketData, windowSize: number = 5, sensitivity: number = 0.1): number[] {
  return ArrayUtils.processArray(data.close, (_, i) => {
    if (i < windowSize * 3) {return ChartPattern.NONE}

    // Get recent price window for pattern analysis
    const priceWindow = data.close.slice(Math.max(0, i - windowSize * 3), i + 1)

    // Calculate swing points
    const { swingHighs, swingLows } = calculateSwingPoints(priceWindow, windowSize)
    const validSwingHighs = swingHighs.filter(val => !isNaN(val))
    const validSwingLows = swingLows.filter(val => !isNaN(val))

    if (validSwingHighs.length < 2 || validSwingLows.length < 2) {
      return ChartPattern.NONE
    }

    // Calculate trend lines
    const highTrend = calculateTrendLine(validSwingHighs)
    const lowTrend = calculateTrendLine(validSwingLows)

    // Pattern detection
    return detectPattern(highTrend, lowTrend, validSwingHighs, validSwingLows, sensitivity)
  })
}

/**
 * Calculate trend line slope and intercept
 *
 * @param points - Array of price points
 * @returns Object with slope and intercept
 */
function calculateTrendLine(points: number[]): { slope: number; intercept: number } {
  if (points.length < 2) {
    return { slope: 0, intercept: 0 }
  }

  const n = points.length
  const xValues = Array.from({ length: n }, (_, i) => i)
  const sumX = xValues.reduce((sum, x) => sum + x, 0)
  const sumY = points.reduce((sum, y) => sum + y, 0)
  const sumXY = xValues.reduce((sum, x, i) => sum + x * points[i]!, 0)
  const sumXX = xValues.reduce((sum, x) => sum + x * x, 0)

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n

  return { slope, intercept }
}

/**
 * Detect triangle patterns
 */
function detectTrianglePatterns(highSlope: number, lowSlope: number, slopeThreshold: number): ChartPattern {
  if (MathUtils.abs(highSlope) < slopeThreshold && MathUtils.abs(lowSlope) < slopeThreshold) {
    return ChartPattern.SYMMETRICAL_TRIANGLE
  }

  if (highSlope < -slopeThreshold && MathUtils.abs(lowSlope) < slopeThreshold) {
    return ChartPattern.DESCENDING_TRIANGLE
  }

  if (MathUtils.abs(highSlope) < slopeThreshold && lowSlope > slopeThreshold) {
    return ChartPattern.ASCENDING_TRIANGLE
  }

  return ChartPattern.NONE
}

/**
 * Detect wedge patterns
 */
function detectWedgePatterns(highSlope: number, lowSlope: number, slopeThreshold: number): ChartPattern {
  if (highSlope < -slopeThreshold && lowSlope < -slopeThreshold) {
    return ChartPattern.DESCENDING_WEDGE
  }

  if (highSlope > slopeThreshold && lowSlope > slopeThreshold) {
    return ChartPattern.ASCENDING_WEDGE
  }

  return ChartPattern.NONE
}

/**
 * Detect flag patterns
 */
function detectFlagPatterns(highSlope: number, lowSlope: number, slopeThreshold: number): ChartPattern {
  if (highSlope > slopeThreshold && lowSlope > slopeThreshold &&
      MathUtils.abs(highSlope - lowSlope) < slopeThreshold) {
    return ChartPattern.BULL_FLAG
  }

  if (highSlope < -slopeThreshold && lowSlope < -slopeThreshold &&
      MathUtils.abs(highSlope - lowSlope) < slopeThreshold) {
    return ChartPattern.BEAR_FLAG
  }

  return ChartPattern.NONE
}

/**
 * Detect rectangle pattern
 */
function detectRectanglePattern(highSlope: number, lowSlope: number, slopeThreshold: number,
  highTrend: { slope: number; intercept: number },
  lowTrend: { slope: number; intercept: number },
  sensitivity: number): ChartPattern {
  if (MathUtils.abs(highSlope) < slopeThreshold && MathUtils.abs(lowSlope) < slopeThreshold &&
      MathUtils.abs(highTrend.intercept - lowTrend.intercept) > sensitivity) {
    return ChartPattern.RECTANGLE
  }

  return ChartPattern.NONE
}

/**
 * Detect double top/bottom patterns
 */
function detectDoublePatterns(swingHighs: number[], swingLows: number[], sensitivity: number): ChartPattern {
  if (swingHighs.length >= 2) {
    const lastTwoHighs = swingHighs.slice(-2)
    if (MathUtils.abs(lastTwoHighs[0]! - lastTwoHighs[1]!) < sensitivity * 10) {
      return ChartPattern.DOUBLE_TOP
    }
  }

  if (swingLows.length >= 2) {
    const lastTwoLows = swingLows.slice(-2)
    if (MathUtils.abs(lastTwoLows[0]! - lastTwoLows[1]!) < sensitivity * 10) {
      return ChartPattern.DOUBLE_BOTTOM
    }
  }

  return ChartPattern.NONE
}

/**
 * Detect chart pattern based on trend lines and swing points
 *
 * @param highTrend - High trend line
 * @param lowTrend - Low trend line
 * @param swingHighs - Swing high points
 * @param swingLows - Swing low points
 * @param sensitivity - Pattern detection sensitivity
 * @returns Chart pattern type
 */
function detectPattern(
  highTrend: { slope: number; intercept: number },
  lowTrend: { slope: number; intercept: number },
  swingHighs: number[],
  swingLows: number[],
  sensitivity: number
): ChartPattern {
  const highSlope = highTrend.slope
  const lowSlope = lowTrend.slope
  const slopeThreshold = sensitivity * 0.1

  // Check triangle patterns
  const trianglePattern = detectTrianglePatterns(highSlope, lowSlope, slopeThreshold)
  if (trianglePattern !== ChartPattern.NONE) {
    return trianglePattern
  }

  // Check wedge patterns
  const wedgePattern = detectWedgePatterns(highSlope, lowSlope, slopeThreshold)
  if (wedgePattern !== ChartPattern.NONE) {
    return wedgePattern
  }

  // Check flag patterns
  const flagPattern = detectFlagPatterns(highSlope, lowSlope, slopeThreshold)
  if (flagPattern !== ChartPattern.NONE) {
    return flagPattern
  }

  // Check rectangle pattern
  const rectanglePattern = detectRectanglePattern(highSlope, lowSlope, slopeThreshold, highTrend, lowTrend, sensitivity)
  if (rectanglePattern !== ChartPattern.NONE) {
    return rectanglePattern
  }

  // Check double patterns
  const doublePattern = detectDoublePatterns(swingHighs, swingLows, sensitivity)
  if (doublePattern !== ChartPattern.NONE) {
    return doublePattern
  }

  return ChartPattern.NONE
}

/**
 * Chart Patterns Indicator
 *
 * Identifies common chart patterns in price data.
 * Returns pattern type values based on trend analysis and swing points.
 * Higher values indicate stronger pattern signals.
 *
 * @example
 * ```typescript
 * const patterns = new ChartPatterns()
 * const result = patterns.calculate(marketData, { windowSize: 5, sensitivity: 0.1 })
 * console.log(result.values) // Pattern type values
 * ```
 */
export class ChartPatterns extends BaseIndicator {
  constructor() {
    super('ChartPatterns', 'Chart Pattern Recognition', 'trend')
  }

  override validateInput(data: MarketData | number[], config?: IndicatorConfig): void {
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const windowSize = (config?.['windowSize'] as number) || 5
    const sensitivity = (config?.['sensitivity'] as number) || 0.1
    if (windowSize <= 0) {
      throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
    }
    if (sensitivity <= 0 || sensitivity > 1) {
      throw new Error('Sensitivity must be between 0 and 1')
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const windowSize = (config?.['windowSize'] as number) || 5
    const sensitivity = (config?.['sensitivity'] as number) || 0.1
    const values = calculateChartPatterns(data as MarketData, windowSize, sensitivity)
    return {
      values,
      metadata: {
        length: values.length,
        windowSize,
        sensitivity,
        source: config?.source || 'close'
      }
    }
  }
}

/**
 * Calculate chart patterns using wrapper function
 *
 * @param data - Market data with OHLC arrays
 * @param windowSize - Window size for swing detection (default: 5)
 * @param sensitivity - Pattern detection sensitivity (default: 0.1)
 * @returns Array of chart pattern values
 */
export function chartPatterns(data: MarketData, windowSize: number = 5, sensitivity: number = 0.1): number[] {
  return createIndicatorWrapper(ChartPatterns, data, undefined, undefined, { windowSize, sensitivity })
}
