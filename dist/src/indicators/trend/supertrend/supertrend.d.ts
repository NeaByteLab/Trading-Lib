import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Super Trend indicator
 *
 * A trend-following indicator that combines ATR with price action.
 * Formula: Super Trend = ATR-based dynamic support/resistance levels
 *
 * @example
 * ```typescript
 * const superTrend = new SuperTrend()
 * const result = superTrend.calculate(marketData, { length: 10, multiplier: 3 })
 * console.log(result.values) // Super Trend values
 * console.log(result.metadata.direction) // Trend direction
 * ```
 */
export declare class SuperTrend extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateSuperTrend;
    /**
     * Calculate basic upper and lower bands
     */
    private calculateBasicBands;
    /**
     * Calculate final upper and lower bands
     */
    private calculateFinalBands;
    /**
     * Calculate Super Trend value based on current conditions
     */
    private calculateSuperTrendValue;
}
/**
 * Calculate Super Trend values using wrapper function
 *
 * @param data - Market data
 * @param length - ATR period (default: 10)
 * @param multiplier - ATR multiplier (default: 3)
 * @returns Super Trend values and direction
 */
export declare function superTrend(data: MarketData | number[], length?: number, multiplier?: number): {
    superTrend: number[];
    direction: number[];
};
//# sourceMappingURL=supertrend.d.ts.map