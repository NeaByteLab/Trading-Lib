import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Fibonacci retracement levels
 */
export type FibonacciLevel = 0 | 0.236 | 0.382 | 0.5 | 0.618 | 0.786 | 1;
/**
 * Fibonacci Retracements Indicator
 * Calculates Fibonacci retracement levels based on swing high and low points
 */
export declare class FibonacciRetracementsIndicator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    /**
     * Calculate Fibonacci retracement levels
     * @param data - Market data with OHLC
     * @param config - Configuration with optional swing detection parameters
     * @returns Fibonacci retracement levels
     */
    calculate(data: MarketData | number[], config?: IndicatorConfig & {
        swingPeriod?: number;
        levels?: FibonacciLevel[];
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
     * Calculate Fibonacci retracement levels
     */
    private calculateRetracements;
    /**
     * Calculate retracement levels for a specific index
     */
    private calculateRetracementForIndex;
    /**
     * Calculate retracement levels from swing points
     */
    private calculateRetracementLevels;
    /**
     * Determine current retracement level based on price position
     */
    private determineRetracementLevel;
    /**
     * Return NaN retracement levels for invalid cases
     */
    private getNaNRetracementLevels;
    /**
     * Find the most recent swing point before the current index
     */
    private findMostRecentSwing;
}
/**
 * Calculate Fibonacci retracement levels
 * @param data - Market data with OHLC
 * @param swingPeriod - Period for swing detection (default: 10)
 * @param levels - Fibonacci levels to calculate (default: [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1])
 * @returns Fibonacci retracement levels and metadata
 */
export declare function fibonacciRetracements(data: MarketData, swingPeriod?: number, levels?: FibonacciLevel[]): {
    levels: number[];
    swingHighs: number[];
    swingLows: number[];
    level0: number[];
    level236: number[];
    level382: number[];
    level500: number[];
    level618: number[];
    level786: number[];
    level100: number[];
};
//# sourceMappingURL=fibonacci-retracements.d.ts.map