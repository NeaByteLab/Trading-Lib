import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate VWAP values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns VWAP values array
 */
export declare function vwap(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=vwap.d.ts.map