import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Twiggs Volatility Indicator
 *
 * A volatility indicator that measures the average true range over a specified period.
 * Uses exponential smoothing to reduce noise and identify volatility changes.
 *
 * @example
 * ```typescript
 * const twiggsVol = new TwiggsVolatility()
 * const result = twiggsVol.calculate(marketData, { length: 20 })
 * console.log(result.values) // Twiggs Volatility values
 * ```
 */
export declare class TwiggsVolatility extends BaseIndicator {
    constructor();
    calculate(data: MarketData, config?: IndicatorConfig): IndicatorResult;
    private calculateTwiggsVolatility;
}
/**
 * Calculate Twiggs Volatility values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 20)
 * @param lookback - Lookback period (default: 10)
 * @returns Twiggs Volatility values array
 */
export declare function twiggsVolatility(data: MarketData, length?: number, lookback?: number): number[];
//# sourceMappingURL=twiggs-volatility.d.ts.map