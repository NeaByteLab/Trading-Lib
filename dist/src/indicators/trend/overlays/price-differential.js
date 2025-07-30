import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { createPriceComparisonIndicator } from '@core/factories/indicator-factory';
import { calculatePriceDifferential } from '@utils/calculation-utils';
import { validateArray } from '@utils/validation-utils';
/**
 * Calculate Price Differential
 *
 * Calculates the difference between two price series.
 * Useful for spread analysis and relative strength calculations.
 *
 * @param price1 - First price series
 * @param price2 - Second price series
 * @returns Array of price differential values
 * @throws {Error} If price arrays are invalid or have different lengths
 *
 * @example
 * ```typescript
 * const price1 = [100, 102, 104, 103, 105]
 * const price2 = [50, 51, 52, 51.5, 52.5]
 * const differential = priceDifferential(price1, price2)
 * console.log(differential) // Price differential values
 * ```
 */
export function priceDifferential(price1, price2) {
    validateArray(price1);
    validateArray(price2);
    if (price1.length !== price2.length) {
        throw new Error(ERROR_MESSAGES.ARRAY_LENGTH_MISMATCH);
    }
    return calculatePriceDifferential(price1, price2);
}
/**
 * Price Differential Indicator Class
 */
export const PriceDifferentialIndicator = createPriceComparisonIndicator('Price Differential', 'Calculates the difference between two price series', calculatePriceDifferential);
