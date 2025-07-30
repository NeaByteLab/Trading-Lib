import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * ALMA (Adaptive Linear Moving Average) indicator
 *
 * A moving average that uses Gaussian filtering to reduce lag.
 * Formula: ALMA = Σ(Price[i] * Weight[i]) / Σ(Weight[i])
 *
 * @example
 * ```typescript
 * const alma = new ALMA()
 * const result = alma.calculate(marketData, { length: 9, sigma: 6 })
 * console.log(result.values) // ALMA values
 * ```
 */
export declare class ALMA extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Adaptive Linear Moving Average (ALMA)
 *
 * @param data - Market data or price array
 * @param length - ALMA period (default: 9)
 * @param sigma - Sigma parameter for Gaussian filter (default: 6)
 * @param source - Price source (default: 'close')
 * @returns ALMA values array
 */
export declare function alma(data: MarketData | number[], length?: number, sigma?: number, source?: string): number[];
//# sourceMappingURL=alma.d.ts.map