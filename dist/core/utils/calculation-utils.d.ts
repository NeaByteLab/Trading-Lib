import type { MarketData } from '@core/types/indicator-types';
/**
 * Centralized price calculation functions
 * Pine Script equivalents: hl2, hlc3, ohlc4
 */
export declare const PriceCalculations: {
    /**
     * Calculate typical price (HLC3)
     */
    typical: (data: MarketData) => number[];
    /**
     * Calculate HL2 (High + Low) / 2
     */
    hl2: (data: MarketData) => number[];
    /**
     * Calculate OHLC4 (Open + High + Low + Close) / 4
     */
    ohlc4: (data: MarketData) => number[];
};
export declare const calculateTypicalPrice: (data: MarketData) => number[];
export declare const calculateHL2: (data: MarketData) => number[];
export declare const calculateOHLC4: (data: MarketData) => number[];
export declare function combineArrays(arr1: number[], arr2: number[], operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'safe-add' | 'safe-subtract'): number[];
export declare function calculatePriceChanges(data: number[]): number[];
export declare function calculateGainsAndLosses(changes: number[]): {
    gains: number[];
    losses: number[];
};
export declare function calculateMean(data: number[]): number;
export declare function calculateVariance(data: number[], mean: number, useSampleVariance?: boolean): number;
export declare function calculateStandardDeviation(data: number[], useSampleVariance?: boolean): number;
/**
 * Calculate mean deviation from average
 *
 * @param values - Array of values
 * @param average - Average value (if not provided, calculates from values)
 * @returns Mean deviation value
 */
export declare function calculateMeanDeviation(values: number[], average?: number): number;
export declare function rollingWindow<T>(data: T[], windowSize: number, callback: (window: T[]) => number): number[];
export declare function calculateRollingStatistic(data: number[], length: number, statistic: 'min' | 'max' | 'sum' | 'mean' | 'variance'): number[];
export declare function calculateIndicatorWithPadding(data: number[], length: number, calculator: (processedData: number[], len: number) => number[]): number[];
export declare function exponentialSmoothing(data: number[], alpha: number): number[];
export declare function wildersSmoothing(data: number[], length: number): number[];
export declare function safeDivision(numerator: number, denominator: number, defaultValue?: number): number;
export declare function fillNaN(length: number, offset?: number): number[];
export declare function shiftArray(arr: number[], shift: number): number[];
export declare function calculateRSI(data: number[], length: number): number[];
export declare function calculateCCI(data: number[], length: number): number[];
//# sourceMappingURL=calculation-utils.d.ts.map