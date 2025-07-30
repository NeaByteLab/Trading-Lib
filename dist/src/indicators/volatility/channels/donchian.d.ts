import { VolatilityIndicator } from '@base/volatility-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Donchian Channel Indicator
 *
 * Measures volatility by calculating the highest high and lowest low over a period.
 * Upper band = highest high, lower band = lowest low, middle band = average of both.
 *
 * @example
 * ```typescript
 * const donchian = new DonchianChannelIndicator()
 * const result = donchian.calculate(marketData, { length: 20 })
 * console.log(result.values) // Middle band values
 * console.log(result.metadata.upper) // Upper band values
 * console.log(result.metadata.lower) // Lower band values
 * ```
 */
export declare class DonchianChannelIndicator extends VolatilityIndicator {
    constructor();
    protected calculateVolatility(_data: number[], _length: number, _multiplier: number): number[];
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Donchian Channel using wrapper function
 *
 * @param data - Market data with high, low arrays
 * @param length - Lookback period (default: 20)
 * @returns Object with upper, middle, and lower bands
 */
export declare function donchianChannel(data: MarketData, length?: number): {
    upper: number[];
    middle: number[];
    lower: number[];
};
//# sourceMappingURL=donchian.d.ts.map