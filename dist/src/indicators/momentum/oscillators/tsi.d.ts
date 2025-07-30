import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate TSI oscillator values using wrapper function
 *
 * @param data - Market data or price array
 * @param firstLength - First smoothing period (default: 25)
 * @param secondLength - Second smoothing period (default: 13)
 * @param source - Price source (default: 'close')
 * @returns TSI values array
 */
export declare function tsi(data: MarketData | number[], firstLength?: number, secondLength?: number, source?: string): number[];
//# sourceMappingURL=tsi.d.ts.map