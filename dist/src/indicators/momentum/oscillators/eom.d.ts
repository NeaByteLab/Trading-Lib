import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Ease of Movement Indicator
 *
 * Measures the relationship between price and volume to identify buying/selling pressure.
 * Positive values indicate buying pressure, negative values indicate selling pressure.
 * The indicator is smoothed using a simple moving average.
 *
 * @example
 * ```typescript
 * const eom = new EaseOfMovement()
 * const result = eom.calculate(marketData, { length: 14 })
 * console.log(result.values) // Ease of Movement values
 * ```
 */
export declare class EaseOfMovement extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Ease of Movement using wrapper function
 *
 * @param data - Market data with OHLCV
 * @param length - Smoothing period (default: 14)
 * @returns Ease of Movement values array
 */
export declare function easeOfMovement(data: MarketData, length?: number): number[];
//# sourceMappingURL=eom.d.ts.map