import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * K-Nearest Neighbors Classifier indicator
 *
 * KNN classifier for market regime classification based on price patterns.
 * Uses Euclidean distance to find nearest neighbors and classify current state.
 */
export declare class KNNClassifier extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate KNN Classifier values using wrapper function
 *
 * @param data - Market data
 * @param k - Number of neighbors (default: 5)
 * @param lookback - Lookback period for pattern matching (default: 20)
 * @param features - Number of features to extract (default: 5)
 * @returns KNN classification values array
 */
export declare function knn(data: MarketData, k?: number, lookback?: number, features?: number): number[];
//# sourceMappingURL=knn.d.ts.map