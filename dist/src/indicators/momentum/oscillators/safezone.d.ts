import { VolatilityIndicator } from '@base/volatility-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Safezone Indicator
 *
 * Creates safezone levels based on standard deviation of price from moving average.
 * The safezone helps identify overbought and oversold conditions with reduced false signals.
 * Formula: Upper = MA + (StdDev × Multiplier), Lower = MA - (StdDev × Multiplier)
 *
 * @example
 * ```typescript
 * const safezone = new SafezoneIndicator()
 * const result = safezone.calculate(marketData, { length: 20, multiplier: 2 })
 * console.log(result.values) // Middle band (MA)
 * console.log(result.metadata.upper) // Upper safezone
 * console.log(result.metadata.lower) // Lower safezone
 * ```
 */
export declare class SafezoneIndicator extends VolatilityIndicator {
    constructor();
    protected calculateVolatility(data: number[], length: number, multiplier: number): number[];
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Safezone Indicator using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param multiplier - Standard deviation multiplier (default: 2.0)
 * @param source - Price source (default: 'close')
 * @returns Safezone indicator with upper, middle, and lower bands
 */
export declare function safezone(data: MarketData | number[], length?: number, multiplier?: number, source?: string): {
    upper: number[];
    middle: number[];
    lower: number[];
};
//# sourceMappingURL=safezone.d.ts.map