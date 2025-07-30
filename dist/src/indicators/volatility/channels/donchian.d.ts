import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Donchian Channel Indicator
 *
 * A volatility indicator that shows the highest high and lowest low over a specified period.
 * Upper Band = Highest High, Lower Band = Lowest Low, Middle Band = (Upper + Lower) / 2
 *
 * @example
 * ```typescript
 * const donchian = new DonchianChannel()
 * const result = donchian.calculate(marketData, { length: 20 })
 * console.log(result.values) // Middle band values
 * console.log(result.metadata.upper) // Upper band values
 * console.log(result.metadata.lower) // Lower band values
 * ```
 */
export declare class DonchianChannel extends BaseIndicator {
    constructor();
    calculate(data: MarketData, config?: IndicatorConfig): IndicatorResult;
    private calculateDonchianChannel;
}
/**
 * Calculate Donchian Channel values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @returns Object with upper, middle, and lower band arrays
 */
export declare function donchianChannel(data: MarketData, length?: number): {
    upper: number[];
    middle: number[];
    lower: number[];
};
//# sourceMappingURL=donchian.d.ts.map