/**
 * Calculate momentum (current price - price n periods ago)
 * Pine Script equivalent: momentum(src, length)
 *
 * @param data - Source price data
 * @param length - Number of periods to look back
 * @returns Array of momentum values
 */
export function momentum(data, length) {
    if (data.length < length) {
        return new Array(data.length).fill(NaN);
    }
    const result = [];
    for (let i = 0; i < data.length; i++) {
        if (i < length) {
            result.push(NaN);
        }
        else {
            result.push(data[i] - data[i - length]);
        }
    }
    return result;
}
//# sourceMappingURL=momentum.js.map