/**
 * Momentum - measures price momentum over specified period
 * Formula: Momentum = Current Price - Price n periods ago
 *
 * @param data - Source data array
 * @param length - Lookback period
 * @returns Momentum values array
 *
 * @example
 * ```typescript
 * const momentum = calculateMomentum(data.close, 10)
 * // Returns: [NaN, NaN, ..., 2.5, 1.8, ...]
 * ```
 */
export declare function calculateMomentum(data: number[], length: number): number[];
/**
 * Rate of Change (ROC) - measures the speed and magnitude of price changes
 * Formula: ROC = ((Current Price - Price n periods ago) / Price n periods ago) × 100
 *
 * @param data - Source data array
 * @param length - Lookback period
 * @returns ROC values array
 *
 * @example
 * ```typescript
 * const roc = calculateROC(data.close, 10)
 * // Returns: [NaN, NaN, ..., 5.2, -2.1, ...]
 * ```
 */
export declare function calculateROC(data: number[], length: number): number[];
/**
 * Percentage Price Oscillator (PPO) - momentum indicator showing price momentum
 * Formula: PPO = ((Fast EMA - Slow EMA) / Slow EMA) × 100
 *
 * @param data - Source data array
 * @param fastLength - Fast EMA period
 * @param slowLength - Slow EMA period
 * @returns PPO values array
 *
 * @example
 * ```typescript
 * const ppo = calculatePPO(data.close, 12, 26)
 * // Returns: [NaN, NaN, ..., 0.5, 0.8, ...]
 * ```
 */
export declare function calculatePPO(data: number[], fastLength: number, slowLength: number): number[];
/**
 * Calculate TRIX oscillator values
 *
 * TRIX is a momentum oscillator that shows the percentage rate of change of a triple exponentially smoothed moving average.
 * Formula: TRIX = 100 * (EMA3 - EMA3[1]) / EMA3[1]
 *
 * @param data - Price array
 * @param length - Calculation period (default: 18)
 * @returns TRIX values array
 */
export declare function calculateTRIX(data: number[], length?: number): number[];
/**
 * Calculate True Strength Index (TSI) oscillator values
 *
 * TSI is a momentum oscillator that shows both trend direction and overbought/oversold conditions.
 * Formula: TSI = 100 * (PC / APC) where PC = EMA(EMA(price - price[1])) and APC = EMA(EMA(abs(price - price[1])))
 *
 * @param data - Price array
 * @param firstLength - First smoothing period (default: 25)
 * @param secondLength - Second smoothing period (default: 13)
 * @returns TSI values array
 */
export declare function calculateTSI(data: number[], firstLength?: number, secondLength?: number): number[];
/**
 * Calculate Twiggs Momentum oscillator values
 *
 * Twiggs Momentum is a trend-following indicator that measures the rate of change in price.
 * Formula: TM = EMA(price - price[n]) where n is the lookback period
 * Uses exponential smoothing to reduce noise and identify trend direction.
 *
 * @param data - Price array
 * @param length - Calculation period (default: 20)
 * @param lookback - Lookback period (default: 10)
 * @returns Twiggs Momentum values array
 */
export declare function calculateTwiggsMomentum(data: number[], length?: number, lookback?: number): number[];
/**
 * Calculate EMA difference (Fast EMA - Slow EMA)
 *
 * @param data - Source data array
 * @param fastLength - Fast EMA period
 * @param slowLength - Slow EMA period
 * @returns EMA difference values array
 */
export declare function calculateEMADifference(data: number[], fastLength: number, slowLength: number): number[];
/**
 * Calculate log returns from price data
 *
 * @param prices - Array of prices
 * @returns Array of log returns
 */
export declare function calculateLogReturns(prices: number[]): number[];
//# sourceMappingURL=momentum.d.ts.map