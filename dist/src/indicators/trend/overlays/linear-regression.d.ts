import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Linear Regression Result
 */
export interface LinearRegressionResult {
    slope: number;
    intercept: number;
    rSquared: number;
    forecast: number;
    upperBand: number;
    lowerBand: number;
}
/**
 * Linear Regression Indicator
 *
 * Calculates linear regression line and related statistics.
 * Formula: y = mx + b where m is slope and b is intercept
 * Provides trend analysis, forecasting, and confidence bands.
 *
 * @example
 * ```typescript
 * const lr = linearRegression(data, 20)
 * console.log(lr.slope) // Trend slope
 * console.log(lr.forecast) // Forecasted values
 * ```
 */
export declare class LinearRegressionIndicator extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateLinearRegression;
}
/**
 * Calculate Linear Regression using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns Linear regression results
 */
export declare function linearRegression(data: MarketData | number[], length?: number, source?: string): {
    forecast: number[];
    slope: number[];
    intercept: number[];
    rSquared: number[];
    upperBand: number[];
    lowerBand: number[];
};
//# sourceMappingURL=linear-regression.d.ts.map