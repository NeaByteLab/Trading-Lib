/**
 * Mathematical utility functions
 *
 * Provides centralized mathematical operations following Pine Script conventions.
 * All indicators should use these utilities instead of manual implementations.
 */
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import { sanitizeArray } from '@core/utils/validation-utils'

const EMPTY_ARRAY_ERROR = 'Array cannot be empty'

/**
 * Kahan summation for numerical stability
 *
 * @param values - Array of values to sum
 * @returns Sum with numerical stability
 */
function kahanSum(values: number[]): number {
  let sum = 0
  let c = 0
  for (let i = 0; i < values.length; i++) {
    const y = values[i]! - c
    const t = sum + y
    c = (t - sum) - y
    sum = t
  }
  return sum
}

/**
 * Create rolling window with validation
 *
 * @param array - Input array
 * @param windowSize - Window size
 * @param operation - Operation to perform on window
 * @returns Array of results
 * @throws {Error} If windowSize is invalid
 */
function createRollingWindow(
  array: number[],
  windowSize: number,
  operation: (values: number[]) => number
): number[] {
  if (!array || array.length === 0) {
    throw new Error(EMPTY_ARRAY_ERROR)
  }
  if (windowSize <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_WINDOW_SIZE)
  }
  const result: number[] = []
  for (let i = 0; i < array.length; i++) {
    if (i < windowSize - 1) {
      result.push(NaN)
      continue
    }
    const window = array.slice(i - windowSize + 1, i + 1)
    const validValues = sanitizeArray(window)
    result.push(validValues.length > 0 ? operation(validValues) : NaN)
  }
  return result
}

