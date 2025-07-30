import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Calculate Price Envelope
 *
 * Creates upper and lower envelopes around a moving average
 * based on a specified deviation percentage. Useful for
 * identifying overbought and oversold conditions.
 *
 * @param data - Market data or price array
 * @param length - Moving average period
 * @param deviation - Deviation percentage from moving average
 * @returns Object with upper, middle, and lower envelope values
 * @throws {Error} If data is invalid or parameters are out of range
 *
 * @example
 * ```typescript
 * const marketData = {
 *   close: [100, 102, 104, 103, 105]
 * }
 * const envelope = priceEnvelope(marketData, 20, 2.5)
 * console.log(envelope.upper) // Upper envelope values
 * console.log(envelope.middle) // Middle line (SMA) values
 * console.log(envelope.lower) // Lower envelope values
 * ```
 */
export declare function priceEnvelope(data: MarketData | number[], length?: number, deviation?: number): {
    upper: number[];
    middle: number[];
    lower: number[];
};
/**
 * Price Envelope Indicator Class
 */
export declare class PriceEnvelopeIndicator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
//# sourceMappingURL=price-envelope.d.ts.map