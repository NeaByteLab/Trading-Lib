import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate VAMA values using wrapper function
 *
 * @param data - Market data
 * @param length - Moving average period (default: 20)
 * @param volumeThreshold - Minimum volume threshold (default: 0)
 * @param source - Price source (default: 'close')
 * @returns VAMA values array
 */
export declare function vama(data: MarketData | number[], length?: number, volumeThreshold?: number, source?: string): number[];
//# sourceMappingURL=vama.d.ts.map