export const MathUtils = {
  /**
   * Calculate absolute value
   *
   * @param value - Input value
   * @returns Absolute value
   */
  abs(value: number): number {
    return Math.abs(value)
  },

  /**
   * Find maximum value in array
   *
   * @param array - Input array
   * @returns Maximum value or NaN if array is empty
   */
  max(array: number[]): number {
    if (!array || array.length === 0) {
      return NaN
    }
    return Math.max(...array)
  },

  /**
   * Find minimum value in array
   *
   * @param array - Input array
   * @returns Minimum value or NaN if array is empty
   */
  min(array: number[]): number {
    if (!array || array.length === 0) {
      return NaN
    }
    return Math.min(...array)
  },

  /**
   * Calculate square root
   *
   * @param value - Input value
   * @returns Square root
   */
  sqrt(value: number): number {
    return Math.sqrt(value)
  },

  /**
   * Calculate power
   *
   * @param base - Base value
   * @param exponent - Exponent
   * @returns Power result
   */
  pow(base: number, exponent: number): number {
    return Math.pow(base, exponent)
  },

  /**
   * Calculate natural logarithm
   *
   * @param value - Input value
   * @returns Natural logarithm
   */
  log(value: number): number {
    return Math.log(value)
  },

  /**
   * Calculate base-10 logarithm
   *
   * @param value - Input value
   * @returns Base-10 logarithm
   */
  log10(value: number): number {
    return Math.log10(value)
  },

  /**
   * Calculate base-2 logarithm
   *
   * @param value - Input value
   * @returns Base-2 logarithm
   */
  log2(value: number): number {
    return Math.log2(value)
  },

  /**
   * Calculate sine
   *
   * @param value - Input value
   * @returns Sine value
   */
  sin(value: number): number {
    return Math.sin(value)
  },

  /**
   * Calculate cosine
   *
   * @param value - Input value
   * @returns Cosine value
   */
  cos(value: number): number {
    return Math.cos(value)
  },

  /**
   * Calculate tangent
   *
   * @param value - Input value
   * @returns Tangent value
   */
  tan(value: number): number {
    return Math.tan(value)
  },

  /**
   * Calculate arcsine
   *
   * @param value - Input value
   * @returns Arcsine value
   */
  asin(value: number): number {
    return Math.asin(value)
  },

  /**
   * Calculate arccosine
   *
   * @param value - Input value
   * @returns Arccosine value
   */
  acos(value: number): number {
    return Math.acos(value)
  },

  /**
   * Calculate arctangent
   *
   * @param value - Input value
   * @returns Arctangent value
   */
  atan(value: number): number {
    return Math.atan(value)
  },

  /**
   * Calculate floor
   *
   * @param value - Input value
   * @returns Floor value
   */
  floor(value: number): number {
    return Math.floor(value)
  },

  /**
   * Calculate ceiling
   *
   * @param value - Input value
   * @returns Ceiling value
   */
  ceil(value: number): number {
    return Math.ceil(value)
  },

  /**
   * Calculate sign
   *
   * @param value - Input value
   * @returns Sign value (-1, 0, 1)
   */
  sign(value: number): number {
    return Math.sign(value)
  },

  /**
   * Calculate exponential
   *
   * @param value - Input value
   * @returns Exponential value
   */
  exp(value: number): number {
    return Math.exp(value)
  },

  /**
   * Calculate modulo
   *
   * @param dividend - Dividend value
   * @param divisor - Divisor value
   * @returns Modulo result
   */
  mod(dividend: number, divisor: number): number {
    return dividend % divisor
  },

  /**
   * Calculate remainder
   *
   * @param dividend - Dividend value
   * @param divisor - Divisor value
   * @returns Remainder result
   */
  rem(dividend: number, divisor: number): number {
    return dividend - (Math.floor(dividend / divisor) * divisor)
  },

  /**
   * Calculate factorial
   *
   * @param n - Input value
   * @returns Factorial result
   */
  factorial(n: number): number {
    if (n < 0) {return NaN}
    if (n === 0 || n === 1) {return 1}
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  },

  /**
   * Calculate greatest common divisor
   *
   * @param a - First number
   * @param b - Second number
   * @returns GCD result
   */
  gcd(a: number, b: number): number {
    a = Math.abs(a)
    b = Math.abs(b)
    while (b !== 0) {
      const temp = b
      b = a % b
      a = temp
    }
    return a
  },

  /**
   * Calculate least common multiple
   *
   * @param a - First number
   * @param b - Second number
   * @returns LCM result
   */
  lcm(a: number, b: number): number {
    return Math.abs(a * b) / this.gcd(a, b)
  },

  /**
   * Calculate sum with numerical stability
   *
   * @param array - Input array
   * @returns Sum value
   */
  sum(array: number[]): number {
    if (!array || array.length === 0) {
      return 0
    }
    const validValues = sanitizeArray(array)
    if (validValues.length === 0) {
      return 0
    }
    return kahanSum(validValues)
  },

  /**
   * Calculate average with numerical stability
   *
   * @param array - Input array
   * @returns Average value
   */
  average(array: number[]): number {
    if (!array || array.length === 0) {
      return NaN
    }
    const validValues = sanitizeArray(array)
    if (validValues.length === 0) {
      return NaN
    }
    const sum = kahanSum(validValues)
    const result = sum / validValues.length
    return isFinite(result) ? result : NaN
  },

  /**
   * Calculate rolling minimum
   *
   * @param array - Input array
   * @param windowSize - Window size
   * @returns Array of rolling minimum values
   */
  rollingMin(array: number[], windowSize: number): number[] {
    return createRollingWindow(array, windowSize, (values) => this.min(values))
  },

  /**
   * Calculate rolling maximum
   *
   * @param array - Input array
   * @param windowSize - Window size
   * @returns Array of rolling maximum values
   */
  rollingMax(array: number[], windowSize: number): number[] {
    return createRollingWindow(array, windowSize, (values) => this.max(values))
  },

  /**
   * Calculate change between values
   *
   * @param current - Current value
   * @param previous - Previous value
   * @returns Change value
   */
  change(current: number, previous: number): number {
    return current - previous
  },

  /**
   * Calculate array of changes
   *
   * @param array - Input array
   * @returns Array of changes
   */
  changeArray(array: number[]): number[] {
    if (!array || array.length < 2) {
      return []
    }
    const changes: number[] = []
    for (let i = 1; i < array.length; i++) {
      changes.push(array[i]! - array[i - 1]!)
    }
    return changes
  },

  /**
   * Calculate absolute values of array
   *
   * @param array - Input array
   * @returns Array of absolute values
   */
  absArray(array: number[]): number[] {
    if (!array || array.length === 0) {
      return []
    }
    return array.map(val => Math.abs(val))
  },

  /**
   * Calculate highest values in rolling window
   *
   * @param array - Input array
   * @param windowSize - Window size
   * @returns Array of highest values
   */
  highest(array: number[], windowSize: number): number[] {
    return this.rollingMax(array, windowSize)
  },

  /**
   * Calculate lowest values in rolling window
   *
   * @param array - Input array
   * @param windowSize - Window size
   * @returns Array of lowest values
   */
  lowest(array: number[], windowSize: number): number[] {
    return this.rollingMin(array, windowSize)
  },

  /**
   * Clamp value between min and max
   *
   * @param value - Input value
   * @param min - Minimum value
   * @param max - Maximum value
   * @returns Clamped value
   */
  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
  },

  /**
   * Round value to specified decimals
   *
   * @param value - Input value
   * @param decimals - Number of decimal places
   * @returns Rounded value
   */
  round(value: number, decimals: number = 0): number {
    const factor = Math.pow(10, decimals)
    return Math.round(value * factor) / factor
  },

  /**
   * Calculate correlation coefficient
   *
   * @param x - First array
   * @param y - Second array
   * @returns Correlation coefficient
   */
  correlation(x: number[], y: number[]): number {
    if (x.length !== y.length || x.length === 0) {
      return NaN
    }
    const n = x.length
    const sumX = kahanSum(x)
    const sumY = kahanSum(y)
    const sumXY = kahanSum(x.map((xi, i) => xi * y[i]!))
    const sumX2 = kahanSum(x.map(xi => xi * xi))
    const sumY2 = kahanSum(y.map(yi => yi * yi))
    const numerator = n * sumXY - sumX * sumY
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))
    return denominator === 0 ? 0 : numerator / denominator
  },

  /**
   * Transpose matrix
   *
   * @param matrix - Input matrix
   * @returns Transposed matrix
   */
  transpose(matrix: number[][]): number[][] {
    if (!matrix || matrix.length === 0) {
      return []
    }
    const rows = matrix.length
    const cols = matrix[0]!.length
    const result: number[][] = []
    for (let j = 0; j < cols; j++) {
      result[j] = []
      for (let i = 0; i < rows; i++) {
        result[j]![i] = matrix[i]![j]!
      }
    }
    return result
  },

  /**
   * Multiply matrices
   *
   * @param a - First matrix
   * @param b - Second matrix
   * @returns Product matrix
   */
  multiply(a: number[][], b: number[][]): number[][] {
    if (!a || !b || a.length === 0 || b.length === 0 || a[0]!.length !== b.length) {
      return []
    }
    const rows = a.length
    const cols = b[0]!.length
    const result: number[][] = []
    for (let i = 0; i < rows; i++) {
      result[i] = []
      for (let j = 0; j < cols; j++) {
        let sum = 0
        for (let k = 0; k < b.length; k++) {
          sum += a[i]![k]! * b[k]![j]!
        }
        result[i]![j] = sum
      }
    }
    return result
  },

  /**
   * Create augmented matrix for Gaussian elimination
   *
   * @param A - Coefficient matrix
   * @param b - Constant vector
   * @returns Augmented matrix
   */
  createAugmentedMatrix(A: number[][], b: number[][]): number[][] {
    const n = A.length
    const augmented: number[][] = []
    for (let i = 0; i < n; i++) {
      augmented[i] = [...A[i]!, b[i]![0]!]
    }
    return augmented
  },

  /**
   * Perform Gaussian elimination with partial pivoting
   *
   * @param augmented - Augmented matrix
   * @param n - Matrix size
   */
  performGaussianElimination(augmented: number[][], n: number): void {
    for (let i = 0; i < n; i++) {
      let maxRow = i
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(augmented[k]![i]!) > Math.abs(augmented[maxRow]![i]!)) {
          maxRow = k
        }
      }
      [augmented[i], augmented[maxRow]] = [augmented[maxRow]!, augmented[i]!]
      for (let k = i + 1; k < n; k++) {
        const factor = augmented[k]![i]! / augmented[i]![i]!
        for (let j = i; j <= n; j++) {
          augmented[k]![j]! -= factor * augmented[i]![j]!
        }
      }
    }
  },

  /**
   * Perform back substitution to solve the system
   *
   * @param augmented - Augmented matrix in row echelon form
   * @param n - Matrix size
   * @returns Solution vector
   */
  backSubstitution(augmented: number[][], n: number): number[] {
    const x: number[] = new Array(n).fill(0)
    for (let i = n - 1; i >= 0; i--) {
      let sum = 0
      for (let j = i + 1; j < n; j++) {
        sum += augmented[i]![j]! * x[j]!
      }
      x[i] = (augmented[i]![n]! - sum) / augmented[i]![i]!
    }
    return x
  },

  /**
   * Solve linear system using Gaussian elimination
   *
   * @param A - Coefficient matrix
   * @param b - Constant vector
   * @returns Solution vector
   */
  solveLinearSystem(A: number[][], b: number[][]): number[][] {
    if (!A || !b || A.length === 0 || b.length === 0 || A.length !== b.length) {
      return []
    }
    const n = A.length
    const augmented = this.createAugmentedMatrix(A, b)
    this.performGaussianElimination(augmented, n)
    const x = this.backSubstitution(augmented, n)
    return x.map((val: number) => [val])
  }
}
