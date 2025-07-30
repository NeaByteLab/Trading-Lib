import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate K-Nearest Neighbors Classifier
 *
 * KNN classifier for market regime classification based on price patterns.
 * Uses Euclidean distance to find nearest neighbors and classify current state.
 *
 * @param data - Market data
 * @param k - Number of neighbors (default: 5)
 * @param lookback - Lookback period for pattern matching (default: 20)
 * @param features - Number of features to extract (default: 5)
 * @returns KNN classification values array
 * @throws {Error} If data is empty or parameters are invalid
 */
export declare function calculateKNNClassifier(data: MarketData, k?: number, lookback?: number, features?: number): number[];
//# sourceMappingURL=ml.d.ts.map