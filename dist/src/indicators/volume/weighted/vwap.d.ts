import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * VWAP (Volume Weighted Average Price) indicator
 *
 * Calculates the average price weighted by volume.
 * Formula: VWAP = Σ(Price × Volume) / Σ(Volume)
 *
 * @example
 * ```typescript
 * const vwap = new VWAP()
 * const result = vwap.calculate(marketData, { length: 20 })
 * console.log(result.values) // VWAP values
 * ```
 */
export declare class VWAP extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateVWAP;
}
/**
 * Calculate VWAP values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns VWAP values array
 */
export declare function vwap(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=vwap.d.ts.map