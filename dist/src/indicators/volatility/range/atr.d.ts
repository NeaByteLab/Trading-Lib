import { VolatilityIndicator } from '@base/volatility-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Average True Range (ATR) Indicator
 *
 * Measures market volatility by calculating the average of true range values.
 * True range is the greatest of: current high-low, |current high - previous close|, |current low - previous close|.
 * Higher ATR values indicate higher volatility.
 *
 * @example
 * ```typescript
 * const atr = new ATRIndicator()
 * const result = atr.calculate(marketData, { length: 14 })
 * console.log(result.values) // ATR values
 * ```
 */
export declare class ATRIndicator extends VolatilityIndicator {
    constructor();
    protected calculateVolatility(_data: number[], _length: number, _multiplier: number): number[];
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Average True Range (ATR) using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @param length - Calculation period (default: 14)
 * @returns ATR values array
 */
export declare function atr(data: MarketData, length?: number): number[];
//# sourceMappingURL=atr.d.ts.map