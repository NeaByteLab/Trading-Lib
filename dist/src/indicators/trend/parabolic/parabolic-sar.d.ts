import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Parabolic SAR Indicator
 *
 * Calculates dynamic support and resistance levels that follow price action.
 * Used to identify potential reversal points and trend direction.
 *
 * @example
 * ```typescript
 * const sar = new ParabolicSAR()
 * const result = sar.calculate(marketData, { acceleration: 0.02, maximum: 0.2 })
 * console.log(result.values) // SAR values
 * ```
 */
export declare class ParabolicSAR extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Parabolic SAR values using wrapper function
 *
 * @param data - Market data
 * @param acceleration - Acceleration factor (default: 0.02)
 * @param maximum - Maximum acceleration (default: 0.2)
 * @param source - Price source (default: 'close')
 * @returns Parabolic SAR values array
 */
export declare function parabolicSAR(data: MarketData | number[], acceleration?: number, maximum?: number, source?: string): number[];
//# sourceMappingURL=parabolic-sar.d.ts.map