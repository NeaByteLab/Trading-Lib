import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * DMI (Directional Movement Index) Indicator
 *
 * Measures the strength and direction of price movement.
 * Consists of +DI and -DI components.
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
    private calculateDI;
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