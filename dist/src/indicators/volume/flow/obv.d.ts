import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate OBV values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 1)
 * @param source - Price source (default: 'close')
 * @returns OBV values array
 */
export declare function obv(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=obv.d.ts.map