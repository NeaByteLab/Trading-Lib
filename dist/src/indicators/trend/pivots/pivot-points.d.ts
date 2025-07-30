import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate standard pivot points and support/resistance levels using centralized utilities
 *
 * @param data - Market data with OHLC values
 * @returns Object with pivot point levels
 * @throws {Error} If market data is invalid
 */
export declare function pivotPoints(data: MarketData): {
    pp: number[];
    r1: number[];
    r2: number[];
    r3: number[];
    s1: number[];
    s2: number[];
    s3: number[];
};
/**
 * Pivot Points Indicator
 *
 * Calculates standard pivot points and support/resistance levels
 * based on the previous period's high, low, and close prices.
 *
 * @example
 * ```typescript
 * const pivots = new PivotPointsIndicator()
 * const result = pivots.calculate(marketData)
 * console.log(result.values) // Pivot point values
 * console.log(result.metadata.r1) // Resistance 1 values
 * console.log(result.metadata.s1) // Support 1 values
 * ```
 */
export declare const PivotPointsIndicator: {
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
 * Calculate pivot points using wrapper function
 *
 * @param data - Market data with OHLC values
 * @returns Object with pivot point levels
 */
export declare function pivots(data: MarketData): {
    pp: number[];
    r1: number[];
    r2: number[];
    r3: number[];
    s1: number[];
    s2: number[];
    s3: number[];
};
//# sourceMappingURL=pivot-points.d.ts.map