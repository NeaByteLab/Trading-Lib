import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Relative Strength Indicator
 *
 * Calculates the ratio of two assets' closing prices to measure relative strength.
 *
 * @param dataA - MarketData or price array for asset A
 * @param dataB - MarketData or price array for asset B
 * @param source - Price source (default: 'close')
 * @returns Array of relative strength values (A/B)
 *
 * @example
 * ```typescript
 * const rs = relativeStrength(assetA, assetB)
 * // rs[i] = assetA[i] / assetB[i]
 * ```
 */
export declare class RelativeStrengthIndicator extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
export declare function relativeStrength(dataA: MarketData | number[], _dataB: MarketData | number[], source?: string): number[];
//# sourceMappingURL=relative-strength.d.ts.map