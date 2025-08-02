import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Kyle's Lambda Indicator
 *
 * Kyle's Lambda measures the price impact of trades and market liquidity.
 * Higher values indicate lower liquidity and higher price impact.
 * Formula: λ = |Price Change| / Volume
 *
 * @example
 * ```typescript
 * const kyle = new KylesLambda()
 * const result = kyle.calculate(marketData)
 * console.log(result.values) // Kyle's Lambda values
 * ```
 */
export declare class KylesLambda extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Kyle's Lambda values
 *
 * Kyle's Lambda measures the price impact of trades and market liquidity.
 * Formula: λ = |Price Change| / Volume
 * Higher values indicate lower liquidity and higher price impact.
 *
 * @param data - Market data with OHLCV values
 * @returns Array of Kyle's Lambda values
 * @throws {Error} If market data is invalid or volume data is missing
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const lambda = ta.kylesLambda(marketData)
 * // Returns: [0.001, 0.002, 0.0015, 0.003, ...]
 * ```
 */
export declare function kylesLambda(data: MarketData): number[];
//# sourceMappingURL=kyle.d.ts.map