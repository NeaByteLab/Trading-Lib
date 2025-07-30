import type { MarketData } from '@core/types/indicator-types';
/**
 * Calculate On Balance Volume (OBV) using centralized utilities
 *
 * @param close - Close prices array
 * @param volume - Volume array
 * @returns OBV values array
 * @throws {Error} If data is empty or missing volume
 */
export declare function calculateOBV(close: number[], volume: number[]): number[];
/**
 * Calculate Accumulation Distribution using centralized utilities
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @param volume - Volume array
 * @returns Accumulation Distribution values array
 * @throws {Error} If data is empty or missing required fields
 */
export declare function calculateAccumulationDistribution(high: number[], low: number[], close: number[], volume: number[]): number[];
/**
 * Calculate VWAP (Volume Weighted Average Price) using centralized logic
 *
 * @param data - Market data with OHLCV
 * @param length - Calculation period
 * @returns VWAP values array
 */
export declare function calculateVWAP(data: MarketData, length: number): number[];
/**
 * Calculate Price Volume Trend (PVT)
 *
 * PVT measures cumulative volume-weighted price change.
 * Formula: PVT = Previous PVT + ((Current Close - Previous Close) / Previous Close) * Current Volume
 *
 * @param close - Close prices array
 * @param volume - Volume array
 * @returns PVT values array
 * @throws {Error} If data is empty or missing required fields
 */
export declare function calculatePriceVolumeTrend(close: number[], volume: number[]): number[];
/**
 * Calculate Positive Volume Index (PVI)
 *
 * PVI measures price changes only on days when volume increases.
 * Formula: PVI = Previous PVI * (1 + Percent Change / 100) if Volume > Previous Volume
 *
 * @param close - Close prices array
 * @param volume - Volume array
 * @returns PVI values array
 * @throws {Error} If data is empty or missing required fields
 */
export declare function calculatePositiveVolumeIndex(close: number[], volume: number[]): number[];
/**
 * Calculate Twiggs Money Flow
 *
 * Twiggs Money Flow is a volume-weighted momentum indicator.
 * Formula: TMF = (HLC3 - L) / (H - L) * V where HLC3 = (H + L + C) / 3
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @param volume - Volume array
 * @returns Twiggs Money Flow values array
 * @throws {Error} If data is empty or missing required fields
 */
export declare function calculateTwiggsMoneyFlow(high: number[], low: number[], close: number[], volume: number[]): number[];
/**
 * Calculate Amihud Illiquidity Measure
 *
 * Amihud = |Return| / Volume
 * Return = (Close - Previous Close) / Previous Close
 *
 * @param close - Close prices array
 * @param volume - Volume array
 * @returns Amihud Illiquidity values array
 * @throws {Error} If data is empty or missing required fields
 */
export declare function calculateAmihudIlliquidity(close: number[], volume: number[]): number[];
/**
 * Calculate cumulative volume for money flow indicators
 *
 * @param volume - Volume array
 * @param startIndex - Start index
 * @param endIndex - End index
 * @returns Cumulative volume
 */
export declare function calculateCumulativeVolume(volume: number[], startIndex: number, endIndex: number): number;
/**
 * Calculate average volume from volume array
 *
 * @param volume - Volume array
 * @returns Average volume or 1 if array is empty
 */
export declare function calculateAverageVolume(volume: number[]): number;
/**
 * Calculate volume ratio based on average volume
 *
 * @param volume - Current volume
 * @param avgVolume - Average volume
 * @returns Volume ratio
 */
export declare function calculateVolumeRatio(volume: number, avgVolume: number): number;
/**
 * Calculate Volume Rate of Change (VROC)
 *
 * VROC = ((Current Volume - Volume n periods ago) / Volume n periods ago) × 100
 * Uses centralized calculation utilities for consistency.
 *
 * @param volume - Volume array
 * @param length - Lookback period (default: 14)
 * @returns VROC values array
 * @throws {Error} If volume data is empty or length is invalid
 */
