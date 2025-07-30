import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate VROC values using wrapper function
 *
 * @param data - Market data
 * @param length - Lookback period (default: 14)
 * @param source - Price source (default: 'volume')
 * @returns VROC values array
 */
export declare function vroc(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=vroc.d.ts.map