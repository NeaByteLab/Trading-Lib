import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate MFI values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns MFI values array
 */
export declare function mfi(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=mfi.d.ts.map