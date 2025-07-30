import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Market Regime Classifier
 *
 * Uses machine learning techniques to classify market conditions into different regimes:
 * 0 = Ranging/Low Volatility, 1 = Trending, 2 = High Volatility, 3 = Reversal
 *
 * @example
 * ```typescript
 * const regime = new MarketRegimeClassifier()
 * const result = regime.calculate(marketData, { length: 20, threshold: 0.6 })
 * console.log(result.values) // Regime classification values
 * ```
 */
export declare class MarketRegimeClassifier extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateRegimeClassification;
}
/**
 * Calculate Market Regime Classification values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param threshold - Classification threshold (default: 0.6)
 * @returns Market regime classification values array
 */
export declare function marketRegimeClassifier(data: MarketData, length?: number, threshold?: number): number[];
//# sourceMappingURL=mrc.d.ts.map