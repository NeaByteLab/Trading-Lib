import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Force Index Indicator
 * Measures the force behind price movements using volume
 */
export declare class ForceIndexIndicator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    /**
     * Calculate Force Index
     * @param data - Market data with OHLC and volume
     * @param config - Configuration with optional smoothing period
     * @returns Force Index values
     */
    calculate(data: MarketData | number[], config?: IndicatorConfig & {
        smoothingPeriod?: number;
    }): IndicatorResult;
    /**
     * Calculate Force Index
     */
    private calculateForceIndex;
}
/**
 * Calculate Force Index
 * @param data - Market data with OHLC and volume
 * @param smoothingPeriod - Period for smoothing (default: 13)
 * @returns Force Index values and metadata
 */
export declare function forceIndex(data: MarketData, smoothingPeriod?: number): {
    values: number[];
    rawForceIndex: number[];
    smoothedForceIndex: number[];
};
//# sourceMappingURL=force-index.d.ts.map