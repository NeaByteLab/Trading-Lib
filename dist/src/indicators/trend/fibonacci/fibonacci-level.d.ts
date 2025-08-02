import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Fibonacci level types
 */
export type FibonacciLevelType = 'retracement' | 'extension' | 'projection';
/**
 * Fibonacci Level Indicator
 * Calculates specific Fibonacci levels based on a given range
 */
export declare class FibonacciLevelIndicator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    /**
     * Calculate Fibonacci levels
     * @param data - Market data with OHLC
     * @param config - Configuration with level parameters
     * @returns Fibonacci levels
     */
    calculate(data: MarketData | number[], config?: IndicatorConfig & {
        startIndex?: number;
        endIndex?: number;
        levelType?: FibonacciLevelType;
        customLevels?: number[];
    }): IndicatorResult;
    /**
     * Calculate Fibonacci levels based on range
     */
    private calculateLevels;
    /**
     * Find high and low prices in the specified range
     */
    private findPriceRange;
    /**
     * Calculate level values based on type
     */
    private calculateLevelValues;
    /**
     * Determine current levels for each data point
     */
    private determineCurrentLevels;
    /**
     * Check if price is at a specific level
     */
    private isPriceAtLevel;
    /**
     * Return NaN levels for invalid cases
     */
    private getNaNLevels;
}
/**
 * Calculate Fibonacci levels
 * @param data - Market data with OHLC
 * @param startIndex - Start index for range calculation (default: 0)
 * @param endIndex - End index for range calculation (default: last index)
 * @param levelType - Type of Fibonacci levels (default: 'retracement')
 * @param customLevels - Custom Fibonacci levels (default: [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1])
 * @returns Fibonacci levels and metadata
 */
export declare function fibonacciLevel(data: MarketData, startIndex?: number, endIndex?: number, levelType?: FibonacciLevelType, customLevels?: number[]): {
    values: number[];
    highPrice: number;
    lowPrice: number;
    range: number;
    calculatedLevels: number[];
};
//# sourceMappingURL=fibonacci-level.d.ts.map