import { ERROR_MESSAGES } from '@constants/indicator-constants'
import { MathUtils } from '@utils/math-utils'
import { sanitizeArray } from '@utils/validation-utils'

/**
 * Calculate Relative Moving Average (RMA)
 *
 * RMA is Pine Script's default smoothing method and is equivalent to Wilder's smoothing.
 * Formula: RMA = (prevRMA * (length - 1) + currentValue) / length
 *
 * @param data - Source data array
 * @param length - RMA period
 * @returns Array of RMA values
 * @throws {Error} If data is empty or length is invalid
 *
 * @example
 * ```typescript
 * const data = [100, 102, 104, 103, 105, 107, 106, 108, 110, 112]
 * const rma = calculateRMA(data, 5)
 * console.log(rma) // RMA values
 * ```
 */
export function calculateRMA(data: number[], length: number): number[] {
  if (!data || data.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  if (length > data.length) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  const result: number[] = []
  const initialWindow = data.slice(0, length)
  const validInitialValues = sanitizeArray(initialWindow)
  if (validInitialValues.length === 0) {
    return Array(data.length).fill(NaN)
  }
  const initialRMA = MathUtils.average(validInitialValues)
  result.push(initialRMA)
  for (let i = length; i < data.length; i++) {
    const currentValue = data[i]!
    if (isNaN(currentValue)) {
      result.push(NaN)
    } else {
      const prevRMA = result[i - length]!
      if (isNaN(prevRMA)) {
        result.push(NaN)
      } else {
        const currentRMA = (prevRMA * (length - 1) + currentValue) / length
        result.push(currentRMA)
      }
    }
  }
  return result
}
