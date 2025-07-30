/**
 * Calculate True Range using centralized utilities
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @returns True Range values array
 */
export declare function calculateTrueRange(high: number[], low: number[], close: number[]): number[];
/**
 * Calculate bands (upper, middle, lower) using standard deviation
 *
 * @param data - Source data array
 * @param length - Calculation period
 * @param multiplier - Standard deviation multiplier
 * @returns Bands object with upper, middle, and lower arrays
 */
export declare function calculateBands(data: number[], length: number, multiplier: number): {
    upper: number[];
    middle: number[];
    lower: number[];
};
/**
 * Calculate Bollinger Band Width using centralized utilities
 *
 * @param data - Price data array
 * @param length - Period for moving average
 * @param multiplier - Standard deviation multiplier
 * @returns Array of band width values
 * @throws {Error} If data is invalid or missing required fields
 */
export declare function calculateBollingerBandWidth(data: number[], length: number, multiplier: number): number[];
/**
 * Calculate Donchian Channel using centralized utilities
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param length - Calculation period
 * @returns Object with upper, middle, and lower band arrays
 * @throws {Error} If data is invalid or missing required fields
 */
export declare function calculateDonchianChannel(high: number[], low: number[], length: number): {
    upper: number[];
    middle: number[];
    lower: number[];
};
/**
 * Calculate Price Channels using centralized utilities
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param length - Channel calculation period
 * @returns Object with upper and lower channel values
 * @throws {Error} If data is invalid or missing required fields
 */
export declare function calculatePriceChannels(high: number[], low: number[], length: number): {
    upper: number[];
    lower: number[];
};
/**
 * Calculate Keltner Channel using centralized utilities
 *
 * @param close - Close prices array
 * @param atrValues - ATR values array
 * @param multiplier - ATR multiplier
 * @returns Object with upper, middle, and lower band arrays
 * @throws {Error} If data is invalid or missing required fields
 */
export declare function calculateKeltnerChannel(close: number[], atrValues: number[], multiplier: number): {
    upper: number[];
    middle: number[];
    lower: number[];
};
//# sourceMappingURL=volatility.d.ts.map