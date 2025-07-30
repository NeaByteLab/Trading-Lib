import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Displaced Moving Average Indicator
 *
 * A moving average that is shifted forward or backward in time.
 * Uses numerically stable calculation to prevent error propagation.
 * Useful for trend analysis and signal generation.
 *
 * @example
 * ```typescript
 * const displaced = new DisplacedMovingAverage()
 * const result = displaced.calculate(marketData, { length: 20, displacement: 5 })
 * console.log(result.values) // Displaced MA values
 * ```
 */
export declare class DisplacedMovingAverage extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Displaced Moving Average values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param displacement - Displacement amount (default: 0)
 * @param maType - Moving average type (default: 'sma')
 * @param source - Price source (default: 'close')
 * @returns Displaced MA values array
 */
export declare function displaced(data: MarketData | number[], length?: number, displacement?: number, maType?: 'sma' | 'ema' | 'wma' | 'hull', source?: string): number[];
//# sourceMappingURL=displaced.d.ts.map