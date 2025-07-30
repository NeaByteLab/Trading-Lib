import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate CCI values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'hlc3')
 * @returns CCI values array
 */
export declare function cci(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=cci.d.ts.map