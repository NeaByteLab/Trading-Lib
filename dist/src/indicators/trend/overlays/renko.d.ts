import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Renko Chart Generator
 *
 * Generates Renko bricks from price data.
 *
 * @param data - MarketData or price array
 * @param brickSize - Size of each Renko brick (default: auto, 1% of price range)
 * @param source - Price source (default: 'close')
 * @returns Array of Renko brick values
 *
 * @example
 * ```typescript
 * const renko = renkoChart(data, 2)
 * // renko[i] = value of Renko brick at i
 * ```
 */
export declare class RenkoChartIndicator extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig & {
        brickSize?: number;
    }): IndicatorResult;
}
export declare function renkoChart(data: MarketData | number[], brickSize?: number, source?: string): number[];
//# sourceMappingURL=renko.d.ts.map