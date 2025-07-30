import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Woodie Pivot Points indicator
 *
 * Calculates Woodie pivot points and support/resistance levels.
 * Formula: PP = (H + L + 2C) / 4, R1 = (2 × PP) - L, S1 = (2 × PP) - H
 *
 * @example
 * ```typescript
 * const woodie = new WoodiePivots()
 * const result = woodie.calculate(marketData)
 * console.log(result.values) // Pivot point values
 * console.log(result.metadata.r1) // Resistance 1 values
 * console.log(result.metadata.s1) // Support 1 values
 * ```
 */
export declare class WoodiePivots extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Woodie Pivot Points using wrapper function
 *
 * @param data - Market data with OHLC
 * @returns Woodie pivot points with support and resistance levels
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