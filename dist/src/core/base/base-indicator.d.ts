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
     * @param _data - Input data
     * @param _config - Configuration
     */
    validateInput(_data: MarketData | number[], _config?: IndicatorConfig): void;
    /**
     * Centralized length validation
     * Eliminates duplication across all indicators
     */
    validateLength(length: number, minLength: number, maxLength?: number): void;
    /**
     * Centralized multiplier validation
     * Eliminates duplication across volatility indicators
     */
    validateMultiplier(multiplier: number): void;
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