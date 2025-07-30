import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * On Balance Volume (OBV) indicator
 *
 * Measures buying and selling pressure by adding volume on up days and subtracting on down days.
 * Formula: OBV = Previous OBV + Current Volume (if close > previous close)
 *         OBV = Previous OBV - Current Volume (if close < previous close)
 *
 * @example
 * ```typescript
 * const obv = new OBV()
 * const result = obv.calculate(marketData)
 * console.log(result.values) // OBV values
 * ```
 */
export declare class OBV extends BaseIndicator {
    constructor();
    /**
     * Calculate OBV values
     *
     * @param data - Market data or price array
     * @param config - Indicator configuration
     * @returns OBV calculation result
     */
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    /**
     * Calculate OBV using centralized utilities
     *
     * @param data - Market data
     * @returns OBV values array
     */
    private calculateOBV;
}
/**
 * Calculate OBV values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 1)
 * @param source - Price source (default: 'close')
 * @returns OBV values array
 */
export declare function obv(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=obv.d.ts.map