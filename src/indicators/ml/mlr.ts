import { BaseIndicator } from '@core/base/base-indicator'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { calculateMLRCoefficients, calculateStandardDeviation, predictMLR } from '@core/utils/calculation-utils'
import { createIndicatorWrapper } from '@core/utils/indicator-utils'
import { pineLength } from '@core/utils/pine-script-utils'

/**
 * Multiple Linear Regression Indicator
 *
 * Uses machine learning to predict price movements based on multiple features.
 * Combines returns, volatility, momentum, and volume for price prediction.
 *
 * @example
 * ```typescript
 * const mlr = new MultipleLinearRegression()
 * const result = mlr.calculate(marketData, { length: 20, lookback: 10 })
 * console.log(result.values) // Predicted values
 * ```
 */
export class MultipleLinearRegression extends BaseIndicator {
  constructor() {
    super('MultipleLinearRegression', 'Multiple Linear Regression', 'ml')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const length = pineLength(config?.length || 20, 20)
    const lookback = pineLength((config?.['lookback'] as number) || 10, 10)
    if (lookback >= length) {
      throw new Error('Lookback must be less than length')
    }
    const values = this.calculateMLR(data as MarketData, length, lookback)
    return {
      values,
      metadata: {
        length,
        lookback,
        source: config?.source || 'close'
      }
    }
  }

  private calculateMLR(data: MarketData, length: number, lookback: number): number[] {
    const result: number[] = []

    // Process data sequentially to avoid lookahead bias
    for (let i = 0; i < data.close.length; i++) {
      if (i < lookback + length) {
        result.push(NaN)
        continue
      }

      const pastFeatures = this.calculateFeaturesSequential(data, i, lookback)
      const pastPrices = data.close.slice(Math.max(0, i - length), i)

      if (pastFeatures.length < 2 || pastPrices.length < 2) {
        result.push(NaN)
        continue
      }

      // Train model on past data only
      const coefficients = calculateMLRCoefficients(pastFeatures, pastPrices)

      // Calculate current features using only past data
      const currentFeatures = this.calculateCurrentFeatures(data, i, lookback)

      if (currentFeatures && coefficients.length > 0) {
        const prediction = predictMLR(coefficients, currentFeatures)
        result.push(prediction)
      } else {
        result.push(NaN)
      }
    }

    return result
  }

  private calculateFeaturesSequential(data: MarketData, currentIndex: number, lookback: number): number[][] {
    const features: number[][] = []

    // Calculate features for each past data point up to current index
    for (let i = Math.max(lookback, currentIndex - lookback); i < currentIndex; i++) {
      const feature = this.calculateSingleFeature(data, i, lookback)
      features.push(feature)
    }

    return features
  }

  private calculateCurrentFeatures(data: MarketData, currentIndex: number, lookback: number): number[] {
    return this.calculateSingleFeature(data, currentIndex - 1, lookback)
  }

  private calculateSingleFeature(data: MarketData, index: number, lookback: number): number[] {
    if (index < lookback) {
      return [0, 0, 0, 0]
    }

    // Calculate returns for the entire array up to current index
    const returns: number[] = []
    for (let i = 1; i <= index; i++) {
      const currentPrice = data.close[i]
      const prevPrice = data.close[i - 1]
      if (prevPrice !== undefined && currentPrice !== undefined && prevPrice !== 0) {
        returns.push((currentPrice - prevPrice) / prevPrice)
      } else {
        returns.push(0)
      }
    }

    const volatility = this.calculateVolatilitySequential(returns, index, lookback)
    const momentum = this.calculateMomentumSequential(data.close, index, lookback)
    const volume = this.calculateVolumeSequential(data.volume || [], index, lookback)

    const currentReturn = returns[returns.length - 1]
    return [currentReturn !== undefined ? currentReturn : 0, volatility, momentum, volume]
  }

  private calculateVolatilitySequential(returns: number[], index: number, lookback: number): number {
    if (index < lookback) {return 0}

    const windowReturns: number[] = []
    for (let i = Math.max(0, index - lookback + 1); i <= index; i++) {
      const returnValue = returns[i]
      if (returnValue !== undefined) {
        windowReturns.push(returnValue)
      }
    }

    const validReturns = windowReturns.filter(r => !isNaN(r) && isFinite(r))
    if (validReturns.length === 0) {return 0}

    return calculateStandardDeviation(validReturns)
  }

  private calculateMomentumSequential(prices: number[], index: number, lookback: number): number {
    if (index < lookback) {return 0}

    const currentPrice = prices[index]
    const pastPrice = prices[index - lookback]

    return pastPrice !== undefined && currentPrice !== undefined && pastPrice !== 0 ?
      (currentPrice - pastPrice) / pastPrice : 0
  }

  private calculateVolumeSequential(volumes: number[], index: number, lookback: number): number {
    if (index < lookback || volumes.length === 0) {return 0}

    const currentVolume = volumes[index] || 0
    const pastVolume = volumes[index - lookback] || 0

    return pastVolume !== 0 ? (currentVolume - pastVolume) / pastVolume : 0
  }
}

/**
 * Calculate Multiple Linear Regression values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param lookback - Feature lookback period (default: 10)
 * @returns MLR predicted values array
 */
export function multipleLinearRegression(data: MarketData, length?: number, lookback?: number): number[] {
  return createIndicatorWrapper(MultipleLinearRegression, data, length, undefined, { lookback })
}
