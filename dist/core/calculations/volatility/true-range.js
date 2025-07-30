/**
 * Calculate True Range (TR)
 *
 * Uses proper algorithm implementation with error handling.
 * Pine Script equivalent: tr(high, low, close)
 *
 * @param data - Market data with OHLC values
 * @returns Array of True Range values
 * @throws {Error} If market data is invalid
 *
 * @example
 * ```typescript
 * const marketData = {
 *   high: [100, 102, 104, 103, 105],
 *   low: [98, 99, 101, 100, 102],
 *   close: [99, 101, 103, 102, 104]
 * }
 * const tr = trueRange(marketData)
 * console.log(tr) // True Range values
 * ```
 */
export function trueRange(data) {
    if (!Array.isArray(data.high) || !Array.isArray(data.low) || !Array.isArray(data.close)) {
        throw new Error('Invalid market data format');
    }
    if (data.high.length === 0 || data.low.length === 0 || data.close.length === 0) {
        return [];
    }
    const result = [];
    for (let i = 0; i < data.high.length; i++) {
        const high = data.high[i];
        const low = data.low[i];
        const close = data.close[i];
        if (high === undefined || low === undefined || close === undefined ||
            isNaN(high) || isNaN(low) || isNaN(close)) {
            result.push(NaN);
            continue;
        }
        if (i === 0) {
            result.push(high - low);
            continue;
        }
        const prevClose = data.close[i - 1];
        if (prevClose === undefined || isNaN(prevClose)) {
            result.push(high - low);
            continue;
        }
        const highLow = high - low;
        const highPrevClose = Math.abs(high - prevClose);
        const lowPrevClose = Math.abs(low - prevClose);
        result.push(Math.max(highLow, highPrevClose, lowPrevClose));
    }
    return result;
}
//# sourceMappingURL=true-range.js.map