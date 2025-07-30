import { OscillatorIndicator } from '@base/oscillator-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { MathUtils } from '@utils/math-utils'
import { pineLength, pineSource } from '@utils/pine-script-utils'
import { validateAndSanitizeWindow } from '@utils/validation-utils'

/**
 * Calculate log returns from price data
 *
 * @param prices - Array of prices
 * @returns Array of log returns
 */
function calculateLogReturns(prices: number[]): number[] {
  return ArrayUtils.processArray(prices.slice(1), (currentPrice, i) => {
    const previousPrice = prices[i]!
    if (isNaN(currentPrice) || isNaN(previousPrice) || previousPrice <= 0) {
      return NaN
    }
    return MathUtils.log(currentPrice / previousPrice)
  })
}

/**
 * Calculate Shannon Entropy using centralized utilities
 *
 * @param data - Source data array
 * @param length - Calculation period
 * @param bins - Number of bins for discretization
 * @returns Shannon entropy values array
 */
function calculateShannonEntropy(data: number[], length: number, bins: number = 8): number[] {
  return ArrayUtils.processValidWindow(data, length, (window) => {
    const validValues = validateAndSanitizeWindow(window)
    if (validValues.length === 0) {
      return NaN
    }
    const returns = calculateLogReturns(validValues)
    const validReturns = returns.filter(r => !isNaN(r))
    if (validReturns.length === 0) {
      return NaN
    }
    const minReturn = MathUtils.min(validReturns)
    const maxReturn = MathUtils.max(validReturns)
    const binSize = (maxReturn - minReturn) / bins
    if (binSize === 0) {
      return 0
    }
    const binCounts = new Array(bins).fill(0)
    for (const ret of validReturns) {
      const binIndex = MathUtils.min([MathUtils.floor((ret - minReturn) / binSize), bins - 1])
      binCounts[binIndex]++
    }
    let entropy = 0
    for (const count of binCounts) {
      if (count > 0) {
        const probability = count / validReturns.length
        entropy -= probability * MathUtils.log2(probability)
      }
    }
    return entropy
  })
}

/**
 * Shannon Entropy Indicator
 *
 * Calculates information entropy of price returns to measure market randomness.
 * Higher entropy indicates more random/unpredictable price movements.
 * Formula: H = -Σ(p(i) * log2(p(i))) where p(i) is probability of return in bin i
 *
 * @example
 * ```typescript
 * const shannon = new ShannonEntropyIndicator()
 * const result = shannon.calculate(marketData, { length: 20, bins: 8 })
 * console.log(result.values) // Entropy values
 * ```
 */
export class ShannonEntropyIndicator extends OscillatorIndicator {
  constructor() {
    super('ShannonEntropyIndicator', 'Shannon Entropy', 20, 1)
  }

  protected calculateOscillator(data: number[], length: number): number[] {
    const bins = 8
    return calculateShannonEntropy(data, length, bins)
  }

  override calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const source = pineSource(data, config?.source)
    const length = pineLength(config?.length || 20, 20)
    const bins = (config?.['bins'] as number) || 8
    const values = calculateShannonEntropy(source, length, bins)
    return {
      values,
      metadata: {
        length,
        bins,
        source: config?.source || 'close'
      }
    }
  }
}

/**
 * Calculate Shannon Entropy using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param bins - Number of bins for discretization (default: 8)
 * @param source - Price source (default: 'close')
 * @returns Shannon entropy values array
 */
export function shannon(
  data: MarketData | number[],
  length?: number,
  bins?: number,
  source?: string
): number[] {
  return createIndicatorWrapper(ShannonEntropyIndicator, data, length, source, { bins })
}
