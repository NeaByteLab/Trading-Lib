/**
 * Calculate Price Differential
 *
 * Calculates the difference between two price series.
 * Useful for spread analysis and relative strength calculations.
 *
 * @param price1 - First price series
 * @param price2 - Second price series
 * @returns Array of price differential values
 * @throws {Error} If price arrays are invalid or have different lengths
 *
 * @example
 * ```typescript
 * const price1 = [100, 102, 104, 103, 105]
 * const price2 = [50, 51, 52, 51.5, 52.5]
 * const differential = priceDifferential(price1, price2)
 * console.log(differential) // Price differential values
 * ```
 */
export declare function priceDifferential(price1: number[], price2: number[]): number[];
/**
 * Price Differential Indicator Class
 */
export declare const PriceDifferentialIndicator: {
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
//# sourceMappingURL=price-differential.d.ts.map