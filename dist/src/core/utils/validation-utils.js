import { ERROR_MESSAGES } from '@constants/indicator-constants';
/**
 * Validate market data format
 *
 * @param data - Market data to validate
 * @throws {Error} If market data is invalid
 */
export function validateMarketData(data) {
    if (!data || !Array.isArray(data.high) || !Array.isArray(data.low) ||
        !Array.isArray(data.close) || !Array.isArray(data.open)) {
        throw new Error(ERROR_MESSAGES.MISSING_OHLC);
    }
}
/**
 * Validate volume data
 *
 * @param data - Market data to validate
 * @throws {Error} If volume data is missing
 */
export function validateVolumeData(data) {
    validateMarketData(data);
    if (!data.volume || data.volume.length === 0) {
        throw new Error(ERROR_MESSAGES.MISSING_VOLUME);
    }
}
/**
 * Validate array data
 *
 * @param data - Array to validate
 * @param minLength - Minimum required length
 * @throws {Error} If array is invalid
 */
export function validateArray(data, minLength = 1) {
    if (!Array.isArray(data)) {
        throw new Error(ERROR_MESSAGES.ARRAY_REQUIRED);
    }
    if (data.length < minLength) {
        throw new Error(ERROR_MESSAGES.MIN_LENGTH_REQUIRED.replace('{minLength}', minLength.toString()));
    }
}
/**
 * Validate length parameter
 *
 * @param length - Length parameter to validate
 * @param minLength - Minimum allowed length
 * @throws {Error} If length is invalid
 */
export function validateLength(length, minLength = 1) {
    if (!Number.isInteger(length) || length < minLength) {
        throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
    }
}
/**
 * Sanitize array by removing NaN values
 *
 * @param data - Array to sanitize
 * @returns Sanitized array
 */
export function sanitizeArray(data) {
    if (!Array.isArray(data)) {
        return [];
    }
    return data.filter(val => !isNaN(val));
}
/**
 * Validate indicator configuration
 *
 * @param config - Configuration to validate
 * @param allowedSources - Allowed source values
 * @throws {Error} If configuration is invalid
 */
export function validateIndicatorConfig(config, allowedSources = ['open', 'high', 'low', 'close', 'hl2', 'hlc3', 'typical', 'ohlc4', 'volume']) {
    if (config?.length !== undefined) {
        validateLength(config.length);
    }
    if (config?.source !== undefined && !allowedSources.includes(config.source)) {
        throw new Error(ERROR_MESSAGES.INVALID_SOURCE);
    }
}
/**
 * Validate indicator data
 */
export function validateIndicatorData(data) {
    if (!data) {
        throw new Error(ERROR_MESSAGES.NULL_UNDEFINED_DATA);
    }
    if (Array.isArray(data)) {
        if (data.length === 0) {
            throw new Error(ERROR_MESSAGES.EMPTY_DATA);
        }
    }
    else {
        if (!data.close || data.close.length === 0) {
            throw new Error(ERROR_MESSAGES.EMPTY_DATA);
        }
    }
}
/**
 * Validate and sanitize window
 */
export function validateAndSanitizeWindow(window) {
    if (!Array.isArray(window)) {
        return [];
    }
    return window.filter(val => !isNaN(val));
}
