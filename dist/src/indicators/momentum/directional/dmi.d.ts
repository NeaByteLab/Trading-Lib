import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Directional Movement Index (DMI) indicator
 *
 * Measures the strength of directional movement in price.
 * Formula: +DI = (Smoothed +DM / Smoothed TR) × 100, -DI = (Smoothed -DM / Smoothed TR) × 100
 *
 * @example
 * ```typescript
 * const dmi = new DMI()
 * const result = dmi.calculate(marketData, { length: 14 })
 * console.log(result.values) // +DI values
 * console.log(result.metadata.minusDI) // -DI values
 * ```
 */
export declare class DMI extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateDMI;
    private calculateDirectionalMovement;
    private calculateSmoothedValues;
}
/**
 * Calculate DMI values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns +DI and -DI values
 */
export declare function dmi(data: MarketData | number[], length?: number, source?: string): {
    plusDI: number[];
    minusDI: number[];
};
//# sourceMappingURL=dmi.d.ts.map