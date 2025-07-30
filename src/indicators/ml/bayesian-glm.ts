import { ERROR_MESSAGES } from '@core/constants/indicator-constants'
import type { MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@core/utils/array-utils'
import { calculateBayesianProbability, calculateStandardDeviation } from '@core/utils/calculation-utils'
import { MathUtils } from '@core/utils/math-utils'
import { sanitizeArray } from '@core/utils/validation-utils'

/**
 * Calculate features for Bayesian GLM
 *
 * @param data - Market data
 * @param currentIndex - Current index position
 * @param lookback - Lookback period
 * @returns Array of feature values
 */
function calculateFeatures(data: MarketData, currentIndex: number, lookback: number): number[] {
  // Use ONLY past data up to currentIndex - 1 to avoid lookahead bias
  const startIndex = Math.max(0, currentIndex - lookback)
  const endIndex = currentIndex - 1

  if (endIndex < startIndex || endIndex < 0) {
    return [0, 0, 0, 0]
  }

  const window = data.close.slice(startIndex, endIndex + 1)
  const validWindow = sanitizeArray(window)

  if (validWindow.length < 2) {
    return [0, 0, 0, 0]
  }

  // Calculate returns using only past data
  const returns: number[] = []
  for (let i = 1; i < validWindow.length; i++) {
    const prevPrice = validWindow[i - 1]
    const currentPrice = validWindow[i]
    if (prevPrice !== undefined && currentPrice !== undefined && prevPrice !== 0) {
      returns.push((currentPrice - prevPrice) / prevPrice)
    } else {
      returns.push(0)
    }
  }

  const meanReturn = MathUtils.average(returns)
  const volatility = calculateStandardDeviation(returns)
  const lastPrice = validWindow[validWindow.length - 1]
  const firstPrice = validWindow[0]
  const momentum = lastPrice !== undefined && firstPrice !== undefined && firstPrice !== 0 ?
    (lastPrice - firstPrice) / firstPrice : 0
  const range = MathUtils.max(validWindow) !== MathUtils.min(validWindow) ?
    (MathUtils.max(validWindow) - MathUtils.min(validWindow)) / MathUtils.average(validWindow) : 0

  return [meanReturn, volatility, momentum, range]
}

/**
 * Calculate Bayesian probability using logistic function
 *
 * Note: This is a simplified implementation. For production use,
 * consider implementing proper Bayesian inference with:
 * - Historical data training
 * - Dynamic weight updates
 * - Proper statistical modeling
 *
 * @param features - Array of feature values
 * @returns Probability value (0-1)
 */
function calculateBayesianProbabilityWrapper(features: number[]): number {
  const weights = [0.3, -0.2, 0.4, -0.1]
  const bias = 0.1
  return calculateBayesianProbability(features, weights, bias)
}

/**
 * Bayesian GLM Signal Generator
 *
 * Uses Bayesian Generalized Linear Model to generate trading signals
 * based on price momentum and volatility features.
 *
 * @param data - Market data with OHLCV
 * @param lookback - Lookback period for feature calculation (default: 20)
 * @param threshold - Signal threshold (default: 0.5)
 * @returns Array of signal values (-1, 0, 1)
 * @throws {Error} If data is invalid or missing required fields
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const signals = ta.bayesianGlm(marketData, 20, 0.5)
 * ```
 */
export function bayesianGLM(data: MarketData, lookback: number = 20, threshold: number = 0.5): number[] {
  if (!data || !data.close || data.close.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (lookback <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  if (threshold < 0 || threshold > 1) {
    throw new Error('Threshold must be between 0 and 1')
  }
  return ArrayUtils.processArray(data.close, (_, i) => {
    // Ensure we have enough past data before calculating
    if (i < lookback) {
      return 0
    }
    // Use current index for prediction (features calculated from past data)
    const features = calculateFeatures(data, i, lookback)
    const probability = calculateBayesianProbabilityWrapper(features)
    return probability > threshold ? 1 : probability < (1 - threshold) ? -1 : 0
  })
}

/**
 * Bayesian GLM Class Implementation
 */
export class BayesianGLMIndicator {
  constructor(private lookback: number = 20, private threshold: number = 0.5) {}

  /**
   * Calculate Bayesian GLM signals
   *
   * @param data - Market data
   * @returns Array of signal values
   */
  calculate(data: MarketData): number[] {
    return bayesianGLM(data, this.lookback, this.threshold)
  }
}
