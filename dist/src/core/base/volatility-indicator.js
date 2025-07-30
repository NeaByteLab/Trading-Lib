import { BaseIndicator } from '@core/base/base-indicator';
import { validateIndicatorData } from '@core/utils/validation-utils';
/**
 * Base class for volatility indicators
 * Eliminates duplication in volatility validation and processing patterns
 */
export class VolatilityIndicator extends BaseIndicator {
    defaultLength;
    defaultMultiplier;
    minLength;
    maxLength;
    constructor(name, description, defaultLength = 20, defaultMultiplier = 2.0, minLength = 1, maxLength) {
        super(name, description, 'volatility');
        this.defaultLength = defaultLength;
        this.defaultMultiplier = defaultMultiplier;
        this.minLength = minLength;
        if (maxLength !== undefined) {
            this.maxLength = maxLength;
        }
    }
    /**
     * Centralized volatility validation
     * Eliminates duplication across all volatility indicators
     */
    validateInput(data, config) {
        validateIndicatorData(data);
        const length = config?.length !== undefined ? config.length : this.defaultLength;
        this.validateLength(length, this.minLength, this.maxLength);
        const multiplier = config?.['multiplier'];
        if (multiplier !== undefined) {
            this.validateMultiplier(multiplier);
        }
    }
    /**
     * Standard volatility calculation wrapper
     * Provides consistent processing for all volatility indicators
     */
    calculate(data, config) {
        this.validateInput(data, config);
        const source = Array.isArray(data) ? data : data.close;
        const length = config?.length || this.defaultLength;
        const multiplier = config?.['multiplier'] || this.defaultMultiplier;
        const values = this.calculateVolatility(source, length, multiplier);
        return {
            values,
            metadata: {
                length,
                multiplier,
                source: config?.source || 'close'
            }
        };
    }
}
