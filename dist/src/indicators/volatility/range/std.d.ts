import type { MarketData } from '@core/types/indicator-types';
/**
 * Standard Deviation Indicator
 *
 * Measures price volatility by calculating the standard deviation of price changes.
 * Higher values indicate greater volatility and price dispersion.
 * Formula: σ = √(Σ(x - μ)² / (n - 1))
 *
 * @example
 * ```typescript
 * const std = new StandardDeviationIndicator()
 * const result = std.calculate(marketData, { length: 20 })
 * console.log(result.values) // Standard deviation values
 * ```
 */
export declare const StandardDeviationIndicator: {
    new (): {
        calculate(data: MarketData | number[], config?: import("@core/types/indicator-types").IndicatorConfig): import("@core/types/indicator-types").IndicatorResult;
        name: string;
        description: string;
        category: string;
        validateInput(_data: MarketData | number[], _config?: import("@core/types/indicator-types").IndicatorConfig): void;
        validateLength(length: number, minLength: number, maxLength?: number): void;
        validateMultiplier(multiplier: number): void;
        getSourceData(data: MarketData, source?: string): number[];
    };
};
/**
 * Calculate Standard Deviation using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns Standard deviation values array
 */
export declare function std(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=std.d.ts.map