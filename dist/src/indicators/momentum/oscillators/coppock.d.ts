import { OscillatorIndicator } from '@base/oscillator-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Coppock Indicator
 *
 * A momentum oscillator that measures the rate of change using two ROC periods.
 * Used to identify long-term buying opportunities in bear markets.
 * Values above zero indicate potential bullish signals.
 *
 * @example
 * ```typescript
 * const coppock = new CoppockIndicator()
 * const result = coppock.calculate(marketData, { roc1Length: 14, roc2Length: 11, wmaLength: 10 })
 * console.log(result.values) // Coppock Indicator values
 * ```
 */
export declare class CoppockIndicator extends OscillatorIndicator {
    constructor();
    protected calculateOscillator(data: number[], _length: number): number[];
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Coppock Indicator using wrapper function
 *
 * @param data - Market data or price array
 * @param roc1Length - First ROC period (default: 14)
 * @param roc2Length - Second ROC period (default: 11)
 * @param wmaLength - WMA period (default: 10)
 * @returns Coppock Indicator values array
 */
export declare function coppock(data: MarketData | number[], roc1Length?: number, roc2Length?: number, wmaLength?: number): number[];
//# sourceMappingURL=coppock.d.ts.map