import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Calculate Percentage Bands
 *
 * Creates dynamic support and resistance levels as a percentage
 * above and below a moving average. The bands adapt to price
 * movements and provide flexible trading levels.
 *
 * @param data - Market data or price array
 * @param length - Moving average period
 * @param percentage - Percentage deviation from moving average
 * @returns Object with upper, middle, and lower bands
 * @throws {Error} If data is invalid or parameters are out of range
 *
 * @example
 * ```typescript
 * const marketData = {
 *   close: [100, 102, 104, 103, 105]
 * }
 * const bands = percentageBands(marketData, 20, 2.5)
 * console.log(bands.upper) // Upper band values
 * console.log(bands.middle) // Middle band (SMA) values
 * console.log(bands.lower) // Lower band values
 * ```
 */
export declare function percentageBands(data: MarketData | number[], length?: number, percentage?: number): {
    upper: number[];
    middle: number[];
    lower: number[];
};
/**
 * Percentage Bands Indicator Class
 */
export declare class PercentageBandsIndicator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
//# sourceMappingURL=percentage-bands.d.ts.map