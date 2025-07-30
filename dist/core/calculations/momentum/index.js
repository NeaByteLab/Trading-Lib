/**
 * Unified momentum calculation function to eliminate duplication
 *
 * Provides momentum and ROC calculations using centralized utilities.
 * Pine Script equivalent: momentum(src, length) and roc(src, length)
 *
 * @param data - Source data array
 * @param length - Window length for calculation
 * @param type - Calculation type ('momentum' or 'roc')
 * @returns Array of momentum or ROC values
 * @throws {Error} If data is not an array or length is invalid
 *
 * @example
 * ```typescript
 * const prices = [100, 101, 102, 103, 104, 105]
 * const momentum = calculateMomentum(prices, 2, 'momentum')
 * const roc = calculateMomentum(prices, 2, 'roc')
 * ```
 */
export function calculateMomentum(data, length, type = 'momentum') {
    if (!Array.isArray(data)) {
        throw new Error('Data must be an array');
    }
    if (length <= 0) {
        throw new Error('Length must be a positive integer');
    }
    if (data.length === 0) {
        return [];
    }
    const result = [];
    for (let i = 0; i < data.length; i++) {
        if (i < length) {
            result.push(NaN);
            continue;
        }
        const current = data[i];
        const previous = data[i - length];
        if (current === undefined || previous === undefined ||
            isNaN(current) || isNaN(previous) || previous === 0) {
            result.push(NaN);
            continue;
        }
        let value;
        switch (type) {
            case 'momentum':
                value = current - previous;
                break;
            case 'roc':
                value = ((current - previous) / previous) * 100;
                break;
            default:
                value = current - previous;
        }
        result.push(value);
    }
    return result;
}
/**
 * Calculate momentum (current price - price n periods ago)
 *
 * Uses centralized calculation utilities for consistency.
 * Pine Script equivalent: momentum(src, length)
 *
 * @param data - Source data array
 * @param length - Number of periods to look back
 * @returns Array of momentum values
 * @throws {Error} If data is not an array or length is invalid
 *
 * @example
 * ```typescript
 * const prices = [100, 101, 102, 103, 104, 105]
 * const momentum = momentum(prices, 2)
 * console.log(momentum) // [1, 1, 1, 1]
 * ```
 */
export function momentum(data, length) {
    return calculateMomentum(data, length, 'momentum');
}
/**
 * Calculate Rate of Change (ROC)
 *
 * Uses centralized calculation utilities for consistency.
 * Pine Script equivalent: roc(src, length)
 *
 * @param data - Source data array
 * @param length - Number of periods to look back
 * @returns Array of ROC values
 * @throws {Error} If data is not an array or length is invalid
 *
 * @example
 * ```typescript
 * const prices = [100, 101, 102, 103, 104, 105]
 * const roc = roc(prices, 2)
 * console.log(roc) // [1, 0.99, 0.98, 0.97]
 * ```
 */
export function roc(data, length) {
    return calculateMomentum(data, length, 'roc');
}
//# sourceMappingURL=index.js.map