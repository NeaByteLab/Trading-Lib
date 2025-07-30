/**
 * Calculate Price Ratio
 *
 * Calculates the ratio between two price series.
 * Useful for relative strength analysis and spread trading.
 *
 * @param price1 - First price series
 * @param price2 - Second price series
 * @returns Array of price ratio values
 * @throws {Error} If price arrays are invalid or have different lengths
 *
 * @example
 * ```typescript
 * const price1 = [100, 102, 104, 103, 105]
 * const price2 = [50, 51, 52, 51.5, 52.5]
 * const ratio = priceRatio(price1, price2)
 * console.log(ratio) // Price ratio values
 * ```
 */
export declare function priceRatio(price1: number[], price2: number[]): number[];
/**
 * Price Ratio Indicator Class
 */
export declare const PriceRatioIndicator: {
    new (): {
        validateInput(_data: import("../../..").MarketData | number[], config?: import("../../..").IndicatorConfig): void;
        calculate(data: import("../../..").MarketData | number[], config?: import("../../..").IndicatorConfig): import("../../..").IndicatorResult;
        name: string;
        description: string;
        category: string;
        validateLength(length: number, minLength: number, maxLength?: number): void;
        validateMultiplier(multiplier: number): void;
        getSourceData(data: import("../../..").MarketData, source?: string): number[];
    };
};
//# sourceMappingURL=price-ratio.d.ts.map