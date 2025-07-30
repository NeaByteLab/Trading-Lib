import { calculateStandardDeviation } from '@utils/calculation-utils'

/**
 * Calculate standard deviation of array values
 *
 * @param data - Array of numeric values
 * @returns Array with single standard deviation value
 */
export function standardDeviation(data: number[]): number[] {
  if (!data || data.length === 0) {
    return [NaN]
  }
  return [calculateStandardDeviation(data)]
}
