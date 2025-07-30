import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Donchian Channel indicator
 *
 * Calculates upper, middle, and lower bands based on highest high and lowest low.
 * Formula: Upper = Highest High, Lower = Lowest Low, Middle = (Upper + Lower) / 2
 *
 * @example
 * ```typescript
 * const dc = new DonchianChannel()
 * const result = dc.calculate(marketData, { length: 20 })
 * console.log(result.values) // Middle band
 * console.log(result.metadata.upper) // Upper band
 * console.log(result.metadata.lower) // Lower band
 * ```
 */
export declare class DonchianChannel extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateDonchianChannel;
}
/**
 * Calculate Donchian Channel using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns Donchian Channel middle band values
 */
export declare function donchianChannel(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=donchian-channel.d.ts.map