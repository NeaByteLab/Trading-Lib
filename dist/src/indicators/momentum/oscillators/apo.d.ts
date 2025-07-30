import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Absolute Price Oscillator indicator
 *
 * APO = Fast EMA - Slow EMA
 *
 * @example
 * ```typescript
 * const apo = new APO()
 * const result = apo.calculate(marketData, { fastLength: 12, slowLength: 26 })
 * console.log(result.values) // APO values
 * ```
 */
export declare class APO extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Absolute Price Oscillator values
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @returns APO values array
 */
export declare function apo(data: MarketData | number[], fastLength?: number, slowLength?: number): number[];
//# sourceMappingURL=apo.d.ts.map