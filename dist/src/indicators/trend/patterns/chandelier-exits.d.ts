import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Chandelier Exits Indicator
 *
 * Calculates trailing stop levels based on ATR and price action.
 * Provides long and short exit levels for position management.
 * Uses highest high/lowest low with ATR-based distance.
 *
 * @example
 * ```typescript
 * const chandelier = new ChandelierExits()
 * const result = chandelier.calculate(marketData, { atrPeriod: 14, multiplier: 3 })
 * console.log(result.values) // Long exit levels
 * console.log(result.metadata.shortExit) // Short exit levels
 * ```
 */
export declare class ChandelierExits extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Chandelier Exits using wrapper function
 *
 * @param data - Market data with OHLC arrays
 * @param atrPeriod - ATR calculation period (default: 14)
 * @param multiplier - ATR multiplier for stop distance (default: 3)
 * @returns Object with long and short exit levels
 */
export declare function chandelierExits(data: MarketData, atrPeriod?: number, multiplier?: number): {
    longExit: number[];
    shortExit: number[];
};
//# sourceMappingURL=chandelier-exits.d.ts.map