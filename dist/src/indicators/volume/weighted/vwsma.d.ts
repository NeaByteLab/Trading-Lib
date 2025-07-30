import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate VWSMA values using wrapper function
 *
 * @param data - Market data
 * @param length - Moving average period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns VWSMA values array
 */
export declare function vwsma(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=vwsma.d.ts.map