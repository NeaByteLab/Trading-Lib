import type { MarketData } from '@core/types/indicator-types';
/**
 * Relative Strength Index - measures momentum and overbought/oversold conditions
 * Formula: RSI = 100 - (100 / (1 + RS)) where RS = Average Gain / Average Loss
 *
 * @param data - Source data array
 * @param length - RSI period
 * @returns RSI values array
 *
 * @example
 * ```typescript
 * const rsi = calculateRSI(data.close, 14)
 * // Returns: [NaN, NaN, ..., 65.2, 67.8, ...]
 * ```
 */
export declare function calculateRSI(data: number[], length: number): number[];
/**
 * Commodity Channel Index - measures cyclical trends and overbought/oversold conditions
 * Formula: CCI = (Typical Price - SMA) / (0.015 × Mean Deviation)
 *
 * @param data - Source data array (should be typical prices HLC3)
 * @param length - CCI period
 * @returns CCI values array
 *
 * @example
 * ```typescript
 * const cci = calculateCCI(data.hlc3, 20)
 * // Returns: [NaN, NaN, ..., 125.6, -89.3, ...]
 * ```
 */
export declare function calculateCCI(data: number[], length: number): number[];
/**
 * Commodity Channel Index from OHLC data - measures cyclical trends
 * Formula: CCI = (Typical Price - SMA) / (0.015 × Mean Deviation)
 *
 * @param data - Market data with high, low, close arrays
 * @param length - CCI period
 * @returns CCI values array
 *
 * @example
 * ```typescript
 * const cci = calculateCCIFromOHLC(data, 20)
 * // Returns: [NaN, NaN, ..., 125.6, -89.3, ...]
 * ```
 */
export declare function calculateCCIFromOHLC(data: {
    high: number[];
    low: number[];
    close: number[];
}, length: number): number[];
/**
 * Williams %R - momentum oscillator measuring overbought/oversold levels
 * Formula: %R = ((Highest High - Close) / (Highest High - Lowest Low)) × -100
 *
 * @param close - Close prices array
 * @param high - High prices array
 * @param low - Low prices array
 * @param length - Lookback period
 * @returns Williams %R values array
 *
 * @example
 * ```typescript
 * const williams = calculateWilliamsR(data.close, data.high, data.low, 14)
 * // Returns: [NaN, NaN, ..., -25.6, -18.9, ...]
 * ```
 */
export declare function calculateWilliamsR(close: number[], high: number[], low: number[], length: number): number[];
/**
 * Stochastic Oscillator - momentum indicator measuring price position within range
 * Formula: %K = ((Current Close - Lowest Low) / (Highest High - Lowest Low)) × 100
 *
 * @param data - Source data array
 * @param high - High prices array
 * @param low - Low prices array
 * @param length - Calculation period
 * @returns Stochastic values array
 * @throws {Error} If data is empty or length is invalid
 *
 * @example
 * ```typescript
 * const stoch = calculateStochastic(data.close, data.high, data.low, 14)
 * // Returns: [NaN, NaN, ..., 65.2, 72.8, ...]
 * ```
 */
export declare function calculateStochastic(data: number[], high: number[], low: number[], length: number): number[];
/**
 * Calculate Stochastic RSI using centralized utilities
 *
 * @param rsiValues - RSI values array
 * @param kLength - %K calculation period
 * @param dLength - %D calculation period
 * @returns Stochastic RSI values
 * @throws {Error} If data is empty or parameters are invalid
 */
export declare function calculateStochasticRSI(rsiValues: number[], kLength: number, dLength: number): {
    k: number[];
    d: number[];
};
/**
 * Calculate Chande Momentum Oscillator (CMO) using centralized utilities
 *
 * CMO is a momentum oscillator that measures the momentum of price changes.
 * Formula: CMO = 100 * (Sum of gains - Sum of losses) / (Sum of gains + Sum of losses)
 *
 * @param data - Source data array
 * @param length - Calculation period
 * @returns CMO values array
 * @throws {Error} If data is empty or length is invalid
 */
export declare function calculateCMO(data: number[], length: number): number[];
/**
 * Calculate Klinger Oscillator
 *
 * Klinger Oscillator combines price and volume to identify long-term trends.
 * Uses sum volume (SV) calculation to determine trend direction.
 *
 * @param data - Market data
 * @param shortPeriod - Short period (default: 34)
 * @param longPeriod - Long period (default: 55)
 * @returns Klinger Oscillator values array
 * @throws {Error} If data is empty or missing volume
 */
export declare function calculateKlingerOscillator(data: MarketData, shortPeriod?: number, longPeriod?: number): number[];
/**
 * Calculate Know Sure Thing (KST) oscillator
 *
 * KST combines multiple rate of change calculations to identify long-term trends.
 * Uses four different ROC periods with different weights.
 *
 * @param data - Source data array
 * @param roc1 - First ROC period (default: 10)
 * @param roc2 - Second ROC period (default: 15)
 * @param roc3 - Third ROC period (default: 20)
 * @param roc4 - Fourth ROC period (default: 30)
 * @param sma1 - First SMA period (default: 10)
 * @param sma2 - Second SMA period (default: 10)
 * @param sma3 - Third SMA period (default: 10)
 * @param sma4 - Fourth SMA period (default: 15)
 * @returns KST values array
 * @throws {Error} If data is empty or periods are invalid
 */
export declare function calculateKST(data: number[], roc1?: number, roc2?: number, roc3?: number, roc4?: number, sma1?: number, sma2?: number, sma3?: number, sma4?: number): number[];
//# sourceMappingURL=oscillators.d.ts.map