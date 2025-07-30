import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Directional Movement Index (DMI) indicator
 *
 * DMI consists of +DI and -DI lines that measure directional movement.
 * Formula: +DI = 100 × (+DM / TR), -DI = 100 × (-DM / TR)
 *
 * @example
 * ```typescript
 * const dmi = new DMI()
 * const result = dmi.calculate(marketData, { length: 14 })
 * console.log(result.values) // +DI values
 * ```
 */
export declare class DMI extends BaseIndicator {
    constructor();
    /**
     * Calculate DMI values
     *
     * @param data - Market data
     * @param config - Indicator configuration
     * @returns DMI calculation result
     */
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    /**
     * Calculate DMI with +DI and -DI
     *
     * @param data - Market data
     * @param length - Calculation period
     * @returns +DI and -DI values
     */
    private calculateDMI;
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
 * Calculate DMI values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns DMI values array
 */
export declare function dmi(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=dmi.d.ts.map