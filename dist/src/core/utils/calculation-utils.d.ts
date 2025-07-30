/**
 * Price calculation utilities
 *
 * Provides centralized price calculation functions to eliminate code duplication.
 * All indicators should use these utilities instead of manual implementations.
 */
export declare const PriceCalculations: {
    /**
     * Calculate typical price (HLC3)
     *
     * @param data - Market data with high, low, close arrays
     * @returns Array of typical prices
     */
    typical(data: {
        high: number[];
        low: number[];
        close: number[];
    }): number[];
    /**
     * Calculate HL2 (High + Low) / 2
     *
     * @param data - Market data with high, low arrays
     * @returns Array of HL2 values
     */
    hl2(data: {
        high: number[];
        low: number[];
    }): number[];
    /**
     * Calculate OHLC4 (Open + High + Low + Close) / 4
     *
     * @param data - Market data with open, high, low, close arrays
     * @returns Array of OHLC4 values
     */
    ohlc4(data: {
        open: number[];
        high: number[];
        low: number[];
        close: number[];
    }): number[];
};
/**
 * Calculate mean of array
 *
 * @param values - Array of numbers
 * @returns Mean value
 * @throws {Error} If array is empty
 */
export declare function calculateMean(values: number[]): number;
/**
 * Calculate variance of array
 *
 * @param values - Array of numbers
 * @returns Variance value
 */
export declare function calculateVariance(values: number[]): number;
/**
 * Calculate standard deviation
 *
 * @param values - Array of values
 * @returns Standard deviation
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
 * Apply exponential smoothing to data
 *
 * @param data - Source data array
 * @param alpha - Smoothing factor (0-1)
 * @returns Smoothed data array
 */
export declare function exponentialSmoothing(data: number[], alpha: number): number[];
/**
 * Apply Wilder's smoothing to data
 *
 * @param data - Source data array
 * @param length - Smoothing period
 * @returns Smoothed data array
 */
export declare function wildersSmoothing(data: number[], length: number): number[];
/**
 * Safe division with fallback
 *
 * @param numerator - Numerator
 * @param denominator - Denominator
 * @param fallback - Fallback value if division by zero
 * @returns Division result or fallback
 */
export declare function safeDivision(numerator: number, denominator: number, fallback?: number): number;
/**
 * Fill NaN values with specified value
 *
 * @param data - Source array
 * @param fillValue - Value to fill NaN with
 * @returns Array with filled values
 */
export declare function fillNaN(data: number[], fillValue: number): number[];
/**
 * Shift array by specified amount
 *
 * @param data - Source array
 * @param offset - Shift amount
 * @returns Shifted array
 */
export declare function shiftArray(data: number[], offset: number): number[];
/**
 * Calculate RSI using centralized utilities
 *
 * @param data - Source data array
 * @param length - RSI period
 * @returns RSI values array
 */
export declare function calculateRSI(data: number[], length: number): number[];
/**
 * Calculate CCI using centralized utilities
 *
 * @param data - Source data array (should be typical prices HLC3)
 * @param length - CCI period
 * @returns CCI values array
 */
export declare function calculateCCI(data: number[], length: number): number[];
/**
 * Calculate CCI from OHLC data using typical prices
 *
 * @param data - Market data with high, low, close arrays
 * @param length - CCI period
 * @returns CCI values array
 */
export declare function calculateCCIFromOHLC(data: {
    high: number[];
    low: number[];
    close: number[];
}, length: number): number[];
/**
 * Calculate range percentage
 *
 * @param value - Current value
 * @param min - Minimum value
 * @param max - Maximum value
 * @param multiplier - Multiplier for percentage (default: 100)
 * @returns Range percentage
 */
export declare function calculateRangePercentage(value: number, min: number, max: number, multiplier?: number): number;
/**
 * Calculate high/low range for window
 *
 * @param highData - High prices array
 * @param lowData - Low prices array
 * @param currentIndex - Current index
 * @param windowSize - Window size
 * @returns Object with highest and lowest values
 */
export declare function calculateHighLowRange(highData: number[], lowData: number[], currentIndex: number, windowSize: number): {
    highest: number;
    lowest: number;
};
//# sourceMappingURL=calculation-utils.d.ts.map