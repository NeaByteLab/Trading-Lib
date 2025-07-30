import { createPivotIndicator } from '@core/factories/indicator-factory';
import { calculatePivotPoints } from '@utils/calculation-utils';
import { validateIndicatorData } from '@utils/validation-utils';
/**
 * Calculate standard pivot points and support/resistance levels using centralized utilities
 *
 * @param data - Market data with OHLC values
 * @returns Object with pivot point levels
 * @throws {Error} If market data is invalid
 */
export function pivotPoints(data) {
    validateIndicatorData(data);
    return calculatePivotPoints(data.high, data.low, data.close);
}
/**
 * Pivot Points Indicator
 *
 * Calculates standard pivot points and support/resistance levels
 * based on the previous period's high, low, and close prices.
 *
 * @example
 * ```typescript
 * const pivots = new PivotPointsIndicator()
 * const result = pivots.calculate(marketData)
 * console.log(result.values) // Pivot point values
 * console.log(result.metadata.r1) // Resistance 1 values
 * console.log(result.metadata.s1) // Support 1 values
 * ```
 */
export const PivotPointsIndicator = createPivotIndicator('Pivot Points', 'Standard pivot points and support/resistance levels', calculatePivotPoints);
/**
 * Calculate pivot points using wrapper function
 *
 * @param data - Market data with OHLC values
 * @returns Object with pivot point levels
 */
export function pivots(data) {
    return pivotPoints(data);
}
