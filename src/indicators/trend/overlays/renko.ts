import { BaseIndicator } from '@core/base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { MathUtils } from '@core/utils/math-utils'
import { pineSource } from '@core/utils/pine-script-utils'

/**
 * Renko Chart Generator
 *
 * Generates Renko bricks from price data.
 *
 * @param data - MarketData or price array
 * @param brickSize - Size of each Renko brick (default: auto, 1% of price range)
 * @param source - Price source (default: 'close')
 * @returns Array of Renko brick values
 *
 * @example
 * ```typescript
 * const renko = renkoChart(data, 2)
 * // renko[i] = value of Renko brick at i
 * ```
 */
export class RenkoChartIndicator extends BaseIndicator {
  constructor() {
    super('RenkoChart', 'Renko Chart', 'trend')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig & { brickSize?: number }): IndicatorResult {
    this.validateInput(data, config)
    const source = pineSource(data, config?.source)
    const brickSize = config?.brickSize || (MathUtils.max(source) - MathUtils.min(source)) * 0.01
    if (!brickSize || brickSize <= 0) {throw new Error('Invalid brick size')}
    const bricks: number[] = []
    let lastBrick = source[0]!
    for (let i = 1; i < source.length; i++) {
      const diff = source[i]! - lastBrick
      if (Math.abs(diff) >= brickSize) {
        lastBrick += brickSize * Math.sign(diff)
        bricks.push(lastBrick)
      } else {
        bricks.push(bricks.length ? bricks[bricks.length - 1]! : lastBrick)
      }
    }
    return {
      values: bricks,
      metadata: {
        length: bricks.length,
        source: config?.source || 'close',
        brickSize
      }
    }
  }
}

export function renkoChart(data: MarketData | number[], brickSize?: number, source?: string): number[] {
  const indicator = new RenkoChartIndicator()
  const config: IndicatorConfig & { brickSize?: number } = {}

  if (brickSize !== undefined) {config.brickSize = brickSize}
  if (source !== undefined) {config.source = source}

  const result = indicator.calculate(data, config)
  return result.values
}
