import { BaseIndicator } from '@core/base/base-indicator';
import { calculateKNNClassifier } from '@core/utils/calculations/ml';
import { createIndicatorWrapper } from '@core/utils/indicator-utils';
import { pineLength } from '@core/utils/pine-script-utils';
/**
 * K-Nearest Neighbors Classifier indicator
 *
 * KNN classifier for market regime classification based on price patterns.
 * Uses Euclidean distance to find nearest neighbors and classify current state.
 */
export class KNNClassifier extends BaseIndicator {
    constructor() {
        super('KNN Classifier', 'K-Nearest Neighbors Classifier', 'ml');
    }
    validateInput(data, _config) {
        if (Array.isArray(data)) {
            throw new Error('KNN Classifier requires OHLCV data');
        }
        if (!data.volume) {
            throw new Error('Volume data is required for KNN Classifier');
        }
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const marketData = data;
        const k = pineLength(config?.['k'] || 5, 5);
        const lookback = pineLength(config?.['lookback'] || 20, 20);
        const features = pineLength(config?.['features'] || 5, 5);
        const values = calculateKNNClassifier(marketData, k, lookback, features);
        return {
            values,
            metadata: {
                length: lookback,
                k,
                lookback,
                features,
                source: 'hlc3'
            }
        };
    }
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
export function knn(data, k, lookback, features) {
    const config = {
        k: k || 5,
        lookback: lookback || 20,
        features: features || 5
    };
    return createIndicatorWrapper(KNNClassifier, data, undefined, undefined, config);
}
