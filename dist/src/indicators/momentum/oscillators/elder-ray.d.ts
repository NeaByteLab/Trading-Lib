import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Elder Ray Index Indicator
 *
 * Consists of Bull Power and Bear Power components that measure buying and selling pressure.
 * Bull Power = High - EMA(Close), Bear Power = Low - EMA(Close)
 * Positive Bull Power indicates buying pressure, negative Bear Power indicates selling pressure.
 *
 * @example
 * ```typescript
 * const elderRay = new ElderRayIndex()
 * const result = elderRay.calculate(marketData, { length: 13 })
 * console.log(result.values) // Bull Power values
 * console.log(result.metadata.bearPower) // Bear Power values
 * ```
 */
export declare class ElderRayIndex extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Elder Ray Index using wrapper function
 *
 * @param data - Market data with high, low, close arrays
 * @param length - EMA period (default: 13)
 * @returns Elder Ray Index values
 */
export declare function elderRayIndex(data: MarketData, length?: number): {
    bullPower: number[];
    bearPower: number[];
};
//# sourceMappingURL=elder-ray.d.ts.map