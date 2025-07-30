import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Williams %R indicator
 *
 * A momentum oscillator that measures overbought and oversold levels.
 * Formula: %R = ((Highest High - Close) / (Highest High - Lowest Low)) × -100
 *
 * @example
 * ```typescript
 * const williamsR = new WilliamsR()
 * const result = williamsR.calculate(marketData, { length: 14 })
 * console.log(result.values) // Williams %R values (-100 to 0)
 * ```
 */
export declare class WilliamsR extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateWilliamsR;
}
/**
 * Calculate Williams %R values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Williams %R values array
 */
export declare function williamsR(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=williams-r.d.ts.map