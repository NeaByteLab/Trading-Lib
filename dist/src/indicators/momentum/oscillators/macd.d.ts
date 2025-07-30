import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * MACD (Moving Average Convergence Divergence) indicator
 *
 * Calculates MACD line, signal line, and histogram using exponential moving averages.
 * MACD = Fast EMA - Slow EMA, Signal = EMA of MACD, Histogram = MACD - Signal
 *
 * @example
 * ```typescript
 * const macd = new MACD()
 * const result = macd.calculate(marketData, { fastLength: 12, slowLength: 26, signalLength: 9 })
 * console.log(result.values) // MACD line values
 * console.log(result.metadata.signal) // Signal line values
 * console.log(result.metadata.histogram) // Histogram values
 * ```
 */
export declare class MACD extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateMACD;
}
/**
 * Calculate MACD values using wrapper function
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @param signalLength - Signal EMA period (default: 9)
 * @param source - Price source (default: 'close')
 * @returns Object with macd, signal, and histogram arrays
 */
export declare function macd(data: MarketData | number[], fastLength?: number, slowLength?: number, signalLength?: number, source?: string): {
    macd: number[];
    signal: number[];
    histogram: number[];
};
//# sourceMappingURL=macd.d.ts.map