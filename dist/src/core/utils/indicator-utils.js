import { BaseIndicator } from '@base/base-indicator';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
/**
 * Centralized validation for indicators requiring OHLC data
 * Eliminates duplication of the same validation pattern across indicators
 */
export function validateOHLCData(data, _config) {
    if (Array.isArray(data)) {
        throw new Error(ERROR_MESSAGES.MISSING_OHLC);
    }
    return data;
}
/**
 * Centralized validation for indicators requiring volume data
 * Eliminates duplication of the same validation pattern across indicators
 */
export function validateVolumeDataForIndicators(data) {
    if (!data.volume) {
        throw new Error(ERROR_MESSAGES.VOLUME_REQUIRED);
    }
    return data;
}
/**
 * Centralized result creation with consistent metadata
 * Eliminates duplication of the same result structure across indicators
 */
export function createIndicatorResult(values, length, source = 'hlc3', additionalMetadata = {}) {
    return {
        values,
        metadata: {
            length,
            source,
            ...additionalMetadata
        }
    };
}
/**
 * Centralized calculation wrapper for indicators with length parameter
 * Eliminates duplication of the same calculation pattern across indicators
 */
export function calculateWithLength(IndicatorClass, data, length, source = 'hlc3', additionalConfig) {
    const indicator = new IndicatorClass();
    const config = { length, source, ...additionalConfig };
    return indicator.calculate(data, config);
}
/**
 * Unified indicator wrapper to eliminate duplication
 * All indicators can use this single pattern instead of duplicating the same structure
 */
export function createIndicatorWrapper(IndicatorClass, data, length, source, additionalConfig) {
    const indicator = new IndicatorClass();
    const config = { ...additionalConfig };
    if (length !== undefined) {
        config.length = length;
    }
    if (source !== undefined) {
        config.source = source;
    }
    const result = indicator.calculate(data, config);
    return result.values;
}
/**
 * Unified indicator wrapper for multi-result indicators
 */
export function createMultiResultIndicatorWrapper(IndicatorClass, data, length, source, additionalConfig) {
    const indicator = new IndicatorClass();
    const config = { ...additionalConfig };
    if (length !== undefined) {
        config.length = length;
    }
    if (source !== undefined) {
        config.source = source;
    }
    return indicator.calculate(data, config);
}
