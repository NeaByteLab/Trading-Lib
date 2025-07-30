import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate Moving Average Oscillator values using wrapper function
 *
 * @param data - Market data or price array
 * @param fastLength - Fast MA period (default: 10)
 * @param slowLength - Slow MA period (default: 20)
 * @param maType - Moving average type (default: 'sma')
 * @param source - Price source (default: 'close')
 * @returns MAO values array
 */
export declare function movingAverageOscillator(data: MarketData | number[], fastLength?: number, slowLength?: number, maType?: 'sma' | 'ema' | 'wma' | 'hull', source?: string): number[];
//# sourceMappingURL=mao.d.ts.map