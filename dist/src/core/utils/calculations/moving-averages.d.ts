/**
 * Moving Average - calculates various types of moving averages
 * Formula: SMA = Σ(Price) / n, EMA = Price × α + Previous EMA × (1 - α)
 *
 * @param data - Source data array
 * @param length - Moving average period
 * @param type - Moving average type (default: 'sma')
 * @returns Array of moving average values
 * @throws {Error} If data is empty or length is invalid
 *
 * @example
 * ```typescript
 * const sma = movingAverage(data.close, 20, 'sma')
 * const ema = movingAverage(data.close, 20, 'ema')
 * // Returns: [NaN, NaN, ..., 45.2, 45.8, ...]
 * ```
 */
export declare function movingAverage(data: number[], length: number, type?: 'sma' | 'ema' | 'wma' | 'hull' | 'rma'): number[];
/**
 * Wilder's Smoothing with numerical stability
 *
 * @param data - Source data array
 * @param length - Smoothing period
 * @returns Smoothed values array
 */
export declare function wildersSmoothing(data: number[], length: number): number[];
/**
 * Apply exponential smoothing to data
 *
 * @param data - Source data array
 * @param alpha - Smoothing factor (0-1)
 * @returns Smoothed data array
 */
export declare function exponentialSmoothing(data: number[], alpha: number): number[];
/**
 * Calculate vectorized moving average with improved cache locality
 * Optimized for SIMD operations and reduced memory access patterns
 *
 * @param data - Input data array
 * @param length - Window length
 * @param type - Moving average type
 * @returns Optimized moving average values
 */
export declare function calculateOptimizedMovingAverage(data: number[], length: number, type: 'sma' | 'ema' | 'wma'): number[];
/**
 * Calculate Kaufman Adaptive Moving Average (KAMA)
 *
 * KAMA adapts to market conditions by adjusting its smoothing factor.
 * It's more responsive in trending markets and smoother in sideways markets.
 *
 * Formula: KAMA = KAMA(prev) + SC * (Price - KAMA(prev))
 * SC = (ER * (Fast - Slow) + Slow)^2
 * ER = |Price - Price(n)| / Sum(|Price - Price(i)|)
 *
 * @param data - Source data array
 * @param length - KAMA period
 * @param fastPeriod - Fast EMA period (default: 2)
 * @param slowPeriod - Slow EMA period (default: 30)
 * @returns KAMA values array
 * @throws {Error} If data is empty or length is invalid
 */
export declare function calculateKAMA(data: number[], length: number, fastPeriod?: number, slowPeriod?: number): number[];
/**
 * Calculate Variable Index Dynamic Average (VIDYA)
 *
 * VIDYA = Price × α + Previous VIDYA × (1 - α)
 * where α = 2 / (Length + 1) × (1 + CMO)
 * CMO = (Sum of gains - Sum of losses) / (Sum of gains + Sum of losses)
 *
 * @param data - Source data array
 * @param length - VIDYA period (default: 14)
 * @param cmoLength - CMO calculation period (default: 9)
 * @returns VIDYA values array
 * @throws {Error} If data is empty or length is invalid
 */
export declare function calculateVIDYA(data: number[], length?: number, cmoLength?: number): number[];
//# sourceMappingURL=moving-averages.d.ts.map