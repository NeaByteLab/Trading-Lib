import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate VPIN values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 50)
 * @param buckets - Number of volume buckets (default: 50)
 * @param source - Price source (default: 'volume')
 * @returns VPIN values array
 */
export declare function vpin(data: MarketData | number[], length?: number, buckets?: number, source?: string): number[];
//# sourceMappingURL=vpin.d.ts.map