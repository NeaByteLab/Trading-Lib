import { BaseIndicator } from '@base/base-indicator';
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
