import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Yang-Zhang Volatility Indicator
 *
 * Combines multiple volatility estimators for improved accuracy.
 * Uses high-low-open-close data to account for overnight gaps.
 * Provides more accurate volatility measurement than traditional methods.
 *
 * @example
 * ```typescript
 * const yzVol = new YangZhangVolatility()
 * const result = yzVol.calculate(marketData, { length: 20 })
 * console.log(result.values) // Yang-Zhang volatility values
 * ```
 */
export declare class YangZhangVolatility extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Yang-Zhang Volatility using wrapper function
 *
 * @param data - Market data with OHLC arrays
 * @param length - Calculation period (default: 20)
 * @returns Array of Yang-Zhang volatility values
 */
export declare function yangZhangVolatility(data: MarketData, length?: number): number[];
//# sourceMappingURL=yang-zhang-volatility.d.ts.map