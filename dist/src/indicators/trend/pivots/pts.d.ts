import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Calculate Percentage Trailing Stops
 *
 * Creates trailing stop levels that follow price movements at a
 * specified percentage distance. The stops move in the direction
 * of the trend but never move against it.
 *
 * @param data - Market data or price array
 * @param percentage - Trailing percentage
 * @returns Object with trailing stop values
 * @throws {Error} If data is invalid or parameters are out of range
 *
 * @example
 * ```typescript
 * const marketData = {
 *   close: [100, 102, 104, 103, 105]
 * }
 * const stops = percentageTrailingStops(marketData, 2.5)
 * console.log(stops.trailingStop) // Trailing stop values
 * ```
 */
export declare function percentageTrailingStops(data: MarketData | number[], percentage?: number): {
    trailingStop: number[];
};
/**
 * Percentage Trailing Stops Indicator Class
 */
export declare class PercentageTrailingStopsIndicator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
//# sourceMappingURL=pts.d.ts.map