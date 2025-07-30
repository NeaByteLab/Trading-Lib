import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Stochastic Oscillator indicator
 *
 * A momentum oscillator that compares a closing price to its price range over time.
 * Formula: %K = ((Close - Lowest Low) / (Highest High - Lowest Low)) × 100
 *
 * @example
 * ```typescript
 * const stochastic = new Stochastic()
 * const result = stochastic.calculate(marketData, { length: 14 })
 * console.log(result.values) // %K and %D values
 * ```
 */
export declare class Stochastic extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    /**
     * Calculate Stochastic Oscillator using centralized utilities
     *
     * @param data - Market data
     * @param kLength - %K period
     * @param dLength - %D period
     * @returns %K and %D values
     */
    private calculateStochastic;
}
/**
 * Calculate Stochastic Oscillator values using wrapper function
 *
 * @param data - Market data or price array
 * @param kLength - %K period (default: 14)
 * @param dLength - %D period (default: 3)
 * @param source - Price source (default: 'close')
 * @returns %K and %D values
 */
export declare function stochastic(data: MarketData | number[], kLength?: number, dLength?: number, source?: string): number[];
//# sourceMappingURL=stochastic.d.ts.map