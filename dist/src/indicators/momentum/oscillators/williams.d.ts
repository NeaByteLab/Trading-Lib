import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Williams %R values using wrapper function
 *
 * @param data - Market data
 * @param length - Period length (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Williams %R values
 */
export declare function williamsR(data: MarketData, length?: number, source?: string): number[];
//# sourceMappingURL=williams.d.ts.map