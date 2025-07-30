import { PriceCalculations } from '@utils/calculation-utils';
/**
 * Calculate Volume Weighted Average Price (VWAP)
 *
 * Uses centralized calculation utilities to ensure consistency and eliminate duplication.
 * Pine Script equivalent: vwap(hlc3)
 *
 * @param data - Market data with OHLCV values
 * @returns Array of VWAP values
 * @throws {Error} If volume data is missing or invalid market data
 *
 * @example
 * ```typescript
 * const marketData = {
 *   high: [100, 102, 104, 103, 105],
 *   low: [98, 99, 101, 100, 102],
 *   close: [99, 101, 103, 102, 104],
 *   volume: [1000, 1200, 1100, 1300, 1400]
 * }
 * const vwap = volumeWeightedAveragePrice(marketData)
 * console.log(vwap) // VWAP values
 * ```
 */
export function volumeWeightedAveragePrice(data) {
    if (!Array.isArray(data.high) || !Array.isArray(data.low) ||
        !Array.isArray(data.close) || !Array.isArray(data.volume)) {
        throw new Error('Invalid market data format');
    }
    if (!data.volume || data.volume.length === 0) {
        throw new Error('Volume data is required for VWAP calculation');
    }
    // Use centralized price calculations
    const typicalPrices = PriceCalculations.typical(data);
    const result = [];
    let cumulativeTPV = 0;
    let cumulativeVolume = 0;
    for (let i = 0; i < data.close.length; i++) {
        const typicalPrice = typicalPrices[i];
        const volume = data.volume[i];
        if (typicalPrice === undefined || volume === undefined ||
            isNaN(typicalPrice) || isNaN(volume)) {
            result.push(NaN);
            continue;
        }
        cumulativeTPV += typicalPrice * volume;
        cumulativeVolume += volume;
        if (cumulativeVolume > 0) {
            result.push(cumulativeTPV / cumulativeVolume);
        }
        else {
            result.push(typicalPrice);
        }
    }
    return result;
}
//# sourceMappingURL=volume-weighted.js.map