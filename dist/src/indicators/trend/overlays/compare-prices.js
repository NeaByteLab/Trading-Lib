import { BaseIndicator } from '@base/base-indicator';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { calculatePriceComparison } from '@utils/calculation-utils';
/**
 * Calculate Compare Prices
 *
 * Compares two price series and calculates ratio, performance, and correlation.
 * Formula: Ratio = Price1 / Price2, Performance = (Price1 - Price2) / Price2 * 100
 *
 * @param price1 - First price array
 * @param price2 - Second price array
 * @param basePrice - Base price for comparison (default: 100)
 * @returns Comparison results
 */
function calculateComparePrices(price1, price2, basePrice = 100) {
    return calculatePriceComparison(price1, price2, basePrice);
}
/**
 * Compare Prices Indicator
 *
 * Compares two price series to analyze their relative performance.
 * Provides ratio, performance percentage, and correlation coefficient.
 *
 * @example
 * ```typescript
 * const compare = new ComparePrices()
 * const result = compare.calculate([price1, price2], { basePrice: 100 })
 * console.log(result.values) // Ratio values
 * console.log(result.metadata.performance) // Performance values
 * console.log(result.metadata.correlation) // Correlation coefficient
 * ```
 */
export class ComparePrices extends BaseIndicator {
    constructor() {
        super('ComparePrices', 'Compare Prices', 'trend');
    }
    validateInput(data, _config) {
        if (!Array.isArray(data) || data.length !== 2) {
            throw new Error('Data must be an array with exactly 2 price arrays');
        }
        const [price1, price2] = data;
        if (!Array.isArray(price1) || !Array.isArray(price2)) {
            throw new Error('Both elements must be price arrays');
        }
        if (price1.length !== price2.length) {
            throw new Error(ERROR_MESSAGES.ARRAY_LENGTH_MISMATCH);
        }
        if (price1.length === 0 || price2.length === 0) {
            throw new Error(ERROR_MESSAGES.EMPTY_DATA);
        }
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const [price1, price2] = data;
        const basePrice = config?.['basePrice'] || 100;
        const { ratio, performance, correlation } = calculateComparePrices(price1, price2, basePrice);
        return {
            values: ratio,
            metadata: {
                length: ratio.length,
                performance,
                correlation,
                basePrice,
                source: config?.source || 'close'
            }
        };
    }
}
/**
 * Calculate Compare Prices using wrapper function
 *
 * @param price1 - First price array
 * @param price2 - Second price array
 * @param basePrice - Base price for comparison (default: 100)
 * @returns Comparison results
 */
export function comparePrices(price1, price2, basePrice = 100) {
    const indicator = new ComparePrices();
    const result = indicator.calculate([price1, price2], { basePrice });
    return {
        ratio: result.values,
        performance: result.metadata['performance'],
        correlation: result.metadata['correlation']
    };
}
