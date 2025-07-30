import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Momentum indicator
 *
 * A simple momentum oscillator that measures the rate of change in price.
 * Formula: Momentum = Current Price - Price n periods ago
 *
 * @example
 * ```typescript
 * const momentum = new Momentum()
 * const result = momentum.calculate(marketData, { length: 10 })
 * console.log(result.values) // Momentum values
 * ```
 */
export declare class Momentum extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateMomentum;
}
/**
 * Calculate Momentum values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 10)
 * @param source - Price source (default: 'close')
 * @returns Momentum values array
 */
export declare function momentum(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=momentum.d.ts.map