import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Moving Average Envelopes Indicator
 *
 * Creates bands around a moving average by adding/subtracting a percentage.
 * Formula: Upper = MA + (MA * percentage), Lower = MA - (MA * percentage)
 *
 * @example
 * ```typescript
 * const envelopes = new MovingAverageEnvelopes()
 * const result = envelopes.calculate(marketData, { length: 20, percentage: 0.025 })
 * console.log(result.values) // Middle line values
 * console.log(result.metadata.upper) // Upper band values
 * console.log(result.metadata.lower) // Lower band values
 * ```
 */
export declare class MovingAverageEnvelopes extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Moving Average Envelopes values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param percentage - Envelope percentage (default: 0.025)
 * @param maType - Moving average type (default: 'sma')
 * @param source - Price source (default: 'close')
 * @returns Object with upper, middle, and lower band arrays
 */
export declare function movingAverageEnvelopes(data: MarketData | number[], length?: number, percentage?: number, maType?: 'sma' | 'ema' | 'wma' | 'hull', source?: string): {
    upper: number[];
    middle: number[];
    lower: number[];
};
//# sourceMappingURL=env.d.ts.map