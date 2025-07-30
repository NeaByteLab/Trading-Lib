import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate VWMA values using wrapper function
 *
 * @param data - Market data
 * @param length - Moving average period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns VWMA values array
 */
export declare function vwma(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=vwma.d.ts.map