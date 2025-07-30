/**
 * Price calculation utilities
 *
 * Provides centralized price calculation functions to eliminate code duplication.
 * All indicators should use these utilities instead of manual implementations.
 */
export declare const PriceCalculations: {
    /**
     * Calculate typical price (HLC3)
     *
     * @param data - Market data with high, low, close arrays
     * @returns Array of typical prices
     */
    typical(data: {
        high: number[];
        low: number[];
        close: number[];
    }): number[];
    /**
     * Calculate HL2 (High + Low) / 2
     *
     * @param data - Market data with high, low arrays
     * @returns Array of HL2 values
     */
    hl2(data: {
        high: number[];
        low: number[];
    }): number[];
    /**
     * Calculate OHLC4 (Open + High + Low + Close) / 4
     *
     * @param data - Market data with open, high, low, close arrays
     * @returns Array of OHLC4 values
     */
    ohlc4(data: {
        open: number[];
        high: number[];
        low: number[];
        close: number[];
    }): number[];
};
/**
 * Calculate HLC3 (High + Low + Close) / 3
 *
 * @param high - High price
 * @param low - Low price
 * @param close - Close price
 * @returns HLC3 value
 */
export declare function calculateHLC3(high: number, low: number, close: number): number;
/**
 * Calculate money flow multiplier for volume indicators
 *
 * @param high - High price
 * @param low - Low price
 * @param close - Close price
 * @returns Money flow multiplier
 */
export declare function calculateMoneyFlowMultiplier(high: number, low: number, close: number): number;
//# sourceMappingURL=price-calculations.d.ts.map