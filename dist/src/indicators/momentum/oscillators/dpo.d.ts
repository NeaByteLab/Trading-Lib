import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Detrended Price Oscillator (DPO) Indicator
 *
 * Removes trend from price data by subtracting a displaced moving average.
 * Helps identify cycles and overbought/oversold conditions.
 *
 * @example
 * ```typescript
 * const dpo = new DPO()
 * const result = dpo.calculate(marketData, { length: 20 })
 * console.log(result.values) // DPO values
 * ```
 */
export declare class DPO extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateDPO;
}
/**
 * Calculate Detrended Price Oscillator (DPO)
 *
 * @param data - Market data or price array
 * @param length - DPO period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns DPO values
 */
export declare function dpo(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=dpo.d.ts.map