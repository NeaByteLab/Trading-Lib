import { ArrayUtils } from '@utils/array-utils';
import { PriceCalculations } from '@utils/calculation-utils';
import { validateVolumeData } from '@utils/validation-utils';
/**
 * Calculate Money Flow Index (MFI)
 *
 * Uses centralized calculation utilities to eliminate code duplication.
 * Pine Script equivalent: mfi(hlc3, volume, length)
 *
 * @param data - Market data with OHLCV values
 * @param length - MFI calculation period
 * @returns Array of MFI values
 * @throws {Error} If market data is invalid or volume data is missing
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
    validateVolumeData(data);
    const typicalPrices = PriceCalculations.typical(data);
    return ArrayUtils.processWindow(typicalPrices, length, (window, i) => {
        const { positiveFlow, negativeFlow } = calculateMoneyFlows(window, data.volume, i, length);
        if (negativeFlow === 0) {
            return positiveFlow > 0 ? 100 : 50;
        }
        else {
            const moneyRatio = positiveFlow / negativeFlow;
            return 100 - 100 / (1 + moneyRatio);
        }
    });
}
/**
 * Calculate money flows for a given period
 *
 * @param typicalPrices - Array of typical prices
 * @param volumes - Array of volume data
 * @param currentIndex - Current index
 * @param length - Calculation period
 * @returns Positive and negative money flows
 */
function calculateMoneyFlows(typicalPrices, volumes, currentIndex, length) {
    const windowPrices = ArrayUtils.getWindowSlice(typicalPrices, currentIndex, length);
    const windowVolumes = ArrayUtils.getWindowSlice(volumes, currentIndex, length);
    let positiveFlow = 0;
    let negativeFlow = 0;
    ArrayUtils.processArray(windowPrices, (currentPrice, j) => {
        const currentVolume = windowVolumes[j];
        const prevPrice = j > 0 ? windowPrices[j - 1] : currentPrice;
        if (currentPrice === undefined || currentVolume === undefined || prevPrice === undefined) {
            return;
        }
        const priceChange = currentPrice - prevPrice;
        const moneyFlow = currentPrice * currentVolume;
        if (priceChange > 0) {
            positiveFlow += moneyFlow;
        }
        else if (priceChange < 0) {
            negativeFlow += moneyFlow;
        }
    });
    return { positiveFlow, negativeFlow };
}
