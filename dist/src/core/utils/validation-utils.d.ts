import type { MarketData } from '@core/types/indicator-types';
/**
 * Validate market data format
 *
 * @param data - Market data to validate
 * @throws {Error} If market data is invalid
 */
export declare function validateMarketData(data: MarketData): void;
/**
 * Validate volume data
 *
 * @param data - Market data to validate
 * @throws {Error} If volume data is missing
 */
export declare function validateVolumeData(data: MarketData): void;
/**
 * Validate array data
 *
 * @param data - Array to validate
 * @param minLength - Minimum required length
 * @throws {Error} If array is invalid
 */
export declare function validateArray(data: number[], minLength?: number): void;
/**
 * Validate length parameter
 *
 * @param length - Length parameter to validate
 * @param minLength - Minimum allowed length
 * @throws {Error} If length is invalid
 */
export declare function validateLength(length: number, minLength?: number): void;
/**
 * Sanitize array by removing NaN, null, and undefined values
 *
 * @param data - Array to sanitize
 * @returns Sanitized array
 */
export declare function sanitizeArray(data: (number | null | undefined)[]): number[];
/**
 * Validate indicator configuration
 *
 * @param config - Configuration to validate
 * @param allowedSources - Allowed source values
 * @throws {Error} If configuration is invalid
 */
export declare function validateIndicatorConfig(config?: {
    length?: number;
    source?: string;
}, allowedSources?: string[]): void;
/**
 * Validate indicator data - generic validator for both MarketData and number[]
 */
export declare function validateIndicatorData(data: MarketData | number[]): void;
/**
 * Validate MarketData specifically (requires OHLC)
 */
export declare function validateMarketDataOnly(data: MarketData | number[]): MarketData;
/**
 * Validate number array specifically
 */
export declare function validateNumberArrayOnly(data: MarketData | number[]): number[];
/**
 * Validate and sanitize window
 */
export declare function validateAndSanitizeWindow(window: number[]): number[];
//# sourceMappingURL=validation-utils.d.ts.map