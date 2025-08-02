import { VolatilityIndicator } from '@core/base/volatility-indicator';
import type { IndicatorConfig, MarketData } from '@core/types/indicator-types';
/**
 * Garman-Klass Volatility Indicator
 *
 * Calculates volatility using the Garman-Klass formula, which uses OHLC data.
 * Formula: σ² = 0.5 × ln(H/L)² - (2×ln(2)-1) × ln(C/O)²
 * Provides more accurate volatility estimates than simple range-based methods.
 *
 * @example
 * ```typescript
 * const gk = garmanKlassVolatility(data, 20)
 * console.log(gk) // Garman-Klass volatility values
 * ```
 */
export declare class GarmanKlassVolatilityIndicator extends VolatilityIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    protected calculateVolatility(data: number[], length: number, _multiplier: number): number[];
    private filterValidData;
    private calculateGarmanKlassVolatility;
}
/**
 * Calculate Garman-Klass Volatility using wrapper function
 *
 * @param data - Market data with OHLC
 * @param length - Calculation period (default: 20)
 * @returns Garman-Klass volatility values array
 */
export declare function garmanKlassVolatility(data: MarketData, length?: number): number[];
//# sourceMappingURL=garman-klass-volatility.d.ts.map