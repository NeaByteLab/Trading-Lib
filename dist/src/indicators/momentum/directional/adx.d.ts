import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * ADX (Average Directional Index) Indicator
 *
 * Measures the strength of a trend regardless of direction.
 * Combines +DI and -DI to determine trend strength.
 *
 * @example
 * ```typescript
 * const adx = new ADX()
 * const result = adx.calculate(marketData, { length: 14 })
 * console.log(result.values) // ADX values
 * console.log(result.metadata.plusDI) // +DI values
 * console.log(result.metadata.minusDI) // -DI values
 * ```
 */
export declare class ADX extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateADX;
    private calculateDI;
    private calculateADXValue;
}
/**
 * Calculate ADX values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns ADX, +DI, and -DI values
 */
export declare function adx(data: MarketData | number[], length?: number, source?: string): {
    adx: number[];
    plusDI: number[];
    minusDI: number[];
};
//# sourceMappingURL=adx.d.ts.map