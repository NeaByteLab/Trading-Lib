import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * CMF (Chaikin Money Flow) indicator
 *
 * A volume-based indicator that measures buying and selling pressure.
 * Formula: CMF = Σ(Money Flow Volume) / Σ(Volume) over period
 *
 * @example
 * ```typescript
 * const cmf = new CMF()
 * const result = cmf.calculate(marketData, { length: 20 })
 * console.log(result.values) // CMF values
 * ```
 */
export declare class CMF extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateCMF;
}
/**
 * Calculate CMF values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns CMF values array
 */
export declare function cmf(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=cmf.d.ts.map