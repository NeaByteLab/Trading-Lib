import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Kaufman Adaptive Moving Average (KAMA) indicator
 *
 * KAMA adapts to market conditions by adjusting its smoothing factor.
 * It's more responsive in trending markets and smoother in sideways markets.
 */
export declare class KAMA extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate KAMA values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - KAMA period (default: 10)
 * @param fastPeriod - Fast EMA period (default: 2)
 * @param slowPeriod - Slow EMA period (default: 30)
 * @param source - Price source (default: 'close')
 * @returns KAMA values array
 */
export declare function kama(data: MarketData | number[], length?: number, fastPeriod?: number, slowPeriod?: number, source?: string): number[];
//# sourceMappingURL=kama.d.ts.map