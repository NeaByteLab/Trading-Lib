import type { MarketData } from '@core/types/indicator-types';
/**
 * MACD (Moving Average Convergence Divergence) - trend-following momentum indicator
 * Formula: MACD = Fast EMA - Slow EMA, Signal = EMA(MACD), Histogram = MACD - Signal
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @param signalLength - Signal EMA period (default: 9)
 * @param source - Price source (default: 'close')
 * @returns Object with macd, signal, and histogram arrays
 *
 * @example
 * ```typescript
 * const macd = ta.macd(data.close, 12, 26, 9)
 * // Returns: { macd: [...], signal: [...], histogram: [...] }
 * ```
 */
export declare function macd(data: MarketData | number[], fastLength?: number, slowLength?: number, signalLength?: number, _source?: string): {
    macd: number[];
    signal: number[];
    histogram: number[];
};
//# sourceMappingURL=macd.d.ts.map