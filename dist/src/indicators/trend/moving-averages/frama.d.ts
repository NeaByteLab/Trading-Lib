import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Fractal Adaptive Moving Average (FRAMA) Indicator
 * Uses fractal mathematics to adapt to market conditions
 */
export declare class FRAMAIndicator extends BaseIndicator {
    constructor();
    /**
     * Calculate FRAMA
     * @param data - Market data or price array
     * @param config - Configuration with FRAMA parameters
     * @returns FRAMA values
     */
    calculate(data: MarketData | number[], config?: IndicatorConfig & {
        length?: number;
        fc?: number;
        sc?: number;
    }): IndicatorResult;
    /**
     * Calculate FRAMA using fractal mathematics
     */
    private calculateFRAMA;
    /**
     * Calculate fractal dimension using box counting method
     */
    private calculateFractalDimension;
    /**
     * Calculate window statistics
     */
    private calculateWindowStats;
    /**
     * Calculate box counts at different scales
     */
    private calculateBoxCounts;
    /**
     * Count boxes for a specific scale
     */
    private countBoxesForScale;
    /**
     * Calculate fractal dimension from box counts using linear regression
     */
    private calculateFractalDimensionFromBoxCounts;
    /**
     * Calculate linear regression slope
     */
    private calculateLinearRegression;
    /**
     * Calculate adaptive alpha based on fractal dimension
     */
    private calculateAdaptiveAlpha;
}
/**
 * Calculate Fractal Adaptive Moving Average (FRAMA)
 * @param data - Market data or price array
 * @param length - Period for calculation (default: 14)
 * @param fc - Fast constant (default: 4)
 * @param sc - Slow constant (default: 2)
 * @param source - Price source (default: 'close')
 * @returns FRAMA values
 */
export declare function frama(data: MarketData | number[], length?: number, fc?: number, sc?: number, source?: string): number[];
//# sourceMappingURL=frama.d.ts.map