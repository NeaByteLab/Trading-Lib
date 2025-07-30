import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate directional movement (DM) values
 * Centralized utility to eliminate duplication between ADX and DMI indicators
 *
 * @param data - Market data
 * @param i - Current index
 * @param prevHigh - Previous high value
 * @param prevLow - Previous low value
 * @returns Object with plusDM and minusDM values
 */
export declare function calculateDirectionalMovement(data: MarketData, i: number, prevHigh: number, prevLow: number): {
    plusDM: number;
    minusDM: number;
};
/**
 * Calculate smoothed values for directional indicators
 * Centralized utility to eliminate duplication between ADX and DMI indicators
 *
 * @param tr - True range value
 * @param plusDM - Plus directional movement
 * @param minusDM - Minus directional movement
 * @param i - Current index
 * @param length - Calculation period
 * @param plusDIValues - Array of previous +DI values
 * @param minusDIValues - Array of previous -DI values
 * @param trValues - Array of true range values
 * @returns Object with smoothed TR, +DM, and -DM values
 */
export declare function calculateSmoothedDirectionalValues(tr: number, plusDM: number, minusDM: number, i: number, length: number, plusDIValues: number[], minusDIValues: number[], trValues: number[]): {
    smoothedTR: number;
    smoothedPlusDM: number;
    smoothedMinusDM: number;
};
/**
 * Calculate Balance of Power using centralized utilities
 *
 * @param data - Market data with OHLC
 * @returns Raw BOP values array
 */
export declare function calculateBalanceOfPower(data: MarketData): number[];
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
/**
 * Find days since highest and lowest values using centralized utilities
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param currentIndex - Current index
 * @param length - Lookback period
 * @returns Days since highest and lowest values
 * @throws {Error} If data is empty or parameters are invalid
 */
export declare function findDaysSinceExtremes(high: number[], low: number[], currentIndex: number, length: number): {
    daysSinceHigh: number;
    daysSinceLow: number;
};
//# sourceMappingURL=trend.d.ts.map