import { BaseIndicator } from '@base/base-indicator'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'


/**
 * Zig Zag point structure
 */
export interface ZigZagPoint {
  index: number
  value: number
  type: 'high' | 'low'
}

/**
 * Calculate Zig Zag indicator
 * Connects significant highs and lows to filter out market noise
 *
 * @param data - Market data with high and low arrays
 * @param deviation - Minimum deviation percentage (default: 5)
 * @param depth - Minimum number of bars between swings (default: 12)
 * @returns Object with zigzag values and swing points
 */
function calculateZigZag(
  data: MarketData,
  deviation: number = 5,
  depth: number = 12
): { values: number[]; swings: ZigZagPoint[] } {
  const { high, low } = data

  if (high.length === 0 || low.length === 0) {
    return { values: [], swings: [] }
  }

  const swings: ZigZagPoint[] = []
  const values: number[] = new Array(high.length).fill(NaN)

  // Find initial swing point
  let currentIndex = depth
  const isHigh = high[currentIndex]! > low[currentIndex]!
  let currentPoint: ZigZagPoint

  // Find first significant swing
  if (isHigh) {
    const maxIndex = findLocalMaximum(high, currentIndex, depth)
    currentPoint = { index: maxIndex, value: high[maxIndex]!, type: 'high' }
  } else {
    const minIndex = findLocalMinimum(low, currentIndex, depth)
    currentPoint = { index: minIndex, value: low[minIndex]!, type: 'low' }
  }

  swings.push(currentPoint)
  values[currentPoint.index] = currentPoint.value

  // Find subsequent swing points
  while (currentIndex < high.length - depth) {
    const nextPoint = findNextSwingPoint(high, low, currentPoint, deviation, depth)

    if (nextPoint) {
      swings.push(nextPoint)
      values[nextPoint.index] = nextPoint.value
      currentPoint = nextPoint
    }

    currentIndex++
  }

  // Connect swing points with lines
  for (let i = 1; i < swings.length; i++) {
    const prev = swings[i - 1]!
    const curr = swings[i]!

    // Linear interpolation between swing points
    const slope = (curr.value - prev.value) / (curr.index - prev.index)

    for (let j = prev.index + 1; j < curr.index; j++) {
      values[j] = prev.value + slope * (j - prev.index)
    }
  }

  return { values, swings }
}

/**
 * Find local maximum within window
 *
 * @param data - Price data array
 * @param centerIndex - Center index of window
 * @param windowSize - Window size
 * @returns Index of local maximum
 */
function findLocalMaximum(data: number[], centerIndex: number, windowSize: number): number {
  const start = Math.max(0, centerIndex - windowSize)
  const end = Math.min(data.length - 1, centerIndex + windowSize)

  let maxIndex = start
  let maxValue = data[start]!

  for (let i = start + 1; i <= end; i++) {
    if (data[i]! > maxValue) {
      maxValue = data[i]!
      maxIndex = i
    }
  }

  return maxIndex
}

/**
 * Find local minimum within window
 *
 * @param data - Price data array
 * @param centerIndex - Center index of window
 * @param windowSize - Window size
 * @returns Index of local minimum
 */
function findLocalMinimum(data: number[], centerIndex: number, windowSize: number): number {
  const start = Math.max(0, centerIndex - windowSize)
  const end = Math.min(data.length - 1, centerIndex + windowSize)

  let minIndex = start
  let minValue = data[start]!

  for (let i = start + 1; i <= end; i++) {
    if (data[i]! < minValue) {
      minValue = data[i]!
      minIndex = i
    }
  }

  return minIndex
}

/**
 * Find next swing point based on current swing
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param currentPoint - Current swing point
 * @param deviation - Minimum deviation percentage
 * @param depth - Minimum bars between swings
 * @returns Next swing point or null
 */
function findNextSwingPoint(
  high: number[],
  low: number[],
  currentPoint: ZigZagPoint,
  deviation: number,
  depth: number
): ZigZagPoint | null {
  const startIndex = currentPoint.index + depth
  const deviationThreshold = currentPoint.value * (deviation / 100)

  if (currentPoint.type === 'high') {
    // Look for next low
    for (let i = startIndex; i < low.length - depth; i++) {
      const minIndex = findLocalMinimum(low, i, depth)
      const minValue = low[minIndex]!

      if (currentPoint.value - minValue >= deviationThreshold) {
        return { index: minIndex, value: minValue, type: 'low' }
      }
    }
  } else {
    // Look for next high
    for (let i = startIndex; i < high.length - depth; i++) {
      const maxIndex = findLocalMaximum(high, i, depth)
      const maxValue = high[maxIndex]!

      if (maxValue - currentPoint.value >= deviationThreshold) {
        return { index: maxIndex, value: maxValue, type: 'high' }
      }
    }
  }

  return null
}

/**
 * Zig Zag Indicator
 *
 * Connects significant highs and lows to filter out market noise.
 * Uses deviation and depth parameters to identify meaningful swing points.
 * Helps identify trend direction and support/resistance levels.
 *
 * @example
 * ```typescript
 * const zigzag = new ZigZag()
 * const result = zigzag.calculate(marketData, { deviation: 5, depth: 12 })
 * console.log(result.values) // Zig Zag values
 * console.log(result.metadata.swings) // Swing points
 * ```
 */
export class ZigZag extends BaseIndicator {
  constructor() {
    super('ZigZag', 'Zig Zag', 'trend')
  }

  override validateInput(data: MarketData | number[], config?: IndicatorConfig): void {
    if (Array.isArray(data)) {
      throw new Error(ERROR_MESSAGES.MISSING_OHLC)
    }
    const deviation = (config?.['deviation'] as number) || 5
    const depth = (config?.['depth'] as number) || 12

    if (deviation <= 0 || depth <= 0) {
      throw new Error('Deviation and depth must be positive')
    }
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const deviation = (config?.['deviation'] as number) || 5
    const depth = (config?.['depth'] as number) || 12

    const { values, swings } = calculateZigZag(data as MarketData, deviation, depth)

    return {
      values,
      metadata: {
        length: values.length,
        deviation,
        depth,
        swings: swings as unknown as number[],
        source: config?.source || 'close'
      }
    }
  }
}

/**
 * Calculate Zig Zag using wrapper function
 *
 * @param data - Market data with OHLC arrays
 * @param deviation - Minimum deviation percentage (default: 5)
 * @param depth - Minimum number of bars between swings (default: 12)
 * @returns Object with zigzag values and swing points
 */
export function zigZag(
  data: MarketData,
  deviation: number = 5,
  depth: number = 12
): { values: number[]; swings: ZigZagPoint[] } {
  const indicator = new ZigZag()
  const config: IndicatorConfig = { deviation, depth }
  const result = indicator.calculate(data, config)

  return {
    values: result.values,
    swings: result.metadata['swings'] as unknown as ZigZagPoint[]
  }
}
