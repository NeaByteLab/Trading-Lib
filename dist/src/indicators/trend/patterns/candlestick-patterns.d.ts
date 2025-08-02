import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Candlestick Pattern Types
 * Defines common candlestick patterns for identification
 */
export declare enum CandlestickPattern {
    DOJI = 1,
    HAMMER = 2,
    SHOOTING_STAR = 3,
    ENGULFING_BULLISH = 4,
    ENGULFING_BEARISH = 5,
    MORNING_STAR = 6,
    EVENING_STAR = 7,
    HANGING_MAN = 8,
    INVERTED_HAMMER = 9,
    SPINNING_TOP = 10,
    MARUBOZU = 11,
    NONE = 0
}
/**
 * Candlestick Patterns Indicator
 *
 * Identifies common candlestick patterns in price data.
 * Returns pattern type values based on OHLC relationships.
 * Higher values indicate stronger pattern signals.
 *
 * @example
 * ```typescript
 * const patterns = new CandlestickPatterns()
 * const result = patterns.calculate(marketData, { sensitivity: 0.1 })
 * console.log(result.values) // Pattern type values
 * ```
 */
export declare class CandlestickPatterns extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate candlestick patterns using wrapper function
 *
 * @param data - Market data with OHLC arrays
 * @param sensitivity - Pattern detection sensitivity (default: 0.1)
 * @returns Array of candlestick pattern values
 */
export declare function candlestickPatterns(data: MarketData, sensitivity?: number): number[];
//# sourceMappingURL=candlestick-patterns.d.ts.map