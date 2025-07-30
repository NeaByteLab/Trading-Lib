import type { MarketData } from '@core/types/indicator-types';
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
export declare function macd(data: MarketData | number[], fastLength?: number, slowLength?: number, signalLength?: number, _source?: string): {
    macd: number[];
    signal: number[];
    histogram: number[];
};
//# sourceMappingURL=macd.d.ts.map