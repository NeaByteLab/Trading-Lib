import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Double Exponential Moving Average (DEMA) Indicator
 *
 * DEMA = 2 * EMA(price, length) - EMA(EMA(price, length), length)
 * Reduces lag compared to simple EMA while maintaining trend-following characteristics.
 *
 * @example
 * ```typescript
 * const dema = new DEMA()
 * const result = dema.calculate(marketData, { length: 20 })
 * console.log(result.values) // DEMA values
 * ```
 */
export declare class DEMA extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate DEMA values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns DEMA values array
 */
export declare function dema(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=dema.d.ts.map