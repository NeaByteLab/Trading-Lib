/**
 * Calculate median price (HL2)
 * Pine Script equivalent: hl2
 *
 * @param data - Market data with OHLC values
 * @returns Array of median prices
 */
export function medianPrice(data) {
    return data.high.map((high, i) => (high + data.low[i]) / 2);
}
//# sourceMappingURL=median-price.js.map