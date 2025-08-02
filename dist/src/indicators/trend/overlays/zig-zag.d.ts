import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Zig Zag point structure
 */
export interface ZigZagPoint {
    index: number;
    value: number;
    type: 'high' | 'low';
}
/**
 * Zig Zag Indicator
 *
 * Connects significant highs and lows to filter out market noise.
 * Uses deviation and depth parameters to identify meaningful swing points.
 * Helps identify trend direction and support/resistance levels.
 *
 * @example
 * ```typescript
 * const zigzag = new ZigZag()
 * const result = zigzag.calculate(marketData, { deviation: 5, depth: 12 })
 * console.log(result.values) // Zig Zag values
 * console.log(result.metadata.swings) // Swing points
 * ```
 */
export declare class ZigZag extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Zig Zag using wrapper function
 *
 * @param data - Market data with OHLC arrays
 * @param deviation - Minimum deviation percentage (default: 5)
 * @param depth - Minimum number of bars between swings (default: 12)
 * @returns Object with zigzag values and swing points
 */
export declare function zigZag(data: MarketData, deviation?: number, depth?: number): {
    values: number[];
    swings: ZigZagPoint[];
};
//# sourceMappingURL=zig-zag.d.ts.map