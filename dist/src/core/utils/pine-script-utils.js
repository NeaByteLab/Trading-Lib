import { PinePrice } from './pine-core';
/**
 * Get source data based on price source
 *
 * @param data - Market data or price array
 * @param source - Price source ('open', 'high', 'low', 'close', 'hl2', 'hlc3', 'ohlc4')
 * @returns Array of price values
 */
export function pineSource(data, source = 'close') {
    if (Array.isArray(data)) {
        return data;
    }
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
            // Use PinePrice utilities instead of manual calculations
            return PinePrice.hl2(data);
        case 'hlc3':
            // Use PinePrice utilities instead of manual calculations
            return PinePrice.hlc3(data);
        case 'ohlc4':
            // Use PinePrice utilities instead of manual calculations
            return PinePrice.ohlc4(data);
        default:
            return data.close;
    }
}
/**
 * Validate and return length parameter
 *
 * @param length - Length parameter
 * @param defaultLength - Default length value (default: 14)
 * @returns Validated length value
 */
export function pineLength(length, defaultLength = 14) {
    return length || defaultLength;
}
/**
 * Apply offset to array values
 *
 * @param array - Source array
 * @param offset - Offset value (default: 0)
 * @returns Array with applied offset
 */
export function pineOffset(array, offset = 0) {
    if (offset === 0) {
        return array;
    }
    const result = new Array(array.length);
    for (let i = 0; i < array.length; i++) {
        if (i < offset) {
            result[i] = NaN;
        }
        else {
            result[i] = array[i - offset];
        }
    }
    return result;
}
