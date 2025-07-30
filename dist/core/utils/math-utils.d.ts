export declare function sum(array: number[]): number;
export declare function average(array: number[]): number;
export declare function min(array: number[]): number;
export declare function max(array: number[]): number;
export declare function clamp(value: number, min: number, max: number): number;
export declare function round(value: number, decimals?: number): number;
/**
 * Calculate highest values over a sliding window
 * Pine Script equivalent: highest(src, length)
 *
 * @param data - Source array of numbers
 * @param length - Window length for rolling calculation
 * @returns Array of highest values
 */
export declare function highest(data: number[], length: number): number[];
/**
 * Calculate lowest values over a sliding window
 * Pine Script equivalent: lowest(src, length)
 *
 * @param data - Source array of numbers
 * @param length - Window length for rolling calculation
 * @returns Array of lowest values
 */
export declare function lowest(data: number[], length: number): number[];
/**
 * Calculate changes between consecutive values
 * Pine Script equivalent: change(src)
 *
 * @param data - Source array of numbers
 * @returns Array of changes
 */
export declare function change(data: number[]): number[];
/**
 * Calculate absolute values for array
 * Pine Script equivalent: math.abs(src)
 *
 * @param data - Source array of numbers
 * @returns Array of absolute values
 */
export declare function abs(data: number[]): number[];
/**
 * Calculate rolling minimum values over a sliding window
 * Pine Script equivalent: math.min(src, length)
 *
 * @param data - Source array of numbers
 * @param length - Window length for rolling calculation
 * @returns Array of rolling minimum values
 */
export declare function rollingMin(data: number[], length: number): number[];
/**
 * Calculate rolling maximum values over a sliding window
 * Pine Script equivalent: math.max(src, length)
 *
 * @param data - Source array of numbers
 * @param length - Window length for rolling calculation
 * @returns Array of rolling maximum values
 */
export declare function rollingMax(data: number[], length: number): number[];
/**
 * Calculate square root for array
 * Pine Script equivalent: math.sqrt(src)
 *
 * @param data - Source array of numbers
 * @returns Array of square root values
 */
export declare function sqrt(data: number[]): number[];
/**
 * Calculate power for array
 * Pine Script equivalent: math.pow(src, exponent)
 *
 * @param data - Source array of numbers
 * @param exponent - Exponent to raise each value to
 * @returns Array of powered values
 */
export declare function pow(data: number[], exponent: number): number[];
/**
 * Calculate natural logarithm for array
 * Pine Script equivalent: math.log(src)
 *
 * @param data - Source array of numbers
 * @returns Array of natural logarithm values
 */
export declare function log(data: number[]): number[];
/**
 * Calculate base-10 logarithm for array
 * Pine Script equivalent: math.log10(src)
 *
 * @param data - Source array of numbers
 * @returns Array of base-10 logarithm values
 */
export declare function log10(data: number[]): number[];
/**
 * Calculate sine for array
 * Pine Script equivalent: math.sin(src)
 *
 * @param data - Source array of numbers (in radians)
 * @returns Array of sine values
 */
export declare function sin(data: number[]): number[];
/**
 * Calculate cosine for array
 * Pine Script equivalent: math.cos(src)
 *
 * @param data - Source array of numbers (in radians)
 * @returns Array of cosine values
 */
export declare function cos(data: number[]): number[];
/**
 * Calculate tangent for array
 * Pine Script equivalent: math.tan(src)
 *
 * @param data - Source array of numbers (in radians)
 * @returns Array of tangent values
 */
export declare function tan(data: number[]): number[];
/**
 * Calculate arc sine for array
 * Pine Script equivalent: math.asin(src)
 *
 * @param data - Source array of numbers
 * @returns Array of arc sine values (in radians)
 */
export declare function asin(data: number[]): number[];
/**
 * Calculate arc cosine for array
 * Pine Script equivalent: math.acos(src)
 *
 * @param data - Source array of numbers
 * @returns Array of arc cosine values (in radians)
 */
export declare function acos(data: number[]): number[];
/**
 * Calculate arc tangent for array
 * Pine Script equivalent: math.atan(src)
 *
 * @param data - Source array of numbers
 * @returns Array of arc tangent values (in radians)
 */
export declare function atan(data: number[]): number[];
/**
 * Calculate floor for array
 * Pine Script equivalent: math.floor(src)
 *
 * @param data - Source array of numbers
 * @returns Array of floor values
 */
export declare function floor(data: number[]): number[];
/**
 * Calculate ceiling for array
 * Pine Script equivalent: math.ceil(src)
 *
 * @param data - Source array of numbers
 * @returns Array of ceiling values
 */
export declare function ceil(data: number[]): number[];
/**
 * Calculate sign for array
 * Pine Script equivalent: math.sign(src)
 *
 * @param data - Source array of numbers
 * @returns Array of sign values (-1, 0, 1)
 */
export declare function sign(data: number[]): number[];
/**
 * Calculate exponential for array
 * Pine Script equivalent: math.exp(src)
 *
 * @param data - Source array of numbers
 * @returns Array of exponential values
 */
export declare function exp(data: number[]): number[];
/**
 * Calculate modulo for array
 * Pine Script equivalent: math.mod(src, divisor)
 *
 * @param data - Source array of numbers
 * @param divisor - Divisor for modulo operation
 * @returns Array of modulo values
 */
export declare function mod(data: number[], divisor: number): number[];
/**
 * Calculate remainder for array
 * Pine Script equivalent: math.rem(src, divisor)
 *
 * @param data - Source array of numbers
 * @param divisor - Divisor for remainder operation
 * @returns Array of remainder values
 */
export declare function rem(data: number[], divisor: number): number[];
/**
 * Calculate factorial for array
 * Pine Script equivalent: math.factorial(src)
 *
 * @param data - Source array of numbers
 * @returns Array of factorial values
 */
export declare function factorial(data: number[]): number[];
/**
 * Calculate greatest common divisor for two numbers
 * Pine Script equivalent: math.gcd(a, b)
 *
 * @param a - First number
 * @param b - Second number
 * @returns Greatest common divisor
 */
export declare function gcd(a: number, b: number): number;
/**
 * Calculate least common multiple for two numbers
 * Pine Script equivalent: math.lcm(a, b)
 *
 * @param a - First number
 * @param b - Second number
 * @returns Least common multiple
 */
export declare function lcm(a: number, b: number): number;
//# sourceMappingURL=math-utils.d.ts.map