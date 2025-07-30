import { BaseIndicator } from '@base/base-indicator';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { validateIndicatorData } from '@utils/validation-utils';
/**
 * Base class for oscillator indicators
 * Eliminates duplication in oscillator validation and processing patterns
 */
export class OscillatorIndicator extends BaseIndicator {
    defaultLength;
    minLength;
    maxLength;
    constructor(name, description, defaultLength = 14, minLength = 1, maxLength) {
        super(name, description, 'momentum');
        this.defaultLength = defaultLength;
        this.minLength = minLength;
        if (maxLength !== undefined) {
            this.maxLength = maxLength;
        }
    }
    /**
     * Centralized oscillator validation
     * Eliminates duplication across all oscillator indicators
     */
    validateInput(data, config) {
        validateIndicatorData(data);
        const length = config?.length || this.defaultLength;
        if (length < this.minLength) {
            throw new Error(ERROR_MESSAGES.LENGTH_MIN_REQUIRED.replace('{minLength}', this.minLength.toString()));
        }
        if (this.maxLength && length > this.maxLength) {
            throw new Error(ERROR_MESSAGES.LENGTH_MAX_EXCEEDED.replace('{maxLength}', this.maxLength.toString()));
        }
    }
    /**
     * Standard oscillator calculation wrapper
     * Provides consistent processing for all oscillators
     */
    calculate(data, config) {
        this.validateInput(data, config);
        const source = Array.isArray(data) ? data : data.close;
        const length = config?.length || this.defaultLength;
        const values = this.calculateOscillator(source, length);
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
}
