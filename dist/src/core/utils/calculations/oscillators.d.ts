import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate RSI using centralized utilities with numerical stability
 *
 * @param data - Source data array
 * @param length - RSI period
 * @returns RSI values array
 */
export declare function calculateRSI(data: number[], length: number): number[];
/**
 * Calculate CCI using centralized utilities with numerical stability
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
 * Calculate Williams %R using centralized utilities
 *
 * @param close - Close prices array
 * @param high - High prices array
 * @param low - Low prices array
 * @param length - Lookback period
 * @returns Williams %R values array
 */
export declare function calculateWilliamsR(close: number[], high: number[], low: number[], length: number): number[];
/**
 * Calculate Stochastic Oscillator using centralized utilities
 *
 * @param data - Source data array
 * @param high - High prices array
 * @param low - Low prices array
 * @param length - Calculation period
 * @returns Stochastic values array
 * @throws {Error} If data is empty or length is invalid
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