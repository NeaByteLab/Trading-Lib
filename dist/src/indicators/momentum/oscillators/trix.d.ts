import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate TRIX oscillator values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 18)
 * @param source - Price source (default: 'close')
 * @returns TRIX values array
 */
export declare function trix(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=trix.d.ts.map