import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Vortex Indicator
 *
 * Measures trend strength and direction using price momentum.
 * VI+ = |Current High - Prior Low| / True Range
 * VI- = |Current Low - Prior High| / True Range
 * Uses centralized calculation utilities for consistency.
 *
 * @example
 * ```typescript
 * const vortex = new Vortex()
 * const result = vortex.calculate(marketData, { length: 14 })
 * console.log(result.values) // VI+ values
 * ```
 */
export declare class Vortex extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Vortex Indicator values
 *
 * Vortex Indicator measures trend strength and direction using price momentum.
 * VI+ = |Current High - Prior Low| / True Range
 * VI- = |Current Low - Prior High| / True Range
 *
 * @param data - Market data with OHLCV values
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Object with VI+ and VI- arrays
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const { viPlus, viMinus } = ta.vortex(marketData, 14)
 * // Returns: { viPlus: [0.8, 0.9, 0.7, ...], viMinus: [0.2, 0.1, 0.3, ...] }
 * ```
 */
export declare function vortex(data: MarketData | number[], length?: number, source?: string): {
    viPlus: number[];
    viMinus: number[];
};
//# sourceMappingURL=vortex.d.ts.map