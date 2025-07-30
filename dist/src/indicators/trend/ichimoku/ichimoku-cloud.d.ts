import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Ichimoku Cloud indicator
 *
 * Provides multiple components of the Ichimoku Cloud system:
 * - Tenkan-sen (Conversion Line)
 * - Kijun-sen (Base Line)
 * - Senkou Span A (Leading Span A)
 * - Senkou Span B (Leading Span B)
 * - Chikou Span (Lagging Span)
 *
 * @example
 * ```typescript
 * const ichimoku = new IchimokuCloud()
 * const result = ichimoku.calculate(marketData)
 * console.log(result.values) // Tenkan-sen values
 * console.log(result.metadata.kijun) // Kijun-sen values
 * console.log(result.metadata.senkouA) // Senkou Span A values
 * console.log(result.metadata.senkouB) // Senkou Span B values
 * console.log(result.metadata.chikou) // Chikou Span values
 * ```
 */
export declare class IchimokuCloud extends BaseIndicator {
    constructor();
    /**
     * Calculate Ichimoku Cloud values
     *
     * @param data - Market data
     * @param config - Indicator configuration
     * @returns Ichimoku Cloud calculation result
     */
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    /**
     * Calculate Ichimoku Cloud components using centralized utilities
     *
     * @param data - Market data
     * @param tenkanPeriod - Tenkan-sen period
     * @param kijunPeriod - Kijun-sen period
     * @param senkouBPeriod - Senkou Span B period
     * @param displacement - Displacement period
     * @returns All Ichimoku components
     */
    private calculateIchimoku;
    /**
     * Calculate midpoint (highest high + lowest low) / 2
     *
     * @param high - High prices array
     * @param low - Low prices array
     * @param period - Calculation period
     * @returns Midpoint values array
     */
    private calculateMidpoint;
    /**
     * Calculate Senkou Span A
     *
     * @param tenkan - Tenkan-sen values
     * @param kijun - Kijun-sen values
     * @param displacement - Displacement period
     * @returns Senkou Span A values
     */
    private calculateSenkouA;
    /**
     * Shift array by specified amount
     *
     * @param array - Input array
     * @param shift - Shift amount (positive = forward, negative = backward)
     * @returns Shifted array
     */
    private shiftArray;
}
/**
 * Calculate Ichimoku Cloud values using wrapper function
 *
 * @param data - Market data
 * @param tenkanPeriod - Tenkan-sen period (default: 9)
 * @param kijunPeriod - Kijun-sen period (default: 26)
 * @param senkouBPeriod - Senkou Span B period (default: 52)
 * @param displacement - Displacement period (default: 26)
 * @returns Ichimoku Cloud components
 */
export declare function ichimokuCloud(data: MarketData | number[], tenkanPeriod?: number, kijunPeriod?: number, senkouBPeriod?: number, displacement?: number): {
    tenkan: number[];
    kijun: number[];
    senkouA: number[];
    senkouB: number[];
    chikou: number[];
};
//# sourceMappingURL=ichimoku-cloud.d.ts.map