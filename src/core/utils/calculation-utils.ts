/**
 * Core calculation utilities for technical indicators
 *
 * Provides fundamental calculation functions and re-exports from modular structure.
 * All indicators should use these utilities instead of manual implementations.
 *
 * @example
 * ```typescript
 * import { safeDivision, fillNaN, calculateRangePercentage } from '@utils/calculation-utils'
 * import { calculateRSI, calculateCCI } from '@utils/calculations'
 *
 * const result = safeDivision(numerator, denominator)
 * const rsi = calculateRSI(data.close, 14)
 * ```
 */

// Re-export all calculation functions from modular structure
export * from './calculations'

import { ERROR_MESSAGES } from '@constants/indicator-constants'
import { ArrayUtils } from '@core/utils/array-utils'
import { MathUtils } from '@core/utils/math-utils'

/**
 * Safe division with numerical stability
 *
 * @param numerator - Numerator value
 * @param denominator - Denominator value
 * @param fallback - Fallback value if division by zero
 * @returns Division result or fallback
 */
export function safeDivision(numerator: number, denominator: number, fallback: number = 0): number {
  if (denominator === 0 || isNaN(denominator) || !isFinite(denominator)) {
    return fallback
  }
  if (!isFinite(numerator)) {
    return fallback
  }
  const result = numerator / denominator
  return isFinite(result) ? result : fallback
}

/**
 * Fill NaN values with specified value
 *
 * @param data - Source array
 * @param fillValue - Value to fill NaN with
 * @returns Array with filled values
 */
export function fillNaN(data: number[], fillValue: number): number[] {
  return ArrayUtils.processArray(data, (value) => {
    return isNaN(value) ? fillValue : value
  })
}

/**
 * Shift array by specified amount
 *
 * @param data - Source array
 * @param offset - Shift amount
 * @returns Shifted array
 */
export function shiftArray(data: number[], offset: number): number[] {
  return ArrayUtils.shift(data, offset)
}

/**
 * Calculate range percentage
 *
 * @param value - Current value
 * @param min - Minimum value
 * @param max - Maximum value
 * @param multiplier - Multiplier for percentage (default: 100)
 * @returns Range percentage
 */
export function calculateRangePercentage(value: number, min: number, max: number, multiplier: number = 100): number {
  if (max === min) {
    return 0
  }
  return safeDivision(value - min, max - min) * multiplier
}

/**
 * Calculate Price Percentage Change using centralized utilities
 *
 * @param current - Current price
 * @param previous - Previous price
 * @returns Percentage change
 */
export function calculatePricePercentageChange(current: number, previous: number): number {
  if (previous === 0) {
    return NaN
  }
  return ((current - previous) / previous) * 100
}

/**
 * Calculate Price Comparison using centralized utilities
 *
 * @param price1 - First price series
 * @param price2 - Second price series
 * @param basePrice - Base price for comparison
 * @returns Comparison metrics
 */
const ARRAYS_LENGTH_MISMATCH = 'Price arrays must have the same length'

export function calculatePriceComparison(
  price1: number[],
  price2: number[],
  basePrice: number = 100
): {
  ratio: number[]
  performance: number[]
  correlation: number
} {
  if (price1.length !== price2.length) {
    throw new Error(ARRAYS_LENGTH_MISMATCH)
  }
  const ratio = ArrayUtils.processArray(price1, (val1, i) => {
    const val2 = price2[i]!
    if (val2 === 0) {
      return NaN
    }
    return (val1 / val2) * basePrice
  })
  const performance = ArrayUtils.processArray(price1, (val1, i) => {
    const val2 = price2[i]!
    return calculatePricePercentageChange(val1, val2)
  })
  const validRatio = ratio.filter(val => !isNaN(val))
  const validPerformance = performance.filter(val => !isNaN(val))
  const correlation = validRatio.length > 1 ? MathUtils.correlation(validRatio, validPerformance) : 0
  return { ratio, performance, correlation }
}

