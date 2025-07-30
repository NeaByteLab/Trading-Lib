/**
 * Calculate Price Comparison
 *
 * Compares two price series and calculates relative performance.
 * Useful for comparing different assets or timeframes.
 *
 * @param price1 - First price series
 * @param price2 - Second price series
 * @param basePrice - Base price for comparison (default: 100)
 * @returns Object with comparison metrics
 * @throws {Error} If price arrays are invalid or have different lengths
 *
 * @example
 * ```typescript
 * const price1 = [100, 102, 104, 103, 105]
 * const price2 = [50, 51, 52, 51.5, 52.5]
 * const comparison = priceComparison(price1, price2, 100)
 * console.log(comparison.ratio) // Price ratio
 * console.log(comparison.performance) // Relative performance
 * ```
 */
export declare function priceComparison(price1: number[], price2: number[], basePrice?: number): {
    ratio: number[];
    performance: number[];
    correlation: number;
};
/**
 * Price Comparison Indicator Class
 */
export declare const PriceComparisonIndicator: {
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
//# sourceMappingURL=price-comparison.d.ts.map