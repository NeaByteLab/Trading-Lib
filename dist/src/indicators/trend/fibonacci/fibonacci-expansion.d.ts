import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Fibonacci expansion levels
 */
export type FibonacciExpansionLevel = 1.272 | 1.618 | 2.0 | 2.618 | 3.618;
/**
 * Fibonacci Expansion Indicator
 * Calculates Fibonacci expansion levels beyond swing high and low points
 */
export declare class FibonacciExpansionIndicator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    /**
     * Calculate Fibonacci expansion levels
     * @param data - Market data with OHLC
     * @param config - Configuration with optional swing detection parameters
     * @returns Fibonacci expansion levels
     */
    calculate(data: MarketData | number[], config?: IndicatorConfig & {
        swingPeriod?: number;
        levels?: FibonacciExpansionLevel[];
    }): IndicatorResult;
    /**
     * Find swing high and low points
     */
    private findSwingPoints;
    /**
     * Check if point is a swing high
     */
    private isSwingHigh;
    /**
     * Check if point is a swing low
     */
    private isSwingLow;
    /**
     * Calculate Fibonacci expansion levels
     */
    private calculateExpansions;
    /**
     * Calculate expansion levels for a specific index
     */
    private calculateExpansionForIndex;
    /**
     * Calculate expansion levels from swing high
     */
    private calculateExpansionLevels;
    /**
     * Determine current expansion level based on price position
     */
    private determineCurrentLevel;
    /**
     * Return NaN levels for invalid cases
     */
    private getNaNLevels;
    /**
     * Find the most recent swing point before the current index
     */
    private findMostRecentSwing;
}
/**
 * Calculate Fibonacci expansion levels
 * @param data - Market data with OHLC
 * @param swingPeriod - Period for swing detection (default: 10)
 * @param levels - Fibonacci expansion levels to calculate (default: [1.272, 1.618, 2.0, 2.618, 3.618])
 * @returns Fibonacci expansion levels and metadata
 */
export declare function fibonacciExpansion(data: MarketData, swingPeriod?: number, levels?: FibonacciExpansionLevel[]): {
    levels: number[];
    swingHighs: number[];
    swingLows: number[];
    level1272: number[];
    level1618: number[];
    level200: number[];
    level2618: number[];
    level3618: number[];
};
//# sourceMappingURL=fibonacci-expansion.d.ts.map