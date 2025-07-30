import { BaseIndicator } from '@base/base-indicator';
import { PriceCalculations } from '@utils/calculation-utils';
import { sanitizeArray } from '@utils/validation-utils';
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
/**
 * Unified validation for all indicators
 */
export function validateIndicatorInput(data, config) {
    if (!data) {
        throw new Error('Input data cannot be null or undefined');
    }
    if (Array.isArray(data)) {
        if (data.length === 0) {
            throw new Error('Input array cannot be empty');
        }
    }
    else {
        if (!data.close || data.close.length === 0) {
            throw new Error('Invalid market data format');
        }
    }
    if (config?.length && config.length <= 0) {
        throw new Error('Length must be a positive integer');
    }
    if (config?.source && !['open', 'high', 'low', 'close', 'hl2', 'hlc3', 'ohlc4', 'volume'].includes(config.source)) {
        throw new Error('Invalid source parameter');
    }
}
/**
 * Unified source data extraction using centralized PriceCalculations
 */
export function extractSourceData(data, source = 'close') {
    if (Array.isArray(data)) {
        return sanitizeArray(data);
    }
    switch (source) {
        case 'open':
            return sanitizeArray(data.open);
        case 'high':
            return sanitizeArray(data.high);
        case 'low':
            return sanitizeArray(data.low);
        case 'close':
            return sanitizeArray(data.close);
        case 'hl2':
            return sanitizeArray(PriceCalculations.hl2(data));
        case 'hlc3':
            return sanitizeArray(PriceCalculations.typical(data));
        case 'ohlc4':
            return sanitizeArray(PriceCalculations.ohlc4(data));
        case 'volume':
            return data.volume ? sanitizeArray(data.volume) : new Array(data.close.length).fill(NaN);
        default:
            return sanitizeArray(data.close);
    }
}
//# sourceMappingURL=indicator-utils.js.map