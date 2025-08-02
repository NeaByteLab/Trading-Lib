/**
 * Arithmetic Mean - calculates the average of a set of values
 * Formula: Mean = Σ(Values) / n
 *
 * @param values - Array of values
 * @returns Mean value
 * @throws {Error} If values array is empty
 *
 * @example
 * ```typescript
 * const mean = calculateMean([1, 2, 3, 4, 5])
 * // Returns: 3
 * ```
 */
export declare function calculateMean(values: number[]): number;
/**
 * Variance - measures the spread of values around the mean
 * Formula: Variance = Σ((Value - Mean)²) / (n - 1)
 *
 * @param values - Array of values
 * @returns Variance value
 * @throws {Error} If values array is empty
 *
 * @example
 * ```typescript
 * const variance = calculateVariance([1, 2, 3, 4, 5])
 * // Returns: 2.5
 * ```
 */
export declare function calculateVariance(values: number[]): number;
/**
 * Standard Deviation - measures the dispersion of values around the mean
 * Formula: Standard Deviation = √(Variance)
 *
 * @param values - Array of values
 * @returns Standard deviation value
 * @throws {Error} If values array is empty
 *
 * @example
 * ```typescript
 * const std = calculateStandardDeviation([1, 2, 3, 4, 5])
 * // Returns: 1.5811388300841898
 * ```
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