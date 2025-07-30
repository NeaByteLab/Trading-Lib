import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Average True Range (ATR) indicator
 *
 * Measures market volatility by calculating the average of true ranges over a period.
 * Formula: ATR = Wilder's Smoothing(True Range) over period
 *
 * @example
 * ```typescript
 * const atr = new ATR()
 * const result = atr.calculate(marketData, { length: 14 })
 * console.log(result.values) // ATR values
 * ```
 */
export declare class ATR extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateATR;
}
/**
 * Calculate ATR values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns ATR values array
 */
export declare function atr(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=atr.d.ts.map