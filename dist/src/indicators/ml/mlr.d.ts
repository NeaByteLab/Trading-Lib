import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Multiple Linear Regression Indicator
 *
 * Uses machine learning to predict price movements based on multiple features.
 * Combines returns, volatility, momentum, and volume for price prediction.
 *
 * @example
 * ```typescript
 * const mlr = new MultipleLinearRegression()
 * const result = mlr.calculate(marketData, { length: 20, lookback: 10 })
 * console.log(result.values) // Predicted values
 * ```
 */
export declare class MultipleLinearRegression extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateMLR;
    private calculateFeaturesSequential;
    private calculateCurrentFeatures;
    private calculateSingleFeature;
    private calculateVolatilitySequential;
    private calculateMomentumSequential;
    private calculateVolumeSequential;
}
/**
 * Calculate Multiple Linear Regression values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param lookback - Feature lookback period (default: 10)
 * @returns MLR predicted values array
 */
export declare function multipleLinearRegression(data: MarketData, length?: number, lookback?: number): number[];
//# sourceMappingURL=mlr.d.ts.map