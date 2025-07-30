import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Chande Momentum Oscillator using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'close')
 * @returns CMO values array
 */
export declare function cmo(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=cmo.d.ts.map