/**
 * Validate if an array is valid (not empty and contains numbers)
 */
export function validateArray(array) {
    return Array.isArray(array) && array.length > 0 && array.every(val => typeof val === 'number');
}
/**
 * Sanitize array by removing invalid values
 */
export function sanitizeArray(array) {
    return array.map(val => typeof val === 'number' && !isNaN(val) && isFinite(val) ? val : NaN);
}
/**
 * Validate length parameter
 */
export function validateLength(length) {
    return typeof length === 'number' && length > 0 && Number.isInteger(length);
}
/**
 * Validate source parameter
 */
export function validateSource(source) {
    const validSources = ['open', 'high', 'low', 'close', 'hl2', 'hlc3', 'typical', 'ohlc4', 'volume'];
    return typeof source === 'string' && validSources.includes(source);
}
/**
 * Validate market data structure
 */
export function validateMarketData(data) {
    if (!data || typeof data !== 'object') {
        return false;
    }
    const { open, high, low, close } = data;
    return Array.isArray(open) && Array.isArray(high) && Array.isArray(low) && Array.isArray(close) &&
        open.length > 0 && high.length > 0 && low.length > 0 && close.length > 0 &&
        open.length === high.length && high.length === low.length && low.length === close.length;
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
/**
 * Array utilities object for centralized access
 */
export const ArrayUtils = {
    validateArray,
    sanitizeArray,
    validateLength,
    validateSource,
    validateMarketData,
    validateOHLCV
};
//# sourceMappingURL=validation-utils.js.map