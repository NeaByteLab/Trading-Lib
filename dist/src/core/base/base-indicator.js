import { ERROR_MESSAGES } from '@core/constants/indicator-constants';
import { PriceCalculations } from '@core/utils/calculation-utils';
import { validateIndicatorData } from '@core/utils/validation-utils';
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
export class BaseIndicator {
    name;
    description;
    category;
    constructor(name, description, category) {
        this.name = name;
        this.description = description;
        this.category = category;
    }
    /**
     * Validate input data and configuration
     * Ensures data integrity before calculation
     *
     * @param _data - Input data to validate
     * @param _config - Configuration parameters
     */
    validateInput(_data, _config) {
        validateIndicatorData(_data);
    }
    /**
     * Centralized length validation
     * Eliminates duplication across all indicators
     *
     * @param length - Length parameter to validate
     * @param minLength - Minimum allowed length
     * @param maxLength - Maximum allowed length (optional)
     */
    validateLength(length, minLength, maxLength) {
        if (length < minLength) {
            throw new Error(ERROR_MESSAGES.LENGTH_MIN_REQUIRED.replace('{minLength}', minLength.toString()));
        }
        if (maxLength && length > maxLength) {
            throw new Error(ERROR_MESSAGES.LENGTH_MAX_EXCEEDED.replace('{maxLength}', maxLength.toString()));
        }
    }
    /**
     * Centralized multiplier validation
     * Eliminates duplication across volatility indicators
     *
     * @param multiplier - Multiplier value to validate
     */
    validateMultiplier(multiplier) {
        if (multiplier <= 0) {
            throw new Error(ERROR_MESSAGES.INVALID_MULTIPLIER);
        }
    }
    /**
     * Get source data based on configuration
     * Maps price source strings to actual data arrays
     *
     * @param data - Market data object
     * @param source - Price source identifier
     * @returns Array of price values
     */
    getSourceData(data, source) {
        switch (source) {
            case 'open':
                return data.open;
            case 'high':
                return data.high;
            case 'low':
                return data.low;
            case 'close':
                return data.close;
            case 'hl2':
                return PriceCalculations.hl2(data);
            case 'hlc3':
            case 'typical':
                return PriceCalculations.typical(data);
            case 'ohlc4':
                return PriceCalculations.ohlc4(data);
            case 'volume':
                if (!data.volume) {
                    throw new Error(ERROR_MESSAGES.VOLUME_REQUIRED);
                }
                return data.volume;
            default:
                return data.close;
        }
    }
}
