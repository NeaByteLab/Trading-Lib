import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Aroon Oscillator indicator
 *
 * Aroon Oscillator = Aroon Up - Aroon Down
 * Aroon Up = ((Period - Days Since High) / Period) × 100
 * Aroon Down = ((Period - Days Since Low) / Period) × 100
 *
 * @example
 * ```typescript
 * const aroon = new AroonOscillator()
 * const result = aroon.calculate(marketData, { length: 14 })
 * console.log(result.values) // Aroon Oscillator values
 * ```
 */
export declare class AroonOscillator extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateAroonOscillator;
}
/**
 * Calculate Aroon Oscillator values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Aroon Oscillator values array
 */
export declare function aroonOscillator(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=aroon-oscillator.d.ts.map