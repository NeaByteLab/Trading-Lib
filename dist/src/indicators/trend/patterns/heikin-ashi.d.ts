import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Heikin-Ashi Indicator
 *
 * Calculates Heikin-Ashi candlestick values from OHLC data.
 * Formula:
 * - HA_Close = (O + H + L + C) / 4
 * - HA_Open = (Previous HA_Open + Previous HA_Close) / 2
 * - HA_High = max(H, HA_Open, HA_Close)
 * - HA_Low = min(L, HA_Open, HA_Close)
 *
 * @example
 * ```typescript
 * const ha = heikinAshi(data)
 * console.log(ha.open) // Heikin-Ashi open values
 * console.log(ha.high) // Heikin-Ashi high values
 * ```
 */
export declare class HeikinAshiIndicator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], _config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Heikin-Ashi values using wrapper function
 *
 * @param data - Market data with OHLC
 * @returns Heikin-Ashi OHLC values
 */
export declare function heikinAshi(data: MarketData): {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
};
//# sourceMappingURL=heikin-ashi.d.ts.map