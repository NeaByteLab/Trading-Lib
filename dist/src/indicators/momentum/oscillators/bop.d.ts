import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Balance of Power values using wrapper function
 *
 * @param data - Market data
 * @param length - Period length (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Balance of Power values
 */
export declare function balanceOfPower(data: MarketData, length?: number, source?: string): number[];
//# sourceMappingURL=bop.d.ts.map