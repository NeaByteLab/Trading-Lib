import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Fibonacci time zone levels
 */
export type FibonacciTimeZoneLevel = 1 | 2 | 3 | 5 | 8 | 13 | 21 | 34 | 55 | 89;
/**
 * Fibonacci Time Zones Indicator
 * Calculates Fibonacci time zones based on a starting point
 */
export declare class FibonacciTimeZonesIndicator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    /**
     * Calculate Fibonacci time zones
     * @param data - Market data with OHLC
     * @param config - Configuration with time zone parameters
     * @returns Fibonacci time zones
     */
    calculate(data: MarketData | number[], config?: IndicatorConfig & {
        startIndex?: number;
        levels?: FibonacciTimeZoneLevel[];
    }): IndicatorResult;
    /**
     * Calculate Fibonacci time zones
     */
    private calculateTimeZones;
    /**
     * Calculate time zone points based on Fibonacci levels
     */
    private calculateTimeZonePoints;
    /**
     * Calculate current zone for each data point
     */
    private calculateCurrentZones;
    /**
     * Find which time zone the current index belongs to
     */
    private findZoneForIndex;
}
/**
 * Calculate Fibonacci time zones
 * @param data - Market data with OHLC
 * @param startIndex - Starting index for time zones (default: 0)
 * @param levels - Fibonacci time zone levels (default: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89])
 * @returns Fibonacci time zones and metadata
 */
export declare function fibonacciTimeZones(data: MarketData, startIndex?: number, levels?: FibonacciTimeZoneLevel[]): {
    values: number[];
    timeZonePoints: number[];
    currentZone: number[];
};
//# sourceMappingURL=fibonacci-time-zones.d.ts.map