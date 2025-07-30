import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Variable Index Dynamic Average (VIDYA) indicator
 *
 * VIDYA adapts to market volatility by adjusting its smoothing factor.
 * Formula: VIDYA = Price × α + Previous VIDYA × (1 - α)
 * where α = 2 / (Length + 1) × (1 + CMO)
 *
 * @example
 * ```typescript
 * const vidya = new VIDYA()
 * const result = vidya.calculate(marketData, { length: 14, cmoLength: 9 })
 * console.log(result.values) // VIDYA values
 * ```
 */
export declare class VIDYA extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate VIDYA values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - VIDYA period (default: 14)
 * @param cmoLength - CMO calculation period (default: 9)
 * @param source - Price source (default: 'close')
 * @returns VIDYA values array
 */
export declare function vidya(data: MarketData | number[], length?: number, cmoLength?: number, source?: string): number[];
//# sourceMappingURL=vidya.d.ts.map