/**
 * Calculate Price Differential using centralized utilities
 *
 * @param price1 - First price series
 * @param price2 - Second price series
 * @returns Price differential values
 */
export function calculatePriceDifferential(price1: number[], price2: number[]): number[] {
  if (price1.length !== price2.length) {
    throw new Error(ARRAYS_LENGTH_MISMATCH)
  }
  return ArrayUtils.processArray(price1, (val1, i) => {
    const val2 = price2[i]!
    return val1 - val2
  })
}

/**
 * Calculate Price Ratio using centralized utilities
 *
 * @param price1 - First price series
 * @param price2 - Second price series
 * @returns Price ratio values
 */
export function calculatePriceRatio(price1: number[], price2: number[]): number[] {
  if (price1.length !== price2.length) {
    throw new Error(ARRAYS_LENGTH_MISMATCH)
  }
  return ArrayUtils.processArray(price1, (val1, i) => {
    const val2 = price2[i]!
    if (val2 === 0) {
      return NaN
    }
    return val1 / val2
  })
}

/**
 * Calculate Multiple Linear Regression coefficients using centralized utilities
 *
 * @param features - Feature matrix
 * @param prices - Target prices array
 * @returns MLR coefficients array
 * @throws {Error} If data is empty or invalid
 */
export function calculateMLRCoefficients(features: number[][], prices: number[]): number[] {
  if (!features || features.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (!prices || prices.length === 0) {
    throw new Error('Prices array cannot be empty')
  }
  const n = features.length
  const p = features[0]?.length || 0
  if (n === 0 || p === 0) {
    return []
  }
  const X = features.map(row => [1, ...row])
  const y = prices
  const XT = MathUtils.transpose(X)
  const XTX = MathUtils.multiply(XT, X)
  const XTy = MathUtils.multiply(XT, y.map(val => [val]))
  const coefficients = MathUtils.solveLinearSystem(XTX, XTy)
  return coefficients.map(row => row[0]).filter((val): val is number => val !== undefined)
}

/**
 * Predict value using MLR coefficients and features
 *
 * @param coefficients - MLR coefficients array
 * @param features - Feature array
 * @returns Predicted value
 */
export function predictMLR(coefficients: number[], features: number[]): number {
  if (coefficients.length === 0) {
    return 0
  }
  let prediction = coefficients[0] || 0
  prediction += MathUtils.sum(features.map((feature, i) => (coefficients[i + 1] || 0) * feature))
  return prediction
}

/**
 * Calculate Bayesian probability using logistic function
 *
 * @param features - Array of feature values
 * @param weights - Array of weights
 * @param bias - Bias term
 * @returns Probability value (0-1)
 */
export function calculateBayesianProbability(features: number[], weights: number[], bias: number): number {
  const sum = features.reduce((acc, feature, i) => acc + (weights[i] || 0) * feature, bias)
  return 1 / (1 + Math.exp(-sum))
}

/**
 * Filter valid values from array (non-NaN, finite, non-zero)
 *
 * @param values - Array of values
 * @returns Filtered array of valid values
 */
export function filterValidValues(values: number[]): number[] {
  return values.filter(val => !isNaN(val) && isFinite(val) && val !== 0)
}

/**
 * Filter valid values from array (non-NaN, finite)
 *
 * @param values - Array of values
 * @returns Filtered array of valid values
 */
export function filterFiniteValues(values: number[]): number[] {
  return values.filter(val => !isNaN(val) && isFinite(val))
}

/**
 * Transform array values to finite or NaN
 *
 * @param values - Array of values
 * @returns Transformed array
 */
export function transformToFinite(values: number[]): number[] {
  return values.map(val => isFinite(val) ? val : NaN)
}

/**
 * Create array with predictions and fill with NaN
 *
 * @param length - Array length
 * @param predictions - Predictions array
 * @returns Filled array
 */
export function createPredictionArray(length: number, predictions: number[]): number[] {
  return Array(length).fill(NaN).map((_, i) => predictions[i] || NaN)
}

/**
 * Process sequential predictions with lookback validation
 *
 * @param dataLength - Total data length
 * @param lookback - Lookback period
 * @param length - Calculation length
 * @param predictionFn - Prediction function
 * @returns Array of predictions
 */
export function processSequentialPredictions(
  dataLength: number,
  lookback: number,
  length: number,
  predictionFn: (index: number) => number | null
): number[] {
  const predictions: number[] = []
  for (let i = lookback; i < dataLength; i++) {
    if (i < length) {
      predictions.push(NaN)
      continue
    }
    const prediction = predictionFn(i)
    predictions.push(prediction !== null ? prediction : NaN)
  }
  return createPredictionArray(dataLength, predictions)
}

/**
 * Extract property from result objects
 *
 * @param results - Array of result objects
 * @param property - Property name to extract
 * @returns Array of property values
 */
export function extractResultProperty<T>(results: T[], property: keyof T): unknown[] {
  return results.map(r => r[property])
}

/**
 * Extract multiple properties from result objects
 *
 * @param results - Array of result objects
 * @param properties - Array of property names to extract
 * @returns Object with arrays of property values
 */
export function extractResultProperties<T>(results: T[], properties: (keyof T)[]): Record<string, unknown[]> {
  const extracted: Record<string, unknown[]> = {}
  properties.forEach(prop => {
    extracted[prop as string] = results.map(r => r[prop])
  })
  return extracted
}

/**
 * Calculate window average with validation
 *
 * @param window - Array of values
 * @returns Average of valid values or NaN
 */
export function calculateWindowAverage(window: number[]): number {
  const validValues = window.filter(val => !isNaN(val) && isFinite(val))
  if (validValues.length === 0) {
    return NaN
  }
  return validValues.reduce((sum, val) => sum + val, 0) / validValues.length
}

/**
 * Calculate window sum with validation
 *
 * @param window - Array of values
 * @returns Sum of valid values or 0
 */
export function calculateWindowSum(window: number[]): number {
  const validValues = window.filter(val => !isNaN(val) && isFinite(val))
  return validValues.reduce((sum, val) => sum + val, 0)
}

/**
 * Handle NaN values in indicator results
 *
 * @param values - Array of indicator values
 * @param fillValue - Value to replace NaN with (default: 0)
 * @returns Array with NaN values replaced
 */
export function handleNaNValues(values: number[], fillValue: number = 0): number[] {
  return values.map(value => isNaN(value) || !isFinite(value) ? fillValue : value)
}

/**
 * Get valid indicator values (remove NaN and infinite values)
 *
 * @param values - Array of indicator values
 * @returns Array with only valid finite values
 */
export function getValidValues(values: number[]): number[] {
  return values.filter(value => !isNaN(value) && isFinite(value))
}

/**
 * Check if indicator result is valid
 *
 * @param values - Array of indicator values
 * @returns True if all values are valid
 */
export function isValidIndicatorResult(values: number[]): boolean {
  return values.every(value => !isNaN(value) && isFinite(value))
}

/**
 * Get indicator statistics
 *
 * @param values - Array of indicator values
 * @returns Statistics object
 */
export function getIndicatorStatistics(values: number[]): {
  validCount: number
  totalCount: number
  validPercentage: number
  hasNaN: boolean
  hasInfinite: boolean
} {
  const validValues = getValidValues(values)
  const totalCount = values.length
  const validCount = validValues.length
  const hasNaN = values.some(v => isNaN(v))
  const hasInfinite = values.some(v => !isFinite(v))

  return {
    validCount,
    totalCount,
    validPercentage: totalCount > 0 ? (validCount / totalCount) * 100 : 0,
    hasNaN,
    hasInfinite
  }
}
