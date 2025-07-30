import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Aroon indicator
 *
 * Measures the time between highs and lows over a time period.
 * Formula: Aroon Up = ((Period - Days Since High) / Period) × 100
 *          Aroon Down = ((Period - Days Since Low) / Period) × 100
 *
 * @example
 * ```typescript
 * const aroon = new Aroon()
 * const result = aroon.calculate(marketData, { length: 25 })
 * console.log(result.values) // Aroon Up values
 * console.log(result.metadata.down) // Aroon Down values
 * ```
 */
export declare class Aroon extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private calculateAroon;
    private findExtremes;
}
/**
 * Calculate Aroon values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 25)
 * @param source - Price source (default: 'hlc3')
 * @returns Aroon Up and Down values
 */
export declare function aroon(data: MarketData | number[], length?: number, source?: string): {
    up: number[];
    down: number[];
};
//# sourceMappingURL=aroon.d.ts.map