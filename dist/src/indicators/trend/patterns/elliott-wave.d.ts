import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Elliott Wave Pattern Indicator
 *
 * Identifies Elliott Wave patterns in price movements.
 * Returns wave count based on swing high/low detection.
 * Higher values indicate more complex wave patterns.
 *
 * @example
 * ```typescript
 * const elliott = new ElliottWave()
 * const result = elliott.calculate(marketData, { sensitivity: 0.02 })
 * console.log(result.values) // Wave pattern values
 * ```
 */
export declare class ElliottWave extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Elliott Wave Pattern using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @param sensitivity - Wave detection sensitivity (default: 0.02)
 * @returns Elliott Wave pattern values
 */
export declare function elliottWave(data: MarketData, sensitivity?: number): number[];
//# sourceMappingURL=elliott-wave.d.ts.map