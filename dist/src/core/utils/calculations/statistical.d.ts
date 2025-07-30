/**
 * Calculate mean with numerical stability
 *
 * @param values - Array of values
 * @returns Mean value
 * @throws {Error} If values array is empty
 */
export declare function calculateMean(values: number[]): number;
/**
 * Calculate variance with numerical stability using two-pass algorithm
 *
 * @param values - Array of values
 * @returns Variance value
 * @throws {Error} If values array is empty
 */
export declare function calculateVariance(values: number[]): number;
/**
 * Calculate standard deviation with numerical stability
 *
 * @param values - Array of values
 * @returns Standard deviation value
 * @throws {Error} If values array is empty
 */
export declare function calculateStandardDeviation(values: number[]): number;
/**
 * Create rolling window from array
 *
 * @param data - Source array
 * @param windowSize - Size of rolling window
 * @returns Array of window arrays
 */
export declare function rollingWindow<T>(data: T[], windowSize: number): T[][];
/**
 * Calculate rolling statistic
 *
 * @param data - Source array
 * @param windowSize - Window size
 * @param statistic - Statistic type
 * @returns Array of rolling statistics
 */
export declare function calculateRollingStatistic(data: number[], windowSize: number, statistic: 'mean' | 'median' | 'min' | 'max' | 'sum'): number[];
/**
 * Find k-th smallest element using quickselect algorithm
 *
 * @param array - Input array
 * @param k - Position (0-based index)
 * @returns K-th smallest element
 * @throws {Error} If array is empty or k is out of bounds
 */
export declare function kthSmallest(array: number[], k: number): number;
/**
 * Find k-th largest element using quickselect algorithm
 *
 * @param array - Input array
 * @param k - Position (0-based index)
 * @returns K-th largest element
 * @throws {Error} If array is empty or k is out of bounds
 */
export declare function kthLargest(array: number[], k: number): number;
/**
 * Calculate median using k-selection algorithm
 *
 * @param array - Input array
 * @returns Median value
 * @throws {Error} If array is empty
 */
export declare function calculateMedian(array: number[]): number;
/**
 * Calculate percentile using k-selection algorithm
 *
 * @param array - Input array
 * @param percentile - Percentile value (0-100)
 * @returns Percentile value
 * @throws {Error} If array is empty or percentile is out of range
 */
export declare function calculatePercentile(array: number[], percentile: number): number;
/**
 * Calculate Shannon Entropy using centralized utilities
 *
 * @param data - Source data array
 * @param length - Calculation period
 * @param bins - Number of bins for discretization
 * @returns Shannon entropy values array
 */
export declare function calculateShannonEntropy(data: number[], length: number, bins?: number): number[];
//# sourceMappingURL=statistical.d.ts.map