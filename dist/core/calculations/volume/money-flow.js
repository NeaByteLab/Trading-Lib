import { safeDivision, PriceCalculations } from '@utils/calculation-utils';
/**
 * Calculate Money Flow Index (MFI)
 *
 * Uses centralized calculation utilities to ensure consistency and eliminate duplication.
 * Pine Script equivalent: mfi(length)
 *
 * @param data - Market data with OHLCV values
 * @param length - Period for calculation
 * @returns Array of MFI values (0-100)
 * @throws {Error} If volume data is missing or invalid parameters
 *
 * @example
 * ```typescript
 * const marketData = {
 *   high: [100, 102, 104, 103, 105],
 *   low: [98, 99, 101, 100, 102],
 *   close: [99, 101, 103, 102, 104],
 *   volume: [1000, 1200, 1100, 1300, 1400]
 * }
 * const mfi = moneyFlowIndex(marketData, 14)
 * console.log(mfi) // MFI values
 * ```
 */
export function moneyFlowIndex(data, length) {
    if (!Array.isArray(data.high) || !Array.isArray(data.low) ||
        !Array.isArray(data.close) || !Array.isArray(data.volume)) {
        throw new Error('Invalid market data format');
    }
    if (!data.volume || data.volume.length === 0) {
        throw new Error('Volume data is required for MFI calculation');
    }
    if (length <= 0) {
        throw new Error('Length must be a positive integer');
    }
    // Use centralized price calculations
    const typicalPrices = PriceCalculations.typical(data);
    const result = [];
    for (let i = 0; i < data.close.length; i++) {
        if (i < length) {
            result.push(NaN);
            continue;
        }
        let positiveFlow = 0;
        let negativeFlow = 0;
        for (let j = i - length + 1; j <= i; j++) {
            const typicalPrice = typicalPrices[j];
            const volume = data.volume[j];
            if (typicalPrice === undefined || volume === undefined ||
                isNaN(typicalPrice) || isNaN(volume)) {
                continue;
            }
            if (j > 0) {
                const prevTypicalPrice = typicalPrices[j - 1];
                if (prevTypicalPrice === undefined || isNaN(prevTypicalPrice)) {
                    continue;
                }
                const moneyFlow = typicalPrice * volume;
                if (typicalPrice > prevTypicalPrice) {
                    positiveFlow += moneyFlow;
                }
                else if (typicalPrice < prevTypicalPrice) {
                    negativeFlow += moneyFlow;
                }
            }
        }
        const moneyRatio = safeDivision(positiveFlow, negativeFlow);
        const mfi = 100 - (100 / (1 + moneyRatio));
        result.push(mfi);
    }
    return result;
}
//# sourceMappingURL=money-flow.js.map