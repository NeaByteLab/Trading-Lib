import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Triangular Moving Average (TRIMA) Indicator
 *
 * TRIMA is a double-smoothed simple moving average that gives more weight to the middle values.
 * Formula: TRIMA = SMA(SMA(price, length), length)
 * The triangular weighting reduces noise while maintaining responsiveness.
 *
 * @example
 * ```typescript
 * const trima = new TRIMA()
 * const result = trima.calculate(marketData, { length: 20 })
 * console.log(result.values) // TRIMA values
 * ```
 */
export declare class TRIMA extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate TRIMA values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns TRIMA values array
 */
export declare function trima(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=trima.d.ts.map