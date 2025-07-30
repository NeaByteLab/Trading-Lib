/**
 * Unified moving average function with DRY principle
 *
 * Provides all moving average types using centralized calculation utilities.
 * Eliminates code duplication and ensures consistent algorithms.
 *
 * @param data - Source data array
 * @param length - Window length for calculation
 * @param type - Moving average type ('sma', 'ema', 'wma', 'hull')
 * @returns Array of moving average values
 * @throws {Error} If data is not an array or length is invalid
 *
 * @example
 * ```typescript
 * const prices = [100, 101, 102, 103, 104, 105]
 * const sma = movingAverage(prices, 3, 'sma')
 * const ema = movingAverage(prices, 3, 'ema')
 * ```
 */
export declare function movingAverage(data: number[], length: number, type?: 'sma' | 'ema' | 'wma' | 'hull'): number[];
/**
 * Factory function for creating moving averages (legacy support)
 *
 * @param type - Moving average type
 * @returns Function that calculates the specified moving average
 */
export declare function createMovingAverage(type: 'sma' | 'ema' | 'wma' | 'hull'): (data: number[], length: number) => number[];
//# sourceMappingURL=index.d.ts.map