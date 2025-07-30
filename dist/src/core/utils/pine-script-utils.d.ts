import type { MarketData } from '@core/types/indicator-types';
/**
 * Get source data based on price source
 *
 * @param data - Market data or price array
 * @param source - Price source ('open', 'high', 'low', 'close', 'hl2', 'hlc3', 'ohlc4')
 * @returns Array of price values
 */
export declare function pineSource(data: MarketData | number[], source?: string): number[];
/**
 * Validate and return length parameter
 *
 * @param length - Length parameter
 * @param defaultLength - Default length value (default: 14)
 * @returns Validated length value
 */
export declare function pineLength(length: number, defaultLength?: number): number;
/**
 * Apply offset to array values
 *
 * @param array - Source array
 * @param offset - Offset value (default: 0)
 * @returns Array with applied offset
 */
export declare function pineOffset(array: number[], offset?: number): number[];
//# sourceMappingURL=pine-script-utils.d.ts.map