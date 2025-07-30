import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Base class for all technical indicators
 * Provides common functionality and validation
 */
export declare abstract class BaseIndicator {
    name: string;
    description: string;
    category: string;
    constructor(name: string, description: string, category: string);
    /**
     * Validate input data and configuration
     *
     * @param _data - Input data (unused in base implementation)
     * @param _config - Configuration (unused in base implementation)
     */
    validateInput(_data: MarketData | number[], _config?: IndicatorConfig): void;
    /**
     * Get source data based on configuration
     */
    getSourceData(data: MarketData, source?: string): number[];
    /**
     * Calculate indicator values
     *
     * @param _data - Market data or price array
     * @param _config - Indicator configuration
     * @returns Indicator calculation result
     */
    abstract calculate(_data: MarketData | number[], _config?: IndicatorConfig): IndicatorResult;
}
//# sourceMappingURL=base-indicator.d.ts.map