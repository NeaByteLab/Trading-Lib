import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate CMF values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns CMF values array
 */
export declare function cmf(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=cmf.d.ts.map