import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Least Squares Moving Average (LSMA) Indicator
 *
 * Calculates moving average using linear regression to minimize squared errors.
 * Formula: LSMA = a + b × t where a is intercept and b is slope
 * Provides trend direction and momentum information.
 *
 * @example
 * ```typescript
 * const lsma = leastSquaresMA(data, 20)
 * console.log(lsma) // LSMA values
 * ```
 */
export declare class LSMAIndicator extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateLSMA;
}
/**
 * Calculate Least Squares Moving Average using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns LSMA values array
 */
export declare function leastSquaresMA(data: MarketData | number[], length?: number, source?: string): number[];
export declare const lsma: typeof leastSquaresMA;
//# sourceMappingURL=lsma.d.ts.map