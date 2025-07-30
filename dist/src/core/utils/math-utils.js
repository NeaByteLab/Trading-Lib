/**
 * Mathematical utility functions
 *
 * Provides centralized mathematical operations following Pine Script conventions.
 * All indicators should use these utilities instead of manual implementations.
 */
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { sanitizeArray } from './validation-utils';
const EMPTY_ARRAY_ERROR = 'Array cannot be empty';
/**
 * Create rolling window with validation
 *
 * @param array - Input array
 * @param windowSize - Window size
 * @param operation - Operation to perform on window
 * @returns Array of results
 * @throws {Error} If windowSize is invalid
 */
function createRollingWindow(array, windowSize, operation) {
    if (!array || array.length === 0) {
        throw new Error(EMPTY_ARRAY_ERROR);
    }
    if (windowSize <= 0) {
        throw new Error(ERROR_MESSAGES.INVALID_WINDOW_SIZE);
    }
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (i < windowSize - 1) {
            result.push(NaN);
            continue;
        }
        const window = array.slice(i - windowSize + 1, i + 1);
        const validValues = sanitizeArray(window);
        result.push(validValues.length > 0 ? operation(validValues) : NaN);
    }
    return result;
}
export const MathUtils = {
    /**
     * Calculate absolute value
     *
     * @param value - Input value
     * @returns Absolute value
     */
    abs(value) {
        return Math.abs(value);
    },
    /**
     * Find minimum value in array
     *
     * @param array - Input array
     * @returns Minimum value
     * @throws {Error} If array is empty
     */
    min(array) {
        if (!array || array.length === 0) {
            throw new Error(EMPTY_ARRAY_ERROR);
        }
        const validValues = sanitizeArray(array);
        return validValues.length > 0 ? Math.min(...validValues) : NaN;
    },
    /**
     * Find maximum value in array
     *
     * @param array - Input array
     * @returns Maximum value
     * @throws {Error} If array is empty
     */
    max(array) {
        if (!array || array.length === 0) {
            throw new Error(EMPTY_ARRAY_ERROR);
        }
        const validValues = sanitizeArray(array);
        return validValues.length > 0 ? Math.max(...validValues) : NaN;
    },
    /**
     * Calculate square root
     *
     * @param value - Input value
     * @returns Square root
     */
    sqrt(value) {
        return Math.sqrt(value);
    },
    /**
     * Calculate power
     *
     * @param base - Base value
     * @param exponent - Exponent
     * @returns Power result
     */
    pow(base, exponent) {
        return Math.pow(base, exponent);
    },
    /**
     * Calculate natural logarithm
     *
     * @param value - Input value
     * @returns Natural logarithm
     */
    log(value) {
        return Math.log(value);
    },
    /**
     * Calculate base-10 logarithm
     *
     * @param value - Input value
     * @returns Base-10 logarithm
     */
    log10(value) {
        return Math.log10(value);
    },
    /**
     * Calculate base-2 logarithm
     *
     * @param value - Input value
     * @returns Base-2 logarithm
     */
    log2(value) {
        return Math.log2(value);
    },
    /**
     * Calculate sine
     *
     * @param value - Input value in radians
     * @returns Sine value
     */
    sin(value) {
        return Math.sin(value);
    },
    /**
     * Calculate cosine
     *
     * @param value - Input value in radians
     * @returns Cosine value
     */
    cos(value) {
        return Math.cos(value);
    },
    /**
     * Calculate tangent
     *
     * @param value - Input value in radians
     * @returns Tangent value
     */
    tan(value) {
        return Math.tan(value);
    },
    /**
     * Calculate arcsine
     *
     * @param value - Input value
     * @returns Arcsine value in radians
     */
    asin(value) {
        return Math.asin(value);
    },
    /**
     * Calculate arccosine
     *
     * @param value - Input value
     * @returns Arccosine value in radians
     */
    acos(value) {
        return Math.acos(value);
    },
    /**
     * Calculate arctangent
     *
     * @param value - Input value
     * @returns Arctangent value in radians
     */
    atan(value) {
        return Math.atan(value);
    },
    /**
     * Calculate floor value
     *
     * @param value - Input value
     * @returns Floor value
     */
    floor(value) {
        return Math.floor(value);
    },
    /**
     * Calculate ceiling
     *
     * @param value - Input value
     * @returns Ceiling value
     */
    ceil(value) {
        return Math.ceil(value);
    },
    /**
     * Calculate sign
     *
     * @param value - Input value
     * @returns Sign value (-1, 0, 1)
     */
    sign(value) {
        return Math.sign(value);
    },
    /**
     * Calculate exponential
     *
     * @param value - Input value
     * @returns Exponential value
     */
    exp(value) {
        return Math.exp(value);
    },
    /**
     * Calculate modulo
     *
     * @param dividend - Dividend
     * @param divisor - Divisor
     * @returns Modulo result
     */
    mod(dividend, divisor) {
        return dividend % divisor;
    },
    /**
     * Calculate remainder
     *
     * @param dividend - Dividend
     * @param divisor - Divisor
     * @returns Remainder result
     */
    rem(dividend, divisor) {
        return dividend % divisor;
    },
    /**
     * Calculate factorial
     *
     * @param n - Input value
     * @returns Factorial result
     */
    factorial(n) {
        if (n < 0) {
            return NaN;
        }
        if (n === 0 || n === 1) {
            return 1;
        }
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    },
    /**
     * Calculate greatest common divisor
     *
     * @param a - First number
     * @param b - Second number
     * @returns GCD result
     */
    gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    },
    /**
     * Calculate least common multiple
     *
     * @param a - First number
     * @param b - Second number
     * @returns LCM result
     */
    lcm(a, b) {
        return Math.abs(a * b) / this.gcd(a, b);
    },
    /**
     * Calculate sum of array
     *
     * @param array - Input array
     * @returns Sum result
     * @throws {Error} If array is empty
     */
    sum(array) {
        const validValues = sanitizeArray(array);
        return validValues.length > 0 ? validValues.reduce((a, b) => a + b, 0) : 0;
    },
    /**
     * Calculate average of array
     *
     * @param array - Input array
     * @returns Average result
     * @throws {Error} If array is empty
     */
    average(array) {
        if (!array || array.length === 0) {
            throw new Error(EMPTY_ARRAY_ERROR);
        }
        const validValues = sanitizeArray(array);
        return validValues.length > 0 ? validValues.reduce((a, b) => a + b, 0) / validValues.length : NaN;
    },
    /**
     * Find minimum value in window
     *
     * @param array - Input array
     * @param windowSize - Window size
     * @returns Array of minimum values
     * @throws {Error} If windowSize is invalid
     */
    rollingMin(array, windowSize) {
        return createRollingWindow(array, windowSize, (values) => Math.min(...values));
    },
    /**
     * Find maximum value in window
     *
     * @param array - Input array
     * @param windowSize - Window size
     * @returns Array of maximum values
     * @throws {Error} If windowSize is invalid
     */
    rollingMax(array, windowSize) {
        return createRollingWindow(array, windowSize, (values) => Math.max(...values));
    },
    /**
     * Calculate change between two values
     *
     * @param current - Current value
     * @param previous - Previous value
     * @returns Change value
     */
    change(current, previous) {
        return current - previous;
    },
    /**
     * Calculate changes for array
     *
     * @param array - Input array
     * @returns Array of changes
     */
    changeArray(array) {
        if (!array || array.length < 2) {
            return [];
        }
        const result = [];
        for (let i = 1; i < array.length; i++) {
            const current = array[i];
            const previous = array[i - 1];
            result.push(isNaN(current) || isNaN(previous) ? NaN : current - previous);
        }
        return result;
    },
    /**
     * Calculate absolute values for array
     *
     * @param array - Input array
     * @returns Array of absolute values
     */
    absArray(array) {
        if (!array || array.length === 0) {
            return [];
        }
        return array.map(val => isNaN(val) ? NaN : Math.abs(val));
    },
    /**
     * Calculate highest value in window
     *
     * @param array - Input array
     * @param windowSize - Window size
     * @returns Array with highest values
     * @throws {Error} If windowSize is invalid
     */
    highest(array, windowSize) {
        return createRollingWindow(array, windowSize, (values) => Math.max(...values));
    },
    /**
     * Calculate lowest value in window
     *
     * @param array - Input array
     * @param windowSize - Window size
     * @returns Array with lowest values
     * @throws {Error} If windowSize is invalid
     */
    lowest(array, windowSize) {
        return createRollingWindow(array, windowSize, (values) => Math.min(...values));
    },
    /**
     * Clamp value between min and max
     *
     * @param value - Input value
     * @param min - Minimum value
     * @param max - Maximum value
     * @returns Clamped value
     */
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },
    /**
     * Round value to specified decimals
     *
     * @param value - Input value
     * @param decimals - Number of decimal places (default: 0)
     * @returns Rounded value
     */
    round(value, decimals = 0) {
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    }
};
