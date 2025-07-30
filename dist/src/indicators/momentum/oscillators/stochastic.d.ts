import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Stochastic Oscillator values using wrapper function
 *
 * @param data - Market data
 * @param kLength - K line period (default: 14)
 * @param dLength - D line period (default: 3)
 * @returns Stochastic K and D values
 */
export declare function stochastic(data: MarketData, kLength?: number, dLength?: number): {
    k: number[];
    d: number[];
};
//# sourceMappingURL=stochastic.d.ts.map