export declare function calculateVolumeRateOfChange(volume: number[], length?: number): number[];
/**
 * Calculate Volume Weighted Moving Average (VWMA)
 *
 * VWMA = Σ(Price × Volume) / Σ(Volume) for the specified period
 * Uses centralized calculation utilities for consistency.
 *
 * @param prices - Price array
 * @param volume - Volume array
 * @param length - Moving average period (default: 20)
 * @returns VWMA values array
 * @throws {Error} If data is empty or arrays have different lengths
 */
export declare function calculateVWMA(prices: number[], volume: number[], length?: number): number[];
/**
 * Calculate Volume Adjusted Moving Average (VAMA)
 *
 * VAMA = Σ(Price × Volume) / Σ(Volume) for the specified period
 * Similar to VWMA but with additional volume filtering
 *
 * @param prices - Price array
 * @param volume - Volume array
 * @param length - Moving average period (default: 20)
 * @param volumeThreshold - Minimum volume threshold (default: 0)
 * @returns VAMA values array
 * @throws {Error} If data is empty or arrays have different lengths
 */
export declare function calculateVAMA(prices: number[], volume: number[], length?: number, volumeThreshold?: number): number[];
/**
 * Calculate Volume Weighted Sine Moving Average (VWSMA)
 *
 * VWSMA = Σ(Price × Volume × Sine Weight) / Σ(Volume × Sine Weight)
 * Uses sine function to create smooth weighting
 *
 * @param prices - Price array
 * @param volume - Volume array
 * @param length - Moving average period (default: 20)
 * @returns VWSMA values array
 * @throws {Error} If data is empty or arrays have different lengths
 */
export declare function calculateVWSMA(prices: number[], volume: number[], length?: number): number[];
/**
 * Calculate Kyle's Lambda (market microstructure indicator)
 *
 * Kyle's Lambda measures the price impact coefficient using the regression model:
 * r_i,n = λ_i * S_i,n + ε_i,n
 *
 * Where:
 * - r_i,n is the stock return for period n
 * - S_i,n is the signed square-root dollar volume
 * - λ_i is Kyle's Lambda (market impact coefficient)
 *
 * @param close - Close prices array
 * @param volume - Volume array
 * @param period - Period for calculation (default: 20)
 * @returns Kyle's Lambda values array
 * @throws {Error} If data is empty or missing required fields
 */
export declare function calculateKylesLambda(close: number[], volume: number[], period?: number): number[];
/**
 * Calculate Vortex Indicator
 *
 * VI+ = |Current High - Prior Low| / True Range
 * VI- = |Current Low - Prior High| / True Range
 * Uses centralized calculation utilities for consistency.
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @param length - Calculation period (default: 14)
 * @returns Object with VI+ and VI- arrays
 * @throws {Error} If data is empty or arrays have different lengths
 */
export declare function calculateVortexIndicator(high: number[], low: number[], close: number[], length?: number): {
    viPlus: number[];
    viMinus: number[];
};
/**
 * Calculate Volume Price Impact Number (VPIN)
 *
 * VPIN measures the imbalance between buy and sell volume
 * Formula: VPIN = |Buy Volume - Sell Volume| / Total Volume
 *
 * @param close - Close prices array
 * @param volume - Volume array
 * @param length - Calculation period (default: 50)
 * @param buckets - Number of volume buckets (default: 50)
 * @returns VPIN values array
 * @throws {Error} If data is empty or length is invalid
 */
export declare function calculateVPIN(close: number[], volume: number[], length?: number, buckets?: number): number[];
/**
 * Calculate Volume Profile
 *
 * Creates a volume distribution across price levels
 * Groups volume by price ranges to show volume concentration
 *
 * @param prices - Price array (typically close prices)
 * @param volume - Volume array
 * @param levels - Number of price levels (default: 10)
 * @returns Object with price levels and volume distribution
 * @throws {Error} If data is empty or arrays have different lengths
 */
export declare function calculateVolumeProfile(prices: number[], volume: number[], levels?: number): {
    priceLevels: number[];
    volumeDistribution: number[];
    poc: number;
};
//# sourceMappingURL=volume.d.ts.map