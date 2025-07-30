import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Triple Exponential Moving Average (TEMA) Indicator
 *
 * TEMA = 3 * EMA(price, length) - 3 * EMA(EMA(price, length), length) + EMA(EMA(EMA(price, length), length), length)
 * Provides even more lag reduction than DEMA while maintaining trend-following characteristics.
 *
 * @example
 * ```typescript
 * const tema = new TEMA()
 * const result = tema.calculate(marketData, { length: 20 })
 * console.log(result.values) // TEMA values
 * ```
 */
export declare class TEMA extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate TEMA values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns TEMA values array
 */
export declare function tema(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=tema.d.ts.map