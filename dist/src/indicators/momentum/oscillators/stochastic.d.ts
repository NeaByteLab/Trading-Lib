import type { MarketData } from '@core/types/indicator-types';
/**
 * Stochastic Oscillator - momentum indicator measuring price position within range
 * Formula: %K = ((Current Close - Lowest Low) / (Highest High - Lowest Low)) × 100
 * Formula: %D = SMA(%K, n periods)
 *
 * @param data - Market data
 * @param kLength - K line period (default: 14)
 * @param dLength - D line period (default: 3)
 * @returns Stochastic K and D values
 *
 * @example
 * ```typescript
 * const stoch = ta.stochastic(data, 14, 3)
 * // Returns: { k: [...], d: [...] }
 * ```
 */
export declare function stochastic(data: MarketData, kLength?: number, dLength?: number): {
    k: number[];
    d: number[];
};
//# sourceMappingURL=stochastic.d.ts.map