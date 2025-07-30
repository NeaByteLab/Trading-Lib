import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Percentage Price Oscillator (PPO) values
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @param signalLength - Signal line period (default: 9)
 * @returns Object with PPO, signal, and histogram values
 */
export declare function percentagePriceOscillator(data: MarketData | number[], fastLength?: number, slowLength?: number, signalLength?: number): {
    ppo: number[];
    signal: number[];
    histogram: number[];
};
/**
 * Calculate PPO values using wrapper function
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @param signalLength - Signal line period (default: 9)
 * @param source - Price source (default: 'close')
 * @returns PPO values array
 */
export declare function ppo(data: MarketData | number[], fastLength?: number, slowLength?: number, signalLength?: number, source?: string): number[];
//# sourceMappingURL=ppo.d.ts.map