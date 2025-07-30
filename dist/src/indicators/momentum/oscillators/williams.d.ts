import { OscillatorIndicator } from '@base/oscillator-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Williams %R Indicator
 *
 * Measures overbought/oversold levels using the relationship between close price and the highest high/lowest low over a period.
 * Values range from 0 to -100, with -80 to -100 indicating oversold and 0 to -20 indicating overbought.
 * Formula: Williams %R = ((Highest High - Close) / (Highest High - Lowest Low)) × -100
 *
 * @example
 * ```typescript
 * const williams = new WilliamsRIndicator()
 * const result = williams.calculate(marketData, { length: 14 })
 * console.log(result.values) // Williams %R values
 * ```
 */
export declare class WilliamsRIndicator extends OscillatorIndicator {
    constructor();
    protected calculateOscillator(_data: number[], _length: number): number[];
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Williams %R using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @param length - Lookback period (default: 14)
 * @returns Williams %R values array
 */
export declare function williamsR(data: MarketData, length?: number): number[];
//# sourceMappingURL=williams.d.ts.map