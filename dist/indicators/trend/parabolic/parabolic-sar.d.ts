import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Parabolic SAR (Stop and Reverse) indicator
 *
 * Parabolic SAR is a trend-following indicator that provides stop-loss levels.
 * Formula: SAR = SAR[i-1] + AF × (EP - SAR[i-1])
 *
 * @example
 * ```typescript
 * const parabolic = new ParabolicSAR()
 * const result = parabolic.calculate(marketData, { acceleration: 0.02 })
 * console.log(result.values) // SAR values
 * ```
 */
export declare class ParabolicSAR extends BaseIndicator {
    constructor();
    /**
     * Calculate Parabolic SAR values
     *
     * @param data - Market data
     * @param config - Indicator configuration
     * @returns Parabolic SAR calculation result
     */
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    /**
     * Calculate Parabolic SAR values
     *
     * @param data - Market data
     * @param acceleration - Acceleration factor
     * @param maximum - Maximum acceleration
     * @returns Parabolic SAR values array
     */
    private calculateParabolicSAR;
}
/**
 * Calculate Parabolic SAR values using wrapper function
 *
 * @param data - Market data
 * @param acceleration - Acceleration factor (default: 0.02)
 * @param maximum - Maximum acceleration (default: 0.2)
 * @param source - Price source (default: 'hlc3')
 * @returns Parabolic SAR values array
 */
export declare function parabolicSAR(data: MarketData | number[], acceleration?: number, maximum?: number, source?: string): number[];
//# sourceMappingURL=parabolic-sar.d.ts.map