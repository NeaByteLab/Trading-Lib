/**
 * Validate market data format
 *
 * @param data - Market data to validate
 * @throws {Error} If market data is invalid
 */
export function validateMarketData(data) {
    if (!data || !Array.isArray(data.high) || !Array.isArray(data.low) ||
        !Array.isArray(data.close) || !Array.isArray(data.open)) {
        throw new Error('Invalid market data format');
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
        throw new Error('Volume data is required');
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
        throw new Error('Data must be an array');
    }
    if (data.length < minLength) {
        throw new Error(`Data must have at least ${minLength} elements`);
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
        throw new Error(`Length must be an integer greater than or equal to ${minLength}`);
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
        throw new Error(`Invalid source parameter: ${config.source}`);
    }
}
/**
 * Validate OHLCV data object
 */
export function validateOHLCV(dataObj) {
    const highVal = dataObj['high'];
    const lowVal = dataObj['low'];
    const closeVal = dataObj['close'];
    const openVal = dataObj['open'];
    if (highVal === undefined || lowVal === undefined || closeVal === undefined || openVal === undefined) {
        return false;
    }
    if (isNaN(highVal) || isNaN(lowVal) || isNaN(closeVal) || isNaN(openVal)) {
        return false;
    }
    return highVal >= lowVal && closeVal >= lowVal && closeVal <= highVal && openVal >= lowVal && openVal <= highVal;
}
