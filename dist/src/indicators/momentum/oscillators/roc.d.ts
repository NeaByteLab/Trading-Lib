import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Rate of Change (ROC) indicator
 *
 * A momentum oscillator that measures the percentage change in price over a specified period.
 * Formula: ROC = ((Current Price - Price n periods ago) / Price n periods ago) × 100
 *
 * @example
 * ```typescript
 * const roc = new ROC()
 * const result = roc.calculate(marketData, { length: 14 })
 * console.log(result.values) // ROC values
 * ```
 */
export declare class ROC extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateROC;
}
/**
 * Calculate ROC values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'close')
 * @returns ROC values array
 */
export declare function roc(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=roc.d.ts.map