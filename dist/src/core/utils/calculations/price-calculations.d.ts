/**
 * Price calculation utilities
 *
 * Provides centralized price calculation functions to eliminate code duplication.
 * All indicators should use these utilities instead of manual implementations.
 */
export declare const PriceCalculations: {
    /**
     * Typical Price (HLC3) - average of high, low, and close
     * Formula: Typical Price = (High + Low + Close) / 3
     *
     * @param data - Market data with high, low, close arrays
     * @returns Array of typical prices
     *
     * @example
     * ```typescript
     * const typical = PriceCalculations.typical(data)
     * // Returns: [45.2, 46.1, 44.8, ...]
     * ```
     */
    typical(data: {
        high: number[];
        low: number[];
        close: number[];
    }): number[];
    /**
     * HL2 - average of high and low prices
     * Formula: HL2 = (High + Low) / 2
     *
     * @param data - Market data with high, low arrays
     * @returns Array of HL2 values
     *
     * @example
     * ```typescript
     * const hl2 = PriceCalculations.hl2(data)
     * // Returns: [45.2, 46.1, 44.8, ...]
     * ```
     */
    hl2(data: {
        high: number[];
        low: number[];
    }): number[];
    /**
     * OHLC4 - average of open, high, low, and close prices
     * Formula: OHLC4 = (Open + High + Low + Close) / 4
     *
     * @param data - Market data with open, high, low, close arrays
     * @returns Array of OHLC4 values
     *
     * @example
     * ```typescript
     * const ohlc4 = PriceCalculations.ohlc4(data)
     * // Returns: [45.2, 46.1, 44.8, ...]
     * ```
     */
    ohlc4(data: {
        open: number[];
        high: number[];
        low: number[];
        close: number[];
    }): number[];
};
/**
 * HLC3 - average of high, low, and close prices
 * Formula: HLC3 = (High + Low + Close) / 3
 *
 * @param high - High price
 * @param low - Low price
 * @param close - Close price
 * @returns HLC3 value
 *
 * @example
 * ```typescript
 * const hlc3 = calculateHLC3(50, 45, 48)
 * // Returns: 47.666666666666664
 * ```
 */
export declare function calculateHLC3(high: number, low: number, close: number): number;
/**
 * Money Flow Multiplier - measures buying/selling pressure for volume indicators
 * Formula: Money Flow Multiplier = ((Close - Low) - (High - Close)) / (High - Low)
 *
 * @param high - High price
 * @param low - Low price
 * @param close - Close price
 * @returns Money flow multiplier
 *
 * @example
 * ```typescript
 * const mfm = calculateMoneyFlowMultiplier(50, 45, 48)
 * // Returns: 0.2
 * ```
 */
export declare function calculateMoneyFlowMultiplier(high: number, low: number, close: number): number;
//# sourceMappingURL=price-calculations.d.ts.map