export declare const MathUtils: {
    /**
     * Calculate absolute value
     *
     * @param value - Input value
     * @returns Absolute value
     */
    abs(value: number): number;
    /**
     * Find minimum value in array
     *
     * @param array - Input array
     * @returns Minimum value
     * @throws {Error} If array is empty
     */
    min(array: number[]): number;
    /**
     * Find maximum value in array
     *
     * @param array - Input array
     * @returns Maximum value
     * @throws {Error} If array is empty
     */
    max(array: number[]): number;
    /**
     * Calculate square root
     *
     * @param value - Input value
     * @returns Square root
     */
    sqrt(value: number): number;
    /**
     * Calculate power
     *
     * @param base - Base value
     * @param exponent - Exponent
     * @returns Power result
     */
    pow(base: number, exponent: number): number;
    /**
     * Calculate natural logarithm
     *
     * @param value - Input value
     * @returns Natural logarithm
     */
    log(value: number): number;
    /**
     * Calculate base-10 logarithm
     *
     * @param value - Input value
     * @returns Base-10 logarithm
     */
    log10(value: number): number;
    /**
     * Calculate base-2 logarithm
     *
     * @param value - Input value
     * @returns Base-2 logarithm
     */
    log2(value: number): number;
    /**
     * Calculate sine
     *
     * @param value - Input value in radians
     * @returns Sine value
     */
    sin(value: number): number;
    /**
     * Calculate cosine
     *
     * @param value - Input value in radians
     * @returns Cosine value
     */
    cos(value: number): number;
    /**
     * Calculate tangent
     *
     * @param value - Input value in radians
     * @returns Tangent value
     */
    tan(value: number): number;
    /**
     * Calculate arcsine
     *
     * @param value - Input value
     * @returns Arcsine value in radians
     */
    asin(value: number): number;
    /**
     * Calculate arccosine
     *
     * @param value - Input value
     * @returns Arccosine value in radians
     */
    acos(value: number): number;
    /**
     * Calculate arctangent
     *
     * @param value - Input value
     * @returns Arctangent value in radians
     */
    atan(value: number): number;
    /**
     * Calculate floor value
     *
     * @param value - Input value
     * @returns Floor value
     */
    floor(value: number): number;
    /**
     * Calculate ceiling
     *
     * @param value - Input value
     * @returns Ceiling value
     */
    ceil(value: number): number;
    /**
     * Calculate sign
     *
     * @param value - Input value
     * @returns Sign value (-1, 0, 1)
     */
    sign(value: number): number;
    /**
     * Calculate exponential
     *
     * @param value - Input value
     * @returns Exponential value
     */
    exp(value: number): number;
    /**
     * Calculate modulo
     *
     * @param dividend - Dividend
     * @param divisor - Divisor
     * @returns Modulo result
     */
    mod(dividend: number, divisor: number): number;
    /**
     * Calculate remainder
     *
     * @param dividend - Dividend
     * @param divisor - Divisor
     * @returns Remainder result
     */
    rem(dividend: number, divisor: number): number;
    /**
     * Calculate factorial
     *
     * @param n - Input value
     * @returns Factorial result
     */
    factorial(n: number): number;
    /**
     * Calculate greatest common divisor
     *
     * @param a - First number
     * @param b - Second number
     * @returns GCD result
     */
    gcd(a: number, b: number): number;
    /**
     * Calculate least common multiple
     *
     * @param a - First number
     * @param b - Second number
     * @returns LCM result
     */
    lcm(a: number, b: number): number;
    /**
     * Calculate sum of array
     *
     * @param array - Input array
     * @returns Sum result
     * @throws {Error} If array is empty
     */
    sum(array: number[]): number;
    /**
     * Calculate average of array
     *
     * @param array - Input array
     * @returns Average result
     * @throws {Error} If array is empty
     */
    average(array: number[]): number;
    /**
     * Find minimum value in window
     *
     * @param array - Input array
     * @param windowSize - Window size
     * @returns Array of minimum values
     * @throws {Error} If windowSize is invalid
     */
    rollingMin(array: number[], windowSize: number): number[];
    /**
     * Find maximum value in window
     *
     * @param array - Input array
     * @param windowSize - Window size
     * @returns Array of maximum values
     * @throws {Error} If windowSize is invalid
     */
    rollingMax(array: number[], windowSize: number): number[];
    /**
     * Calculate change between two values
     *
     * @param current - Current value
     * @param previous - Previous value
     * @returns Change value
     */
    change(current: number, previous: number): number;
    /**
     * Calculate changes for array
     *
     * @param array - Input array
     * @returns Array of changes
     */
    changeArray(array: number[]): number[];
    /**
     * Calculate absolute values for array
     *
     * @param array - Input array
     * @returns Array of absolute values
     */
    absArray(array: number[]): number[];
    /**
     * Calculate highest value in window
     *
     * @param array - Input array
     * @param windowSize - Window size
     * @returns Array with highest values
     * @throws {Error} If windowSize is invalid
     */
    highest(array: number[], windowSize: number): number[];
    /**
     * Calculate lowest value in window
     *
     * @param array - Input array
     * @param windowSize - Window size
     * @returns Array with lowest values
     * @throws {Error} If windowSize is invalid
     */
    lowest(array: number[], windowSize: number): number[];
    /**
     * Clamp value between min and max
     *
     * @param value - Input value
     * @param min - Minimum value
     * @param max - Maximum value
     * @returns Clamped value
     */
    clamp(value: number, min: number, max: number): number;
    /**
     * Round value to specified decimals
     *
     * @param value - Input value
     * @param decimals - Number of decimal places (default: 0)
     * @returns Rounded value
     */
    round(value: number, decimals?: number): number;
};
//# sourceMappingURL=math-utils.d.ts.map