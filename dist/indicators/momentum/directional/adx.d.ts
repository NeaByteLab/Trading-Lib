import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Average Directional Index (ADX) indicator
 *
 * ADX measures the strength of a trend regardless of direction.
 * Formula: ADX = 100 × (DX / (DX + DX))
 *
 * @example
 * ```typescript
 * const adx = new ADX()
 * const result = adx.calculate(marketData, { length: 14 })
 * console.log(result.values) // ADX values
 * ```
 */
export declare class ADX extends BaseIndicator {
    constructor();
    /**
     * Calculate ADX values
     *
     * @param data - Market data
     * @param config - Indicator configuration
     * @returns ADX calculation result
     */
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    /**
     * Calculate ADX with +DI and -DI
     *
     * @param data - Market data
     * @param length - Calculation period
     * @returns ADX, +DI, and -DI values
     */
    private calculateADX;
    /**
     * Calculate smoothed Directional Movement
     */
    private calculateSmoothedDM;
    /**
     * Calculate smoothed True Range
     */
    private calculateSmoothedTR;
}
/**
 * Calculate ADX values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns ADX values array
 */
export declare function adx(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=adx.d.ts.map