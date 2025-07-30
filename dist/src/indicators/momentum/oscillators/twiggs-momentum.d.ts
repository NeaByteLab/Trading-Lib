import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Twiggs Momentum oscillator values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param lookback - Lookback period (default: 10)
 * @param source - Price source (default: 'close')
 * @returns Twiggs Momentum values array
 */
export declare function twiggsMomentum(data: MarketData | number[], length?: number, lookback?: number, source?: string): number[];
//# sourceMappingURL=twiggs-momentum.d.ts.map