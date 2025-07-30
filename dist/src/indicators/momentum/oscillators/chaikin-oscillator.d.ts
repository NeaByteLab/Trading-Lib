import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Chaikin Oscillator Indicator
 *
 * Combines price and volume to measure momentum by calculating the difference
 * between fast and slow EMAs of the Accumulation Distribution Line.
 * Positive values indicate buying pressure, negative values indicate selling pressure.
 *
 * @example
 * ```typescript
 * const chaikin = new ChaikinOscillator()
 * const result = chaikin.calculate(marketData, { fastLength: 3, slowLength: 10 })
 * console.log(result.values) // Chaikin Oscillator values
 * ```
 */
export declare class ChaikinOscillator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Chaikin Oscillator using wrapper function
 *
 * @param data - Market data with OHLCV
 * @param fastLength - Fast EMA period (default: 3)
 * @param slowLength - Slow EMA period (default: 10)
 * @returns Chaikin Oscillator values array
 */
export declare function chaikinOscillator(data: MarketData, fastLength?: number, slowLength?: number): number[];
//# sourceMappingURL=chaikin-oscillator.d.ts.map