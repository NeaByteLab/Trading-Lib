import { ERROR_MESSAGES } from '@core/constants/indicator-constants';
import { ArrayUtils } from '@core/utils/array-utils';
import { MathUtils } from '@core/utils/math-utils';
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
export function calculateKNNClassifier(data, k = 5, lookback = 20, features = 5) {
    if (!data || !data.close || data.close.length === 0) {
        throw new Error(ERROR_MESSAGES.EMPTY_DATA);
    }
    if (k <= 0) {
        throw new Error('K must be positive');
    }
    if (lookback <= 0) {
        throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
    if (features <= 0) {
        throw new Error('Features must be positive');
    }
    const { close, high, low, volume } = data;
    const result = [];
    for (let i = lookback; i < close.length; i++) {
        const currentFeatures = extractFeatures(close, high, low, volume || [], i, features);
        const neighbors = findNearestNeighbors(close, i, lookback, currentFeatures, k);
        const classification = classifyFromNeighbors(neighbors);
        result.push(classification);
    }
    return result;
}
/**
 * Extract features from market data for KNN classification
 *
 * @param close - Close prices array
 * @param high - High prices array
 * @param low - Low prices array
 * @param volume - Volume array
 * @param index - Current index
 * @param features - Number of features to extract
 * @returns Feature array
 */
function extractFeatures(close, high, low, volume, index, features) {
    const featureVector = [];
    const window = close.slice(index - features + 1, index + 1);
    const returns = ArrayUtils.processArray(window, (price, i) => {
        if (i === 0) {
            return 0;
        }
        const previous = window[i - 1];
        return previous === 0 ? 0 : (price - previous) / previous;
    });
    const volatility = calculateVolatility(window);
    const volumeRatio = volume[index] / MathUtils.average(volume.slice(index - features + 1, index + 1));
    const priceRange = (high[index] - low[index]) / close[index];
    featureVector.push(...returns.slice(-features));
    featureVector.push(volatility);
    featureVector.push(volumeRatio);
    featureVector.push(priceRange);
    return featureVector;
}
/**
 * Calculate volatility for feature extraction
 *
 * @param prices - Price array
 * @returns Volatility value
 */
function calculateVolatility(prices) {
    if (prices.length < 2) {
        return 0;
    }
    const returns = ArrayUtils.processArray(prices, (price, i) => {
        if (i === 0) {
            return 0;
        }
        const previous = prices[i - 1];
        return previous === 0 ? 0 : (price - previous) / previous;
    });
    const mean = MathUtils.average(returns);
    const variance = returns.reduce((sum, ret) => sum + MathUtils.pow(ret - mean, 2), 0) / returns.length;
    return MathUtils.sqrt(variance);
}
/**
 * Find nearest neighbors using Euclidean distance
 *
 * @param close - Close prices array
 * @param currentIndex - Current index
 * @param lookback - Lookback period
 * @param currentFeatures - Current feature vector
 * @param k - Number of neighbors
 * @returns Array of neighbor indices
 */
function findNearestNeighbors(close, currentIndex, lookback, currentFeatures, k) {
    const distances = [];
    for (let i = lookback; i < currentIndex; i++) {
        const historicalFeatures = extractFeatures(close, close, close, close, i, currentFeatures.length);
        const distance = calculateEuclideanDistance(currentFeatures, historicalFeatures);
        distances.push({ index: i, distance });
    }
    distances.sort((a, b) => a.distance - b.distance);
    return distances.slice(0, k).map(d => d.index);
}
/**
 * Calculate Euclidean distance between two feature vectors
 *
 * @param features1 - First feature vector
 * @param features2 - Second feature vector
 * @returns Euclidean distance
 */
function calculateEuclideanDistance(features1, features2) {
    if (features1.length !== features2.length) {
        return Infinity;
    }
    const sum = features1.reduce((acc, feature, i) => {
        return acc + MathUtils.pow(feature - features2[i], 2);
    }, 0);
    return MathUtils.sqrt(sum);
}
/**
 * Classify current state based on nearest neighbors
 *
 * @param neighbors - Array of neighbor indices
 * @returns Classification value (0-1)
 */
function classifyFromNeighbors(neighbors) {
    if (neighbors.length === 0) {
        return 0.5;
    }
    const validNeighbors = neighbors.filter(n => !isNaN(n) && isFinite(n));
    if (validNeighbors.length === 0) {
        return 0.5;
    }
    const avgIndex = MathUtils.average(validNeighbors);
    return MathUtils.clamp(avgIndex / 100, 0, 1);
}
