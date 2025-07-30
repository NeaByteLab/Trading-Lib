export declare const MathUtils: {
    /**
     * Calculate absolute value
     *
     * @param value - Input value
     * @returns Absolute value
     */
    abs(value: number): number;
    /**
     * Find maximum value in array
     *
     * @param array - Input array
     * @returns Maximum value or NaN if array is empty
     */
    max(array: number[]): number;
    /**
     * Find minimum value in array
     *
     * @param array - Input array
     * @returns Minimum value or NaN if array is empty
     */
    min(array: number[]): number;
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
     * @param value - Input value
     * @returns Sine value
     */
    sin(value: number): number;
    /**
     * Calculate cosine
     *
     * @param value - Input value
     * @returns Cosine value
     */
    cos(value: number): number;
    /**
     * Calculate tangent
     *
     * @param value - Input value
     * @returns Tangent value
     */
    tan(value: number): number;
    /**
     * Calculate arcsine
     *
     * @param value - Input value
     * @returns Arcsine value
     */
    asin(value: number): number;
    /**
     * Calculate arccosine
     *
     * @param value - Input value
     * @returns Arccosine value
     */
    acos(value: number): number;
    /**
     * Calculate arctangent
     *
     * @param value - Input value
     * @returns Arctangent value
     */
    atan(value: number): number;
    /**
     * Calculate floor
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
     * @param dividend - Dividend value
     * @param divisor - Divisor value
     * @returns Modulo result
     */
    mod(dividend: number, divisor: number): number;
    /**
     * Calculate remainder
     *
     * @param dividend - Dividend value
     * @param divisor - Divisor value
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
     * Calculate sum with numerical stability
     *
     * @param array - Input array
     * @returns Sum value
     */
    sum(array: number[]): number;
    /**
     * Calculate average with numerical stability
     *
     * @param array - Input array
     * @returns Average value
     */
    average(array: number[]): number;
    /**
     * Calculate rolling minimum
     *
     * @param array - Input array
     * @param windowSize - Window size
     * @returns Array of rolling minimum values
     */
    rollingMin(array: number[], windowSize: number): number[];
    /**
     * Calculate rolling maximum
     *
     * @param array - Input array
     * @param windowSize - Window size
     * @returns Array of rolling maximum values
     */
    rollingMax(array: number[], windowSize: number): number[];
    /**
     * Calculate change between values
     *
     * @param current - Current value
     * @param previous - Previous value
     * @returns Change value
     */
    change(current: number, previous: number): number;
    /**
     * Calculate array of changes
     *
     * @param array - Input array
     * @returns Array of changes
     */
    changeArray(array: number[]): number[];
    /**
     * Calculate absolute values of array
     *
     * @param array - Input array
     * @returns Array of absolute values
     */
    absArray(array: number[]): number[];
    /**
     * Calculate highest values in rolling window
     *
     * @param array - Input array
     * @param windowSize - Window size
     * @returns Array of highest values
     */
    highest(array: number[], windowSize: number): number[];
    /**
     * Calculate lowest values in rolling window
     *
     * @param array - Input array
     * @param windowSize - Window size
     * @returns Array of lowest values
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
     * @param decimals - Number of decimal places
     * @returns Rounded value
     */
    round(value: number, decimals?: number): number;
    /**
     * Calculate correlation coefficient
     *
     * @param x - First array
     * @param y - Second array
     * @returns Correlation coefficient
     */
    correlation(x: number[], y: number[]): number;
    /**
     * Transpose matrix
     *
     * @param matrix - Input matrix
     * @returns Transposed matrix
     */
    transpose(matrix: number[][]): number[][];
    /**
     * Multiply matrices
     *
     * @param a - First matrix
     * @param b - Second matrix
     * @returns Product matrix
     */
    multiply(a: number[][], b: number[][]): number[][];
    /**
     * Create augmented matrix for Gaussian elimination
     *
     * @param A - Coefficient matrix
     * @param b - Constant vector
     * @returns Augmented matrix
     */
    createAugmentedMatrix(A: number[][], b: number[][]): number[][];
    /**
     * Perform Gaussian elimination with partial pivoting
     *
     * @param augmented - Augmented matrix
     * @param n - Matrix size
     */
    performGaussianElimination(augmented: number[][], n: number): void;
    /**
     * Perform back substitution to solve the system
     *
     * @param augmented - Augmented matrix in row echelon form
     * @param n - Matrix size
     * @returns Solution vector
     */
    backSubstitution(augmented: number[][], n: number): number[];
    /**
     * Solve linear system using Gaussian elimination
     *
     * @param A - Coefficient matrix
     * @param b - Constant vector
     * @returns Solution vector
     */
    solveLinearSystem(A: number[][], b: number[][]): number[][];
};
//# sourceMappingURL=math-utils.d.ts.map