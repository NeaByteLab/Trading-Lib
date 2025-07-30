import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Bollinger Bands indicator
 *
 * Calculates upper, middle, and lower bands based on moving average and standard deviation.
 * Formula: Upper = SMA + (multiplier × standard deviation), Lower = SMA - (multiplier × standard deviation)
 *
 * @example
 * ```typescript
 * const bb = new BollingerBands()
 * const result = bb.calculate(marketData, { length: 20, multiplier: 2 })
 * console.log(result.values) // Middle band (SMA)
 * console.log(result.metadata.upper) // Upper band
 * console.log(result.metadata.lower) // Lower band
 * ```
 */
export declare class BollingerBands extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateBollingerBands;
}
/**
 * Calculate Bollinger Bands using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param multiplier - Standard deviation multiplier (default: 2)
 * @param source - Price source (default: 'close')
 * @returns Bollinger Bands result with upper, middle, and lower bands
 */
export declare function bollingerBands(data: MarketData | number[], length?: number, multiplier?: number, source?: string): {
    upper: number[];
    middle: number[];
    lower: number[];
};
//# sourceMappingURL=bollinger-bands.d.ts.map