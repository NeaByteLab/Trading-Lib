import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { createPriceComparisonIndicator } from '@core/factories/indicator-factory';
import { calculatePriceRatio } from '@utils/calculation-utils';
import { validateArray } from '@utils/validation-utils';
/**
 * Calculate Price Ratio
 *
 * Calculates the ratio between two price series.
 * Useful for relative strength analysis and spread trading.
 *
 * @param price1 - First price series
 * @param price2 - Second price series
 * @returns Array of price ratio values
 * @throws {Error} If price arrays are invalid or have different lengths
 *
 * @example
 * ```typescript
 * const price1 = [100, 102, 104, 103, 105]
 * const price2 = [50, 51, 52, 51.5, 52.5]
 * const ratio = priceRatio(price1, price2)
 * console.log(ratio) // Price ratio values
 * ```
 */
export function priceRatio(price1, price2) {
    validateArray(price1);
    validateArray(price2);
    if (price1.length !== price2.length) {
        throw new Error(ERROR_MESSAGES.ARRAY_LENGTH_MISMATCH);
    }
    return calculatePriceRatio(price1, price2);
}
/**
 * Price Ratio Indicator Class
 */
export const PriceRatioIndicator = createPriceComparisonIndicator('Price Ratio', 'Calculates the ratio between two price series', calculatePriceRatio);
