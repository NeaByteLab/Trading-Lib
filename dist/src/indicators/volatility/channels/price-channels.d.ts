import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Calculate Price Channels
 *
 * Creates upper and lower channels based on the highest high and
 * lowest low over a specified period. Useful for identifying
 * breakout and breakdown levels.
 *
 * @param data - Market data with OHLC values
 * @param length - Channel calculation period
 * @returns Object with upper and lower channel values
 * @throws {Error} If market data is invalid or length is invalid
 *
 * @example
 * ```typescript
 * const marketData = {
 *   high: [100, 102, 104, 103, 105],
 *   low: [98, 99, 101, 100, 102]
 * }
 * const channels = priceChannels(marketData, 20)
 * console.log(channels.upper) // Upper channel values
 * console.log(channels.lower) // Lower channel values
 * ```
 */
export declare function priceChannels(data: MarketData, length?: number): {
    upper: number[];
    lower: number[];
};
/**
 * Price Channels Indicator Class
 */
export declare class PriceChannelsIndicator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
//# sourceMappingURL=price-channels.d.ts.map