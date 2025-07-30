import { ArrayUtils } from '@utils/array-utils'
import { MathUtils } from '@utils/math-utils'
import { sanitizeArray } from '@utils/validation-utils'

/**
 * Calculate moving average using specified type
 *
 * @param data - Source data array
 * @param length - Moving average period
 * @param type - Moving average type (default: 'sma')
 * @returns Array of moving average values
 * @throws {Error} If data is empty or length is invalid
 */
export function movingAverage(data: number[], length: number, type: 'sma' | 'ema' | 'wma' | 'hull' = 'sma'): number[] {
  if (!data || data.length === 0) {
    throw new Error('Data array cannot be empty')
  }
  if (length <= 0) {
    throw new Error('Length must be positive')
  }
  if (!['sma', 'ema', 'wma', 'hull'].includes(type)) {
    throw new Error('Invalid moving average type')
  }

  switch (type) {
  case 'ema':
    return calculateEMA(data, length)
  case 'wma':
    return calculateWMA(data, length)
  case 'hull':
    return calculateHMA(data, length)
  default:
    return calculateSMA(data, length)
  }
}

/**
 * Calculate Simple Moving Average (SMA)
 *
 * Uses centralized window processing utilities.
 * Formula: SMA = Σ(Price) / Length
 *
 * @param data - Source data array
 * @param length - SMA period
 * @returns Array of SMA values
 */
function calculateSMA(data: number[], length: number): number[] {
  return ArrayUtils.processWindow(data, length, (window) => {
    const validValues = sanitizeArray(window)
    if (validValues.length === 0) {
      return NaN
    }
    return MathUtils.average(validValues)
  })
}

/**
 * Calculate Exponential Moving Average (EMA)
 *
 * Uses centralized calculation utilities.
 * Formula: EMA = Price × α + Previous EMA × (1 - α) where α = 2/(Length + 1)
 *
 * @param data - Source data array
 * @param length - EMA period
 * @returns Array of EMA values
 */
function calculateEMA(data: number[], length: number): number[] {
  const alpha = 2 / (length + 1)
  const result: number[] = []

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      // First value should be the first data point
      result.push(data[i]!)
    } else if (i < length - 1) {
      // Use simple average for initial values
      const smaValues = data.slice(0, i + 1)
      const validValues = smaValues.filter(val => !isNaN(val))
      if (validValues.length === 0) {
        result.push(NaN)
        continue
      }
      const sma = MathUtils.average(validValues)
      result.push(sma)
    } else {
      const ema = (data[i]! * alpha) + (result[i - 1]! * (1 - alpha))
      result.push(ema)
    }
  }

  return result
}

/**
 * Calculate Weighted Moving Average (WMA)
 *
 * Uses centralized window processing utilities.
 * Formula: WMA = Σ(Price × Weight) / Σ(Weights)
 *
 * @param data - Source data array
 * @param length - WMA period
 * @returns Array of WMA values
 */
function calculateWMA(data: number[], length: number): number[] {
  return ArrayUtils.processWindow(data, length, (window) => {
    const validValues = sanitizeArray(window)
    if (validValues.length === 0) {
      return NaN
    }
    const weights = ArrayUtils.processArray(validValues, (_, i) => i + 1)
    const weightedValues = ArrayUtils.processArray(validValues, (val, i) => val * weights[i]!)
    const weightedSum = MathUtils.sum(weightedValues)
    const weightSum = MathUtils.sum(weights)
    return weightedSum / weightSum
  })
}

/**
 * Calculate Hull Moving Average (HMA)
 *
 * Uses centralized calculation utilities.
 * Formula: HMA = WMA(2 × WMA(n/2) - WMA(n))
 *
 * @param data - Source data array
 * @param length - HMA period
 * @returns Array of HMA values
 */
function calculateHMA(data: number[], length: number): number[] {
  const halfLength = MathUtils.floor(length / 2)
  const sqrtLength = MathUtils.floor(MathUtils.sqrt(length))
  const wma1 = calculateWMA(data, halfLength)
  const wma2 = calculateWMA(data, length)
  const diff = ArrayUtils.processArray(wma1, (val, i) => 2 * val - wma2[i]!)
  return calculateWMA(diff, sqrtLength)
}
