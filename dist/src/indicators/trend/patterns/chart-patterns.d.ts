import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Chart Pattern Types
 * Defines common chart patterns for identification
 */
export declare enum ChartPattern {
    ASCENDING_TRIANGLE = 1,
    DESCENDING_TRIANGLE = 2,
    SYMMETRICAL_TRIANGLE = 3,
    BULL_FLAG = 4,
    BEAR_FLAG = 5,
    ASCENDING_WEDGE = 6,
    DESCENDING_WEDGE = 7,
    DOUBLE_TOP = 8,
    DOUBLE_BOTTOM = 9,
    HEAD_AND_SHOULDERS = 10,
    INVERSE_HEAD_AND_SHOULDERS = 11,
    RECTANGLE = 12,
    NONE = 0
}
/**
 * Chart Patterns Indicator
 *
 * Identifies common chart patterns in price data.
 * Returns pattern type values based on trend analysis and swing points.
 * Higher values indicate stronger pattern signals.
 *
 * @example
 * ```typescript
 * const patterns = new ChartPatterns()
 * const result = patterns.calculate(marketData, { windowSize: 5, sensitivity: 0.1 })
 * console.log(result.values) // Pattern type values
 * ```
 */
export declare class ChartPatterns extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate chart patterns using wrapper function
 *
 * @param data - Market data with OHLC arrays
 * @param windowSize - Window size for swing detection (default: 5)
 * @param sensitivity - Pattern detection sensitivity (default: 0.1)
 * @returns Array of chart pattern values
 */
export declare function chartPatterns(data: MarketData, windowSize?: number, sensitivity?: number): number[];
//# sourceMappingURL=chart-patterns.d.ts.map