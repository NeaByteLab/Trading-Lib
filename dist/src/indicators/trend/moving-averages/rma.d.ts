import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Rolling Moving Average (RMA)
 *
 * Calculates the rolling moving average (RMA), also known as Wilder's Smoothing.
 *
 * @param data - MarketData or price array
 * @param length - Period for the moving average (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Array of RMA values
 *
 * @example
 * ```typescript
 * const rma = rma(data, 14)
 * // rma[i] = RMA value at i
 * ```
 */
export declare class RMAIndicator extends BaseIndicator {
    constructor();
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
export declare function rma(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=rma.d.ts.map