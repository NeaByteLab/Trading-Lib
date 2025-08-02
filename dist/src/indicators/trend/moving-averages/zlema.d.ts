import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Zero Lag Exponential Moving Average (ZLEMA) Indicator
 *
 * Reduces lag by removing the lag from a simple moving average.
 * Uses error correction to minimize the delay between price changes and indicator response.
 * More responsive than traditional EMA while maintaining smoothness.
 *
 * @example
 * ```typescript
 * const zlema = new ZLEMA()
 * const result = zlema.calculate(closePrices, { length: 20 })
 * console.log(result.values) // ZLEMA values
 * ```
 */
export declare class ZLEMA extends BaseIndicator {
    constructor();
    validateInput(_data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Zero Lag Exponential Moving Average using wrapper function
 *
 * @param data - Price data array or market data
 * @param length - Calculation period (default: 20)
 * @returns Array of ZLEMA values
 */
export declare function zlema(data: number[] | MarketData, length?: number): number[];
//# sourceMappingURL=zlema.d.ts.map