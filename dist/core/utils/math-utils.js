export function sum(array) {
    return array.reduce((acc, val) => acc + val, 0);
}
export function average(array) {
    return sum(array) / array.length;
}
export function min(array) {
    return Math.min(...array);
}
export function max(array) {
    return Math.max(...array);
}
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
export function round(value, decimals = 2) {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
/**
 * Calculate highest values over a sliding window
 * Pine Script equivalent: highest(src, length)
 *
 * @param data - Source array of numbers
 * @param length - Window length for rolling calculation
 * @returns Array of highest values
 */
export function highest(data, length) {
    return rollingMax(data, length);
}
/**
 * Calculate lowest values over a sliding window
 * Pine Script equivalent: lowest(src, length)
 *
 * @param data - Source array of numbers
 * @param length - Window length for rolling calculation
 * @returns Array of lowest values
 */
export function lowest(data, length) {
    return rollingMin(data, length);
}
/**
 * Calculate changes between consecutive values
 * Pine Script equivalent: change(src)
 *
 * @param data - Source array of numbers
 * @returns Array of changes
 */
export function change(data) {
    if (data.length < 2) {
        return [];
    }
    const result = [];
    for (let i = 1; i < data.length; i++) {
        result.push(data[i] - data[i - 1]);
    }
    return result;
}
/**
 * Calculate absolute values for array
 * Pine Script equivalent: math.abs(src)
 *
 * @param data - Source array of numbers
 * @returns Array of absolute values
 */
export function abs(data) {
    return data.map(Math.abs);
}
/**
 * Calculate rolling minimum values over a sliding window
 * Pine Script equivalent: math.min(src, length)
 *
 * @param data - Source array of numbers
 * @param length - Window length for rolling calculation
 * @returns Array of rolling minimum values
 */
export function rollingMin(data, length) {
    if (length <= 0 || data.length === 0) {
        return [];
    }
    const result = [];
    const deque = [];
    const indices = [];
    for (let i = 0; i < data.length; i++) {
        const currentValue = data[i];
        // Remove elements outside the window
        if (indices.length > 0 && indices[0] <= i - length) {
            indices.shift();
            deque.shift();
        }
        // Remove elements that can't be minimum in current window
        while (deque.length > 0 && deque[deque.length - 1] > currentValue) {
            deque.pop();
            indices.pop();
        }
        // Add current element
        deque.push(currentValue);
        indices.push(i);
        // Add result if window is full
        if (i >= length - 1) {
            result.push(deque[0]);
        }
        else {
            result.push(NaN);
        }
    }
    return result;
}
/**
 * Calculate rolling maximum values over a sliding window
 * Pine Script equivalent: math.max(src, length)
 *
 * @param data - Source array of numbers
 * @param length - Window length for rolling calculation
 * @returns Array of rolling maximum values
 */
export function rollingMax(data, length) {
    if (length <= 0 || data.length === 0) {
        return [];
    }
    const result = [];
    const deque = [];
    const indices = [];
    for (let i = 0; i < data.length; i++) {
        const currentValue = data[i];
        // Remove elements outside the window
        if (indices.length > 0 && indices[0] <= i - length) {
            indices.shift();
            deque.shift();
        }
        // Remove elements that can't be maximum in current window
        while (deque.length > 0 && deque[deque.length - 1] < currentValue) {
            deque.pop();
            indices.pop();
        }
        // Add current element
        deque.push(currentValue);
        indices.push(i);
        // Add result if window is full
        if (i >= length - 1) {
            result.push(deque[0]);
        }
        else {
            result.push(NaN);
        }
    }
    return result;
}
/**
 * Calculate square root for array
 * Pine Script equivalent: math.sqrt(src)
 *
 * @param data - Source array of numbers
 * @returns Array of square root values
 */
export function sqrt(data) {
    return data.map(Math.sqrt);
}
/**
 * Calculate power for array
 * Pine Script equivalent: math.pow(src, exponent)
 *
 * @param data - Source array of numbers
 * @param exponent - Exponent to raise each value to
 * @returns Array of powered values
 */
export function pow(data, exponent) {
    return data.map(val => Math.pow(val, exponent));
}
/**
 * Calculate natural logarithm for array
 * Pine Script equivalent: math.log(src)
 *
 * @param data - Source array of numbers
 * @returns Array of natural logarithm values
 */
export function log(data) {
    return data.map(Math.log);
}
/**
 * Calculate base-10 logarithm for array
 * Pine Script equivalent: math.log10(src)
 *
 * @param data - Source array of numbers
 * @returns Array of base-10 logarithm values
 */
export function log10(data) {
    return data.map(Math.log10);
}
/**
 * Calculate sine for array
 * Pine Script equivalent: math.sin(src)
 *
 * @param data - Source array of numbers (in radians)
 * @returns Array of sine values
 */
export function sin(data) {
    return data.map(Math.sin);
}
/**
 * Calculate cosine for array
 * Pine Script equivalent: math.cos(src)
 *
 * @param data - Source array of numbers (in radians)
 * @returns Array of cosine values
 */
export function cos(data) {
    return data.map(Math.cos);
}
/**
 * Calculate tangent for array
 * Pine Script equivalent: math.tan(src)
 *
 * @param data - Source array of numbers (in radians)
 * @returns Array of tangent values
 */
export function tan(data) {
    return data.map(Math.tan);
}
/**
 * Calculate arc sine for array
 * Pine Script equivalent: math.asin(src)
 *
 * @param data - Source array of numbers
 * @returns Array of arc sine values (in radians)
 */
export function asin(data) {
    return data.map(Math.asin);
}
/**
 * Calculate arc cosine for array
 * Pine Script equivalent: math.acos(src)
 *
 * @param data - Source array of numbers
 * @returns Array of arc cosine values (in radians)
 */
export function acos(data) {
    return data.map(Math.acos);
}
/**
 * Calculate arc tangent for array
 * Pine Script equivalent: math.atan(src)
 *
 * @param data - Source array of numbers
 * @returns Array of arc tangent values (in radians)
 */
export function atan(data) {
    return data.map(Math.atan);
}
/**
 * Calculate floor for array
 * Pine Script equivalent: math.floor(src)
 *
 * @param data - Source array of numbers
 * @returns Array of floor values
 */
export function floor(data) {
    return data.map(Math.floor);
}
/**
 * Calculate ceiling for array
 * Pine Script equivalent: math.ceil(src)
 *
 * @param data - Source array of numbers
 * @returns Array of ceiling values
 */
export function ceil(data) {
    return data.map(Math.ceil);
}
/**
 * Calculate sign for array
 * Pine Script equivalent: math.sign(src)
 *
 * @param data - Source array of numbers
 * @returns Array of sign values (-1, 0, 1)
 */
export function sign(data) {
    return data.map(Math.sign);
}
/**
 * Calculate exponential for array
 * Pine Script equivalent: math.exp(src)
 *
 * @param data - Source array of numbers
 * @returns Array of exponential values
 */
export function exp(data) {
    return data.map(Math.exp);
}
/**
 * Calculate modulo for array
 * Pine Script equivalent: math.mod(src, divisor)
 *
 * @param data - Source array of numbers
 * @param divisor - Divisor for modulo operation
 * @returns Array of modulo values
 */
export function mod(data, divisor) {
    return data.map(val => val % divisor);
}
/**
 * Calculate remainder for array
 * Pine Script equivalent: math.rem(src, divisor)
 *
 * @param data - Source array of numbers
 * @param divisor - Divisor for remainder operation
 * @returns Array of remainder values
 */
export function rem(data, divisor) {
    return data.map(val => {
        const result = val % divisor;
        return result < 0 ? result + divisor : result;
    });
}
/**
 * Calculate factorial for array
 * Pine Script equivalent: math.factorial(src)
 *
 * @param data - Source array of numbers
 * @returns Array of factorial values
 */
export function factorial(data) {
    return data.map(val => {
        if (val < 0 || !Number.isInteger(val)) {
            return NaN;
        }
        if (val === 0 || val === 1) {
            return 1;
        }
        let result = 1;
        for (let i = 2; i <= val; i++) {
            result *= i;
        }
        return result;
    });
}
/**
 * Calculate greatest common divisor for two numbers
 * Pine Script equivalent: math.gcd(a, b)
 *
 * @param a - First number
 * @param b - Second number
 * @returns Greatest common divisor
 */
export function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
/**
 * Calculate least common multiple for two numbers
 * Pine Script equivalent: math.lcm(a, b)
 *
 * @param a - First number
 * @param b - Second number
 * @returns Least common multiple
 */
export function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}
//# sourceMappingURL=math-utils.js.map