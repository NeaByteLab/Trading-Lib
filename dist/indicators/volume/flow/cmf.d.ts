import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Chaikin Money Flow (CMF) indicator
 *
 * CMF measures buying and selling pressure using volume and price data.
 * Formula: CMF = Sum(Money Flow Volume) / Sum(Volume) over period
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
    /**
     * Calculate CMF values
     *
     * @param data - Market data
     * @param config - Indicator configuration
     * @returns CMF calculation result
     */
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    /**
     * Calculate CMF values
     *
     * @param data - Market data
     * @param length - Calculation period
     * @returns CMF values array
     */
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