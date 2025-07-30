import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Mass Index Indicator
 *
 * Identifies trend reversals by analyzing range expansion and contraction.
 * Formula: MI = Sum of EMA(High-Low) over 9 periods / EMA(EMA(High-Low)) over 9 periods
 *
 * @example
 * ```typescript
 * const massIndex = new MassIndex()
 * const result = massIndex.calculate(marketData, { length: 9 })
 * console.log(result.values) // Mass Index values
 * ```
 */
export declare class MassIndex extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateMassIndex;
    private calculateEMA;
}
/**
 * Calculate Mass Index values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 9)
 * @returns Mass Index values array
 */
export declare function massIndex(data: MarketData, length?: number): number[];
//# sourceMappingURL=mass-index.d.ts.map