import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Keltner Channel indicator
 *
 * A volatility-based indicator that uses ATR to create dynamic support and resistance levels.
 * Formula: Middle = EMA, Upper = Middle + (Multiplier × ATR), Lower = Middle - (Multiplier × ATR)
 *
 * @example
 * ```typescript
 * const keltner = new KeltnerChannel()
 * const result = keltner.calculate(marketData, { length: 20, multiplier: 2 })
 * console.log(result.values) // Middle band (EMA)
 * console.log(result.metadata.upper) // Upper band
 * console.log(result.metadata.lower) // Lower band
 * ```
 */
export declare class KeltnerChannel extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateKeltnerChannel;
}
/**
 * Calculate Keltner Channel values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param multiplier - ATR multiplier (default: 2)
 * @param source - Price source (default: 'close')
 * @returns Upper, middle, and lower bands
 */
export declare function keltnerChannel(data: MarketData | number[], length?: number, multiplier?: number, source?: string): {
    upper: number[];
    middle: number[];
    lower: number[];
};
//# sourceMappingURL=keltner-channel.d.ts.map