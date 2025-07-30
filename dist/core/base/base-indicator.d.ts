import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Base class for all technical indicators
 * Provides common functionality and validation
 */
export declare abstract class BaseIndicator {
    protected name: string;
    protected description: string;
    protected category: string;
    constructor(name: string, description: string, category: string);
    /**
     * Validate input data and configuration
     */
    protected validateInput(_data: MarketData | number[], _config?: IndicatorConfig): void;
    /**
     * Get source data based on configuration
     */
    protected getSourceData(data: MarketData, source?: string): number[];
    /**
     * Abstract method that must be implemented by subclasses
     */
    abstract calculate(_data: MarketData | number[], _config?: IndicatorConfig): IndicatorResult;
}
//# sourceMappingURL=base-indicator.d.ts.map