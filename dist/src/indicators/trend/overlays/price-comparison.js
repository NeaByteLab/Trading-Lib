import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { createPriceComparisonIndicator } from '@core/factories/indicator-factory';
import { calculatePriceComparison } from '@utils/calculation-utils';
import { validateArray } from '@utils/validation-utils';
/**
 * Calculate Price Comparison
 *
 * Compares two price series and calculates relative performance.
 * Useful for comparing different assets or timeframes.
 *
 * @param price1 - First price series
 * @param price2 - Second price series
 * @param basePrice - Base price for comparison (default: 100)
 * @returns Object with comparison metrics
 * @throws {Error} If price arrays are invalid or have different lengths
 *
 * @example
 * ```typescript
 * const price1 = [100, 102, 104, 103, 105]
 * const price2 = [50, 51, 52, 51.5, 52.5]
 * const comparison = priceComparison(price1, price2, 100)
 * console.log(comparison.ratio) // Price ratio
 * console.log(comparison.performance) // Relative performance
 * ```
 */
export function priceComparison(price1, price2, basePrice = 100) {
    validateArray(price1);
    validateArray(price2);
    if (price1.length !== price2.length) {
        throw new Error(ERROR_MESSAGES.ARRAY_LENGTH_MISMATCH);
    }
    return calculatePriceComparison(price1, price2, basePrice);
}
/**
 * Price Comparison Indicator Class
 */
export const PriceComparisonIndicator = createPriceComparisonIndicator('Price Comparison', 'Compares two price series and calculates relative performance', calculatePriceComparison);
