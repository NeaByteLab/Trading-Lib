import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Negative Volume Index Indicator
 *
 * NVI measures price changes only on days when volume decreases.
 * Formula: NVI = Previous NVI × (1 + (Current Close - Previous Close) / Previous Close)
 * Only updates when current volume < previous volume.
 *
 * @example
 * ```typescript
 * const nvi = new NegativeVolumeIndexIndicator()
 * const result = nvi.calculate(marketData)
 * console.log(result.values) // NVI values
 * ```
 */
export declare class NegativeVolumeIndexIndicator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Negative Volume Index (NVI)
 *
 * NVI measures price changes only on days when volume decreases.
 * Formula: NVI = Previous NVI × (1 + (Current Close - Previous Close) / Previous Close)
 * Only updates when current volume < previous volume.
 *
 * @param data - Market data with OHLCV values
 * @returns Array of NVI values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const nvi = ta.negativeVolumeIndex(marketData)
 * // Returns: [1000, 1050, 1100, 1150, ...]
 * ```
 */
export declare function negativeVolumeIndex(data: MarketData): number[];
//# sourceMappingURL=negative-volume-index.d.ts.map