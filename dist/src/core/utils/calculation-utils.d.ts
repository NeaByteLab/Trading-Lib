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
export * from './calculations';
/**
 * Safe division with numerical stability
 *
 * @param numerator - Numerator value
 * @param denominator - Denominator value
 * @param fallback - Fallback value if division by zero
 * @returns Division result or fallback
 */
export declare function safeDivision(numerator: number, denominator: number, fallback?: number): number;
/**
 * Fill NaN values with specified value
 *
 * @param data - Source array
 * @param fillValue - Value to fill NaN with
 * @returns Array with filled values
 */
export declare function fillNaN(data: number[], fillValue: number): number[];
/**
 * Shift array by specified amount
 *
 * @param data - Source array
 * @param offset - Shift amount
 * @returns Shifted array
 */
export declare function shiftArray(data: number[], offset: number): number[];
/**
 * Calculate range percentage
 *
 * @param value - Current value
 * @param min - Minimum value
 * @param max - Maximum value
 * @param multiplier - Multiplier for percentage (default: 100)
 * @returns Range percentage
 */
export declare function calculateRangePercentage(value: number, min: number, max: number, multiplier?: number): number;
/**
 * Calculate Price Percentage Change using centralized utilities
 *
 * @param current - Current price
 * @param previous - Previous price
 * @returns Percentage change
 */
export declare function calculatePricePercentageChange(current: number, previous: number): number;
export declare function calculatePriceComparison(price1: number[], price2: number[], basePrice?: number): {
    ratio: number[];
    performance: number[];
    correlation: number;
};
/**
 * Calculate Price Differential using centralized utilities
 *
 * @param price1 - First price series
 * @param price2 - Second price series
 * @returns Price differential values
 */
export declare function calculatePriceDifferential(price1: number[], price2: number[]): number[];
/**
 * Calculate Price Ratio using centralized utilities
 *
 * @param price1 - First price series
 * @param price2 - Second price series
 * @returns Price ratio values
 */
export declare function calculatePriceRatio(price1: number[], price2: number[]): number[];
/**
 * Calculate Multiple Linear Regression coefficients using centralized utilities
 *
 * @param features - Feature matrix
 * @param prices - Target prices array
 * @returns MLR coefficients array
 * @throws {Error} If data is empty or invalid
 */
export declare function calculateMLRCoefficients(features: number[][], prices: number[]): number[];
/**
 * Predict value using MLR coefficients and features
 *
 * @param coefficients - MLR coefficients array
 * @param features - Feature array
 * @returns Predicted value
 */
export declare function predictMLR(coefficients: number[], features: number[]): number;
/**
 * Calculate Bayesian probability using logistic function
 *
 * @param features - Array of feature values
 * @param weights - Array of weights
 * @param bias - Bias term
 * @returns Probability value (0-1)
 */
export declare function calculateBayesianProbability(features: number[], weights: number[], bias: number): number;
/**
 * Filter valid values from array (non-NaN, finite, non-zero)
 *
 * @param values - Array of values
 * @returns Filtered array of valid values
 */
export declare function filterValidValues(values: number[]): number[];
/**
 * Filter valid values from array (non-NaN, finite)
 *
 * @param values - Array of values
 * @returns Filtered array of valid values
 */
export declare function filterFiniteValues(values: number[]): number[];
/**
 * Transform array values to finite or NaN
 *
 * @param values - Array of values
 * @returns Transformed array
 */
export declare function transformToFinite(values: number[]): number[];
/**
 * Create array with predictions and fill with NaN
 *
 * @param length - Array length
 * @param predictions - Predictions array
 * @returns Filled array
 */
export declare function createPredictionArray(length: number, predictions: number[]): number[];
/**
 * Process sequential predictions with lookback validation
 *
 * @param dataLength - Total data length
 * @param lookback - Lookback period
 * @param length - Calculation length
 * @param predictionFn - Prediction function
 * @returns Array of predictions
 */
export declare function processSequentialPredictions(dataLength: number, lookback: number, length: number, predictionFn: (index: number) => number | null): number[];
/**
 * Extract property from result objects
 *
 * @param results - Array of result objects
 * @param property - Property name to extract
 * @returns Array of property values
 */
export declare function extractResultProperty<T>(results: T[], property: keyof T): unknown[];
/**
 * Extract multiple properties from result objects
 *
 * @param results - Array of result objects
 * @param properties - Array of property names to extract
 * @returns Object with arrays of property values
 */
export declare function extractResultProperties<T>(results: T[], properties: (keyof T)[]): Record<string, unknown[]>;
/**
 * Calculate window average with validation
 *
 * @param window - Array of values
 * @returns Average of valid values or NaN
 */
export declare function calculateWindowAverage(window: number[]): number;
/**
 * Calculate window sum with validation
 *
 * @param window - Array of values
 * @returns Sum of valid values or 0
 */
export declare function calculateWindowSum(window: number[]): number;
/**
 * Handle NaN values in indicator results
 *
 * @param values - Array of indicator values
 * @param fillValue - Value to replace NaN with (default: 0)
 * @returns Array with NaN values replaced
 */
export declare function handleNaNValues(values: number[], fillValue?: number): number[];
/**
 * Get valid indicator values (remove NaN and infinite values)
 *
 * @param values - Array of indicator values
 * @returns Array with only valid finite values
 */
export declare function getValidValues(values: number[]): number[];
/**
 * Check if indicator result is valid
 *
 * @param values - Array of indicator values
 * @returns True if all values are valid
 */
export declare function isValidIndicatorResult(values: number[]): boolean;
/**
 * Get indicator statistics
 *
 * @param values - Array of indicator values
 * @returns Statistics object
 */
export declare function getIndicatorStatistics(values: number[]): {
    validCount: number;
    totalCount: number;
    validPercentage: number;
    hasNaN: boolean;
    hasInfinite: boolean;
};
//# sourceMappingURL=calculation-utils.d.ts.map