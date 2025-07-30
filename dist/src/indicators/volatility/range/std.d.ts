import { VolatilityIndicator } from '@base/volatility-indicator';
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
export declare class StandardDeviationIndicator extends VolatilityIndicator {
    constructor();
    protected calculateVolatility(data: number[], length: number, _multiplier: number): number[];
}
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