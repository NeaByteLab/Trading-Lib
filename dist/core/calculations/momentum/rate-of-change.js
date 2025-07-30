/**
 * Calculate rate of change (ROC)
 * Pine Script equivalent: roc(src, length)
 *
 * @param data - Source price data
 * @param length - Number of periods to look back
 * @returns Array of ROC values
 */
export function rateOfChange(data, length) {
    if (data.length < length) {
        return new Array(data.length).fill(NaN);
    }
    const result = [];
    for (let i = 0; i < data.length; i++) {
        if (i < length) {
            result.push(NaN);
        }
        else {
            const currentPrice = data[i];
            const previousPrice = data[i - length];
            const roc = ((currentPrice - previousPrice) / previousPrice) * 100;
            result.push(roc);
        }
    }
    return result;
}
//# sourceMappingURL=rate-of-change.js.map