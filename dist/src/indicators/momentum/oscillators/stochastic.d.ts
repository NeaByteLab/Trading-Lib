import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Stochastic Oscillator values using wrapper function
 *
 * @param data - Market data or price array
 * @param kLength - %K period (default: 14)
 * @param dLength - %D period (default: 3)
 * @param source - Price source (default: 'close')
 * @returns %K and %D values
 */
export declare function stochastic(data: MarketData | number[], kLength?: number, dLength?: number, source?: string): number[];
//# sourceMappingURL=stochastic.d.ts.map