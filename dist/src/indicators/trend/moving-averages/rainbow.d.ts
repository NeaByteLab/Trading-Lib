import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Rainbow 3D Moving Averages
 *
 * Calculates a set of moving averages with different periods to form a "rainbow" overlay.
 * Useful for visualizing trend strength and direction.
 *
 * @param data - Array of prices or MarketData
 * @param periods - Array of periods for each band (default: [2,3,4,5,6,7,8,9,10])
 * @param source - Price source (default: 'close')
 * @returns Array of arrays, each representing a moving average band
 *
 * @example
 * ```typescript
 * const bands = rainbow(data, [2,3,4,5,6,7,8,9,10])
 * // bands[0] = MA(period=2), bands[1] = MA(period=3), ...
 * ```
 */
export declare class RainbowIndicator extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig & {
        periods?: number[];
    }): IndicatorResult;
}
export declare function rainbow(data: MarketData | number[], periods?: number[], source?: string): number[][];
//# sourceMappingURL=rainbow.d.ts.map