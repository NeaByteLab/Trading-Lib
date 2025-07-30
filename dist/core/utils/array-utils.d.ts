/**
 * Array utility functions for technical analysis
 * Provides common array operations used across indicators
 */
/**
 * Get the first element of an array
 */
export declare function first<T>(array: T[]): T | undefined;
/**
 * Get the last element of an array
 */
export declare function last<T>(array: T[]): T | undefined;
/**
 * Get all elements except the first
 */
export declare function tail<T>(array: T[]): T[];
/**
 * Get all elements except the last
 */
export declare function head<T>(array: T[]): T[];
/**
 * Take the first n elements
 */
export declare function take<T>(array: T[], n: number): T[];
/**
 * Take the last n elements
 */
export declare function takeLast<T>(array: T[], n: number): T[];
/**
 * Shift array by n positions (add NaN padding)
 */
export declare function shift<T>(array: T[], n: number): T[];
/**
 * Reverse an array
 */
export declare function reverse<T>(array: T[]): T[];
/**
 * Check if array is empty
 */
export declare function isEmpty<T>(array: T[]): boolean;
/**
 * Get array length
 */
export declare function length<T>(array: T[]): number;
/**
 * Slice array with start and end indices
 */
export declare function slice<T>(array: T[], start: number, end?: number): T[];
/**
 * Fill array with a value
 */
export declare function fill<T>(array: T[], value: T): T[];
/**
 * Map array with a function
 */
export declare function map<T, U>(array: T[], fn: (value: T, index: number) => U): U[];
/**
 * Filter array with a predicate
 */
export declare function filter<T>(array: T[], predicate: (value: T, index: number) => boolean): T[];
/**
 * Find index of element that satisfies predicate
 */
export declare function findIndex<T>(array: T[], predicate: (value: T, index: number) => boolean): number;
/**
 * Calculate percent change between consecutive values
 */
export declare function percentChange(array: number[]): number[];
//# sourceMappingURL=array-utils.d.ts.map