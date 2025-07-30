import { OscillatorIndicator } from '@base/oscillator-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Shannon Entropy Indicator
 *
 * Calculates information entropy of price returns to measure market randomness.
 * Higher entropy indicates more random/unpredictable price movements.
 * Formula: H = -Σ(p(i) * log2(p(i))) where p(i) is probability of return in bin i
 *
 * @example
 * ```typescript
 * const shannon = new ShannonEntropyIndicator()
 * const result = shannon.calculate(marketData, { length: 20, bins: 8 })
 * console.log(result.values) // Entropy values
 * ```
 */
export declare class ShannonEntropyIndicator extends OscillatorIndicator {
    constructor();
    protected calculateOscillator(data: number[], length: number): number[];
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Shannon Entropy using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param bins - Number of bins for discretization (default: 8)
 * @param source - Price source (default: 'close')
 * @returns Shannon entropy values array
 */
export declare function shannon(data: MarketData | number[], length?: number, bins?: number, source?: string): number[];
//# sourceMappingURL=shannon.d.ts.map