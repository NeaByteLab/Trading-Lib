import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Ultimate Oscillator Indicator
 *
 * Combines buying and selling pressure across multiple timeframes.
 * Uses weighted averages to identify overbought/oversold conditions.
 * Higher values indicate stronger buying pressure.
 *
 * @example
 * ```typescript
 * const ultimate = new UltimateOscillator()
 * const result = ultimate.calculate(marketData, { period1: 7, period2: 14, period3: 28 })
 * console.log(result.values) // Ultimate Oscillator values
 * ```
 */
export declare class UltimateOscillator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Ultimate Oscillator using wrapper function
 *
 * @param data - Market data with OHLC arrays
 * @param period1 - First timeframe period (default: 7)
 * @param period2 - Second timeframe period (default: 14)
 * @param period3 - Third timeframe period (default: 28)
 * @param weight1 - Weight for first timeframe (default: 4)
 * @param weight2 - Weight for second timeframe (default: 2)
 * @param weight3 - Weight for third timeframe (default: 1)
 * @returns Array of Ultimate Oscillator values
 */
export declare function ultimateOscillator(data: MarketData, period1?: number, period2?: number, period3?: number, weight1?: number, weight2?: number, weight3?: number): number[];
//# sourceMappingURL=ultimate-oscillator.d.ts.map