import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Aroon Indicator
 *
 * A momentum indicator that measures the time between highs and lows.
 * Values range from 0 to 100, with higher values indicating stronger trends.
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