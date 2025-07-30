/**
 * Calculate weighted close price
 * Pine Script equivalent: (high + low + close * 2) / 4
 *
 * @param data - Market data with OHLC values
 * @returns Array of weighted close prices
 */
export function weightedClose(data) {
    return data.high.map((high, i) => (high + data.low[i] + data.close[i] * 2) / 4);
}
//# sourceMappingURL=weighted-close.js.map