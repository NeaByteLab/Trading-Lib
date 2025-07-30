import type { MarketData } from '@core/types/indicator-types';
/**
 * Woodie Pivots Indicator
 *
 * Calculates support and resistance levels based on the previous day's high, low, and close.
 * Uses a modified pivot point formula that gives more weight to the close price.
 *
 * @example
 * ```typescript
 * const woodie = new WoodiePivots()
 * const result = woodie.calculate(marketData)
 * console.log(result.values) // Pivot point values
 * console.log(result.metadata.r1) // R1 resistance levels
 * console.log(result.metadata.s1) // S1 support levels
 * ```
 */
export declare const WoodiePivots: {
    new (): {
        validateInput(data: MarketData | number[], _config?: import("@core/types/indicator-types").IndicatorConfig): void;
        calculate(data: MarketData | number[], config?: import("@core/types/indicator-types").IndicatorConfig): import("@core/types/indicator-types").IndicatorResult;
        name: string;
        description: string;
        category: string;
        validateLength(length: number, minLength: number, maxLength?: number): void;
        validateMultiplier(multiplier: number): void;
        getSourceData(data: MarketData, source?: string): number[];
    };
};
/**
 * Calculate Woodie Pivots using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @returns Woodie pivot levels
 */
export declare function woodie(data: MarketData): {
    pp: number[];
    r1: number[];
    r2: number[];
    r3: number[];
    s1: number[];
    s2: number[];
    s3: number[];
};
//# sourceMappingURL=woodie.d.ts.map