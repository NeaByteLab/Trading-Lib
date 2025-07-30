import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Stochastic RSI indicator
 *
 * A momentum oscillator that applies the Stochastic formula to RSI values.
 * Formula: StochRSI = (RSI - RSI_min) / (RSI_max - RSI_min)
 *
 * @example
 * ```typescript
 * const stochRsi = new StochasticRSI()
 * const result = stochRsi.calculate(marketData, { length: 14, kLength: 3, dLength: 3 })
 * console.log(result.values) // %K values
 * console.log(result.metadata.d) // %D values
 * ```
 */
export declare class StochasticRSI extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateStochasticRSI;
}
/**
 * Calculate Stochastic RSI values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - RSI calculation period (default: 14)
 * @param kLength - %K calculation period (default: 3)
 * @param dLength - %D calculation period (default: 3)
 * @param source - Price source (default: 'close')
 * @returns %K and %D values
 */
export declare function stochasticRsi(data: MarketData | number[], length?: number, kLength?: number, dLength?: number, source?: string): {
    k: number[];
    d: number[];
};
//# sourceMappingURL=stoch-rsi.d.ts.map