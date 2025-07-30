import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Moving Average Ribbon Indicator
 *
 * Displays multiple moving averages to show trend strength and direction.
 * Creates a ribbon effect with multiple MAs of different periods.
 *
 * @example
 * ```typescript
 * const ribbon = new MovingAverageRibbon()
 * const result = ribbon.calculate(marketData, { periods: [10, 20, 30, 40] })
 * console.log(result.values) // Primary MA values
 * console.log(result.metadata.ribbon) // All MA values
 * ```
 */
export declare class MovingAverageRibbon extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateRibbon;
}
/**
 * Calculate Moving Average Ribbon values using wrapper function
 *
 * @param data - Market data or price array
 * @param periods - Array of MA periods (default: [10, 20, 30, 40])
 * @param maType - Moving average type (default: 'sma')
 * @param source - Price source (default: 'close')
 * @returns Object with primary MA and ribbon arrays
 */
export declare function movingAverageRibbon(data: MarketData | number[], periods?: number[], maType?: 'sma' | 'ema' | 'wma' | 'hull', source?: string): {
    ribbon: number[][];
    primary: number[];
};
//# sourceMappingURL=rib.d.ts.map