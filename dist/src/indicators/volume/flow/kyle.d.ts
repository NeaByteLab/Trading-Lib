import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Kyle's Lambda indicator
 *
 * Kyle's Lambda measures the price impact of trades and market liquidity.
 * Higher values indicate lower liquidity and higher price impact.
 */
export declare class KylesLambda extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
/**
 * Calculate Kyle's Lambda values using wrapper function
 *
 * @param data - Market data
 * @returns Kyle's Lambda values array
 */
export declare function kylesLambda(data: MarketData): number[];
//# sourceMappingURL=kyle.d.ts.map