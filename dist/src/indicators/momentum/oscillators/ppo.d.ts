import type { MarketData } from '@core/types/indicator-types';
/**
 * Percentage Price Oscillator (PPO) - momentum indicator showing price momentum
 * Formula: PPO = ((Fast EMA - Slow EMA) / Slow EMA) × 100
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @param signalLength - Signal line period (default: 9)
 * @returns Object with PPO, signal, and histogram values
 *
 * @example
 * ```typescript
 * const ppo = ta.ppo(data.close, 12, 26, 9)
 * // Returns: { ppo: [...], signal: [...], histogram: [...] }
 * ```
 */
export declare function percentagePriceOscillator(data: MarketData | number[], fastLength?: number, slowLength?: number, signalLength?: number): {
    ppo: number[];
    signal: number[];
    histogram: number[];
};
/**
 * Percentage Price Oscillator (PPO) - momentum indicator showing price momentum
 * Formula: PPO = ((Fast EMA - Slow EMA) / Slow EMA) × 100
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @param signalLength - Signal line period (default: 9)
 * @param source - Price source (default: 'close')
 * @returns PPO values array
 *
 * @example
 * ```typescript
 * const ppo = ta.ppo(data.close, 12, 26, 9)
 * // Returns: [0.5, 0.8, ..., 2.1, 1.9, ...]
 * ```
 */
export declare function ppo(data: MarketData | number[], fastLength?: number, slowLength?: number, signalLength?: number, source?: string): number[];
//# sourceMappingURL=ppo.d.ts.map