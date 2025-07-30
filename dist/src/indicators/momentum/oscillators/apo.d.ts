import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Absolute Price Oscillator values
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @returns APO values array
 */
export declare function apo(data: MarketData | number[], fastLength?: number, slowLength?: number): number[];
//# sourceMappingURL=apo.d.ts.map