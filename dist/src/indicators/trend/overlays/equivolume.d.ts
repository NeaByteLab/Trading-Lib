import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Equivolume Chart Indicator
 *
 * Creates equivolume chart data that combines price and volume information.
 * Bar width represents volume, bar height represents price range.
 * Useful for identifying volume-price relationships and market structure.
 *
 * @example
 * ```typescript
 * const equivolume = new Equivolume()
 * const result = equivolume.calculate(marketData, { baseWidth: 1 })
 * console.log(result.values) // Volume ratio values
 * console.log(result.metadata.barWidth) // Bar width values
 * console.log(result.metadata.priceRange) // Price range values
 * ```
 */
export declare class Equivolume extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Equivolume Chart Data using wrapper function
 *
 * @param data - Market data with OHLCV
 * @param baseWidth - Base width for volume bars (default: 1)
 * @returns Equivolume chart data
 */
export declare function equivolume(data: MarketData, baseWidth?: number): {
    volumeRatio: number[];
    barWidth: number[];
    priceRange: number[];
};
//# sourceMappingURL=equivolume.d.ts.map