import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Multiple Moving Averages Indicator
 *
 * Calculates multiple moving averages simultaneously for trend analysis.
 * Returns an object with all MA values for easy comparison and analysis.
 *
 * @example
 * ```typescript
 * const mma = new MultipleMovingAverages()
 * const result = mma.calculate(marketData, { periods: [10, 20, 50], types: ['sma', 'ema'] })
 * console.log(result.values) // Primary MA values
 * console.log(result.metadata.movingAveragesKeys) // MA keys
 * ```
 */
export declare class MultipleMovingAverages extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateMultipleMAs;
}
/**
 * Multiple Moving Averages wrapper function
 *
 * @param data - Market data or price array
 * @param config - Configuration object with periods and types
 * @returns Moving averages result
 */
export declare function multipleMovingAverages(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
//# sourceMappingURL=mma.d.ts.map