/**
 * Calculate typical price (HLC3)
 * Pine Script equivalent: hlc3
 *
 * @param data - Market data with OHLC values
 * @returns Array of typical prices
 */
export function typicalPrice(data) {
    return data.high.map((high, i) => (high + data.low[i] + data.close[i]) / 3);
}
//# sourceMappingURL=typical-price.js.map