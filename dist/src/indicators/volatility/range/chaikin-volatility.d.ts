import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Chaikin Volatility Indicator Class
 *
 * Measures the rate of change of the trading range using exponential moving averages.
 * Higher values indicate increasing volatility, lower values indicate decreasing volatility.
 *
 * @example
 * ```typescript
 * const chaikin = new ChaikinVolatilityIndicator()
 * const result = chaikin.calculate(marketData, { length: 10 })
 * console.log(result.values) // Chaikin Volatility values
 * ```
 */
export declare class ChaikinVolatilityIndicator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Chaikin Volatility values using wrapper function
 *
 * @param data - Market data
 * @param length - Period length (default: 10)
 * @param source - Price source (default: 'close')
 * @returns Chaikin Volatility values
 * @throws {Error} If data is invalid or missing required fields
 */
export declare function chaikinVolatility(data: MarketData, length?: number, source?: string): number[];
//# sourceMappingURL=chaikin-volatility.d.ts.map