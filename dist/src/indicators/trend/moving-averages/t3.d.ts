import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * T3 Moving Average Indicator
 *
 * T3 = GD(GD(GD(price))) where GD = (a * EMA) + ((1 - a) * EMA(EMA))
 * Provides smooth trend-following with reduced lag and noise.
 *
 * @example
 * ```typescript
 * const t3 = new T3()
 * const result = t3.calculate(marketData, { length: 20, a: 0.7 })
 * console.log(result.values) // T3 values
 * ```
 */
export declare class T3 extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate T3 values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param a - Smoothing factor (default: 0.7)
 * @param source - Price source (default: 'close')
 * @returns T3 values array
 */
export declare function t3(data: MarketData | number[], length?: number, a?: number, source?: string): number[];
//# sourceMappingURL=t3.d.ts.map