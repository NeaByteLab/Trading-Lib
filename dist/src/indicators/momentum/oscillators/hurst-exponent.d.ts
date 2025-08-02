import { OscillatorIndicator } from '@core/base/oscillator-indicator';
import type { MarketData } from '@core/types/indicator-types';
/**
 * Hurst Exponent Indicator
 *
 * Calculates the Hurst exponent to determine if a time series is trending, mean-reverting, or random.
 * Formula: H = log(R/S) / log(n) where R is the range and S is the standard deviation
 * - H > 0.5: Trending (persistent)
 * - H = 0.5: Random walk
 * - H < 0.5: Mean-reverting (anti-persistent)
 *
 * @example
 * ```typescript
 * const hurst = hurstExponent(data, 20)
 * console.log(hurst) // Hurst exponent values
 * ```
 */
export declare class HurstExponentIndicator extends OscillatorIndicator {
    constructor();
    protected calculateOscillator(data: number[], length: number): number[];
    private calculateHurstExponent;
    private calculateCumulativeReturns;
}
/**
 * Calculate Hurst Exponent using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns Hurst exponent values array
 */
export declare function hurstExponent(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=hurst-exponent.d.ts.map