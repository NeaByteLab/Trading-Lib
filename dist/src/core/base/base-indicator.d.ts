import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Base class for all technical indicators
 * Provides common functionality and validation for consistent indicator implementation
 *
 * @example
 * ```typescript
 * class MyIndicator extends BaseIndicator {
 *   constructor() {
 *     super('MyIndicator', 'My Custom Indicator', 'momentum')
 *   }
 *
 *   calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
 *     // Implementation here
 *   }
 * }
 * ```
 */
export declare abstract class BaseIndicator {
    name: string;
    description: string;
    category: string;
    constructor(name: string, description: string, category: string);
    /**
     * Validate input data and configuration
     * Ensures data integrity before calculation
     *
     * @param _data - Input data to validate
     * @param _config - Configuration parameters
     */
    validateInput(_data: MarketData | number[], _config?: IndicatorConfig): void;
    /**
     * Centralized length validation
     * Eliminates duplication across all indicators
     *
     * @param length - Length parameter to validate
     * @param minLength - Minimum allowed length
     * @param maxLength - Maximum allowed length (optional)
     */
    validateLength(length: number, minLength: number, maxLength?: number): void;
    /**
     * Centralized multiplier validation
     * Eliminates duplication across volatility indicators
     *
     * @param multiplier - Multiplier value to validate
     */
    validateMultiplier(multiplier: number): void;
    /**
     * Get source data based on configuration
     * Maps price source strings to actual data arrays
     *
     * @param data - Market data object
     * @param source - Price source identifier
     * @returns Array of price values
     */
    getSourceData(data: MarketData, source?: string): number[];
    /**
     * Calculate indicator values
     * Abstract method that must be implemented by all indicators
     *
     * @param _data - Market data or price array
     * @param _config - Indicator configuration
     * @returns Indicator calculation result
     */
    abstract calculate(_data: MarketData | number[], _config?: IndicatorConfig): IndicatorResult;
}
//# sourceMappingURL=base-indicator.d.ts.map