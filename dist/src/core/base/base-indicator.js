import { ERROR_MESSAGES } from '@core/constants/indicator-constants';
import { PriceCalculations } from '@core/utils/calculation-utils';
import { validateIndicatorData } from '@core/utils/validation-utils';
/**
 * Base class for all technical indicators
 * Provides common functionality and validation
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
     *
     * @param _data - Input data
     * @param _config - Configuration
     */
    validateInput(_data, _config) {
        validateIndicatorData(_data);
    }
    /**
     * Centralized length validation
     * Eliminates duplication across all indicators
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
     */
    validateMultiplier(multiplier) {
        if (multiplier <= 0) {
            throw new Error(ERROR_MESSAGES.INVALID_MULTIPLIER);
        }
    }
    /**
     * Get source data based on configuration
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
