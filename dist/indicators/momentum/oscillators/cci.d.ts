import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Commodity Channel Index (CCI) indicator
 *
 * CCI measures the current price level relative to an average price level over a given period.
 * Formula: CCI = (Typical Price - SMA) / (0.015 × Mean Deviation)
 *
 * @example
 * ```typescript
 * const cci = new CCI()
 * const result = cci.calculate(marketData, { length: 20 })
 * console.log(result.values) // CCI values
 * ```
 */
export declare class CCI extends BaseIndicator {
    constructor();
    /**
     * Calculate CCI values
     *
     * @param data - Market data or price array
     * @param config - Indicator configuration
     * @returns CCI calculation result
     */
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate CCI values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns CCI values array
 */
export declare function cci(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=cci.d.ts.map