/**
 * Array utility functions for technical analysis
 * Provides common array operations used across indicators
 */
/**
 * Get the first element of an array
 */
export function first(array) {
    return array[0];
}
/**
 * Get the last element of an array
 */
export function last(array) {
    return array[array.length - 1];
}
/**
 * Get all elements except the first
 */
export function tail(array) {
    return array.slice(1);
}
/**
 * Get all elements except the last
 */
export function head(array) {
    return array.slice(0, -1);
}
/**
 * Take the first n elements
 */
export function take(array, n) {
    return array.slice(0, n);
}
/**
 * Take the last n elements
 */
export function takeLast(array, n) {
    return array.slice(-n);
}
/**
 * Shift array by n positions (add NaN padding)
 */
export function shift(array, n) {
    const padding = new Array(n).fill(NaN);
    return [...padding, ...array.slice(0, -n)];
}
/**
 * Reverse an array
 */
export function reverse(array) {
    return [...array].reverse();
}
/**
 * Check if array is empty
 */
export function isEmpty(array) {
    return array.length === 0;
}
/**
 * Get array length
 */
export function length(array) {
    return array.length;
}
/**
 * Slice array with start and end indices
 */
export function slice(array, start, end) {
    return array.slice(start, end);
}
/**
 * Fill array with a value
 */
export function fill(array, value) {
    return array.map(() => value);
}
/**
 * Map array with a function
 */
export function map(array, fn) {
    return array.map(fn);
}
/**
 * Filter array with a predicate
 */
export function filter(array, predicate) {
    return array.filter(predicate);
}
/**
 * Find index of element that satisfies predicate
 */
export function findIndex(array, predicate) {
    return array.findIndex(predicate);
}
/**
 * Calculate percent change between consecutive values
 */
export function percentChange(array) {
    if (array.length < 2) {
        return [];
    }
    const result = [];
    for (let i = 1; i < array.length; i++) {
        const change = ((array[i] - array[i - 1]) / array[i - 1]) * 100;
        result.push(change);
    }
    return result;
}
//# sourceMappingURL=array-utils.js.map