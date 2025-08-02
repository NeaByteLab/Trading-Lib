import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Force Index Indicator
 *
 * Measures the power behind price movements using volume.
 * Combines price change and volume to identify strong moves.
 * Positive values indicate buying pressure, negative values indicate selling pressure.
 *
 * @example
 * ```typescript
 * const force = new ForceIndex()
 * const result = force.calculate(marketData, { length: 13 })
 * console.log(result.values) // Force Index values
 * ```
 */
export declare class ForceIndex extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Force Index using wrapper function
 *
 * @param data - Market data with close and volume arrays
 * @param length - Calculation period (default: 13)
 * @returns Array of Force Index values
 */
export declare function forceIndex(data: MarketData, length?: number): number[];
//# sourceMappingURL=force-index.d.ts.map