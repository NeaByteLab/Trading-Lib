import type { MarketData } from '@core/types/indicator-types';
/**
 * Validate if an array is valid (not empty and contains numbers)
 */
export declare function validateArray(array: number[]): boolean;
/**
 * Sanitize array by removing invalid values
 */
export declare function sanitizeArray(array: number[]): number[];
/**
 * Validate length parameter
 */
export declare function validateLength(length: number): boolean;
/**
 * Validate source parameter
 */
export declare function validateSource(source: string): boolean;
/**
 * Validate market data structure
 */
export declare function validateMarketData(data: MarketData): boolean;
/**
 * Validate OHLCV data object
 */
export declare function validateOHLCV(dataObj: Record<string, any>): boolean;
/**
 * Array utilities object for centralized access
 */
export declare const ArrayUtils: {
    validateArray: typeof validateArray;
    sanitizeArray: typeof sanitizeArray;
    validateLength: typeof validateLength;
    validateSource: typeof validateSource;
    validateMarketData: typeof validateMarketData;
    validateOHLCV: typeof validateOHLCV;
};
//# sourceMappingURL=validation-utils.d.ts.map