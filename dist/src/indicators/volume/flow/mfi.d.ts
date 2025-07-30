import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Money Flow Index (MFI) indicator
 *
 * A volume-weighted oscillator that measures buying and selling pressure.
 * Formula: MFI = 100 - (100 / (1 + Money Ratio))
 *
 * @example
 * ```typescript
 * const mfi = new MFI()
 * const result = mfi.calculate(marketData, { length: 14 })
 * console.log(result.values) // MFI values (0-100)
 * ```
 */
export declare class MFI extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateMFI;
}
/**
 * Calculate MFI values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns MFI values array
 */
export declare function mfi(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=mfi.d.ts.map