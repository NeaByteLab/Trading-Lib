import { VolatilityIndicator } from '@core/base/volatility-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Bollinger Bands Indicator
 *
 * Creates volatility bands around a moving average using standard deviation.
 * Upper band = MA + (StdDev × Multiplier), Lower band = MA - (StdDev × Multiplier)
 * Helps identify overbought/oversold conditions and volatility expansion/contraction.
 *
 * @example
 * ```typescript
 * const bollinger = new BollingerBandsIndicator()
 * const result = bollinger.calculate(marketData, { length: 20, multiplier: 2 })
 * console.log(result.values) // Middle band (SMA)
 * console.log(result.metadata.upper) // Upper band
 * console.log(result.metadata.lower) // Lower band
 * ```
 */
export declare class BollingerBandsIndicator extends VolatilityIndicator {
    constructor();
    protected calculateVolatility(data: number[], length: number, multiplier: number): number[];
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Bollinger Bands using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param multiplier - Standard deviation multiplier (default: 2.0)
 * @param source - Price source (default: 'close')
 * @param maType - Moving average type ('sma' or 'ema', default: 'sma')
 * @returns Bollinger Bands with upper, middle, and lower bands
 */
export declare function bollinger(data: MarketData | number[], length?: number, multiplier?: number, source?: string, maType?: 'sma' | 'ema'): {
    upper: number[];
    middle: number[];
    lower: number[];
};
export declare const bollingerBands: typeof bollinger;
//# sourceMappingURL=bollinger-bands.d.ts.map