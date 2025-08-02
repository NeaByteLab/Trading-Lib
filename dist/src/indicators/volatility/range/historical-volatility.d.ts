import { VolatilityIndicator } from '@core/base/volatility-indicator';
import type { MarketData } from '@core/types/indicator-types';
/**
 * Historical Volatility Indicator
 *
 * Calculates historical volatility using log returns over a specified period.
 * Formula: HV = √(252) × √(Σ(ln(Pt/Pt-1)²) / (n-1))
 * Annualized volatility measure for risk assessment.
 *
 * @example
 * ```typescript
 * const hv = historicalVolatility(data, 20)
 * console.log(hv) // Annualized volatility values
 * ```
 */
export declare class HistoricalVolatilityIndicator extends VolatilityIndicator {
    constructor();
    protected calculateVolatility(data: number[], length: number, _multiplier: number): number[];
}
/**
 * Calculate Historical Volatility using wrapper function
 *
 * @param data - Market data or price array
 * @param length - Calculation period (default: 20)
 * @param source - Price source (default: 'close')
 * @returns Historical volatility values array (annualized)
 */
export declare function historicalVolatility(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=historical-volatility.d.ts.map