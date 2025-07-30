import type { IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Strategy Builder
 *
 * Provides utilities for building and combining technical indicators into trading strategies.
 */
export declare class StrategyBuilder {
    /**
     * Combine multiple indicators into a single strategy
     *
     * @param indicators - Array of indicators to combine
     * @returns Combined indicator result
     */
    static combineIndicators(indicators: IndicatorResult[]): IndicatorResult;
    /**
     * Create a crossover strategy between two indicators
     *
     * @param fastIndicator - Fast indicator
     * @param slowIndicator - Slow indicator
     * @returns Crossover signal values
     */
    static createCrossover(fastIndicator: IndicatorResult, slowIndicator: IndicatorResult): number[];
    /**
     * Create a divergence strategy between price and indicator
     *
     * @param priceData - Price data
     * @param indicatorData - Indicator data
     * @param length - Lookback period
     * @returns Divergence signal values
     */
    static createDivergence(priceData: MarketData, indicatorData: IndicatorResult, length?: number): number[];
}
//# sourceMappingURL=strategy-builder.d.ts.map