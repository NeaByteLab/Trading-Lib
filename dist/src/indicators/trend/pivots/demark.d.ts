import type { MarketData } from '@core/types/indicator-types';
/**
 * DeMark Pivot Points Indicator
 *
 * Calculates pivot points using DeMark's methodology.
 * Uses previous high, low, and close to determine pivot levels.
 *
 * @example
 * ```typescript
 * const demark = new DeMarkPivots()
 * const result = demark.calculate(marketData)
 * console.log(result.values) // Pivot point values
 * console.log(result.metadata.r1) // R1 resistance values
 * ```
 */
export declare const DeMarkPivots: {
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
 * Calculate DeMark Pivots using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @returns DeMark pivot levels
 */
export declare function demarkPivots(data: MarketData): {
    pp: number[];
    r1: number[];
    r2: number[];
    r3: number[];
    s1: number[];
    s2: number[];
    s3: number[];
};
//# sourceMappingURL=demark.d.ts.map