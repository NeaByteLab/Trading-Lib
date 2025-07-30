import { ERROR_MESSAGES } from '@constants/indicator-constants'
import { ArrayUtils } from '@core/utils/array-utils'
import { MathUtils } from '@core/utils/math-utils'
import { sanitizeArray } from '@core/utils/validation-utils'

/**
 * Calculate moving average using specified type
 *
 * @param data - Source data array
 * @param length - Moving average period
 * @param type - Moving average type (default: 'sma')
 * @returns Array of moving average values
 * @throws {Error} If data is empty or length is invalid
 */
export function movingAverage(data: number[], length: number, type: 'sma' | 'ema' | 'wma' | 'hull' | 'rma' = 'sma'): number[] {
  if (!data || data.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  if (!['sma', 'ema', 'wma', 'hull', 'rma'].includes(type)) {
    throw new Error(ERROR_MESSAGES.INVALID_MOVING_AVERAGE_TYPE)
  }
  switch (type) {
  case 'ema':
    return calculateEMA(data, length)
  case 'wma':
    return calculateWMA(data, length)
  case 'hull':
    return calculateHMA(data, length)
  case 'rma':
    return calculateRMA(data, length)
  default:
    return calculateSMA(data, length)
  }
}

/**
 * Calculate Simple Moving Average (SMA) with numerical stability
 *
 * Uses centralized window processing utilities.
 * Formula: SMA = Σ(Price) / n
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
  const smoothingFactor = 2 / (length + 1)
  const result: number[] = []
  const firstEMA = findFirstEMA(data, length)
  if (firstEMA === null) {
    return Array(data.length).fill(NaN)
  }
  for (let i = 0; i < firstEMA.index; i++) {
    result.push(NaN)
  }
  result.push(firstEMA.value)
  for (let i = firstEMA.index + 1; i < data.length; i++) {
    const previousEMA = result[i - 1]!
    const currentValue = data[i]!

    if (isNaN(previousEMA) || isNaN(currentValue) || !isFinite(previousEMA) || !isFinite(currentValue)) {
      result.push(NaN)
    } else {
      const currentEMA = (currentValue * smoothingFactor) + (previousEMA * (1 - smoothingFactor))
      result.push(isFinite(currentEMA) ? currentEMA : NaN)
    }
  }
  return result
}

/**
 * Find the first valid EMA value and its index with numerical stability
 *
 * @param data - Source data array
 * @param length - EMA period
 * @returns Object with index and value, or null if no valid EMA found
 */
function findFirstEMA(data: number[], length: number): { index: number; value: number } | null {
  if (data.length < length) {
    return null
  }
  const firstWindow = data.slice(0, length)
  const validValues = sanitizeArray(firstWindow)
  if (validValues.length === 0) {
    return null
  }
  const firstEMA = MathUtils.average(validValues)
  return isFinite(firstEMA) ? { index: length - 1, value: firstEMA } : null
}

/**
 * Calculate Weighted Moving Average (WMA) with numerical stability
 *
 * Uses centralized window processing utilities.
 * Formula: WMA = Σ(Price × Weight) / Σ(Weights)
 *
 * @param data - Source data array
 * @param length - WMA period
 * @returns Array of WMA values
 */
function calculateWMA(data: number[], length: number): number[] {
  const result = ArrayUtils.processWindow(data, length, (window) => {
    const validValues = sanitizeArray(window)
    if (validValues.length === 0) {
      return NaN
    }
    const weights = ArrayUtils.processArray(validValues, (_, i) => i + 1)
    const weightedSum = MathUtils.sum(validValues.map((val, i) => val * weights[i]!))
    const weightSum = MathUtils.sum(weights)
    const result = weightSum === 0 ? NaN : weightedSum / weightSum
    return isFinite(result) ? result : NaN
  })

  // Pad the result to match the input data length
  const padding = data.length - result.length
  if (padding > 0) {
    return Array(padding).fill(NaN).concat(result)
  }
  return result
}

/**
 * Calculate Hull Moving Average (HMA) with numerical stability
 *
 * Uses centralized calculation utilities.
 * Formula: HMA = WMA(2 × WMA(n/2) - WMA(n))
 *
 * @param data - Source data array
 * @param length - HMA period
 * @returns Array of HMA values
 */
function calculateHMA(data: number[], length: number): number[] {
  if (data.length < length) {
    return Array(data.length).fill(NaN)
  }

  const halfLength = MathUtils.floor(length / 2)
  const sqrtLength = Math.max(1, MathUtils.floor(MathUtils.sqrt(length)))

  // Calculate WMA(n/2) and WMA(n)
  const wma1 = calculateWMA(data, halfLength)
  const wma2 = calculateWMA(data, length)

  // Ensure both arrays have the same length as the input data
  const paddedWma1 = wma1.length === data.length ? wma1 : Array(data.length - wma1.length).fill(NaN).concat(wma1)
  const paddedWma2 = wma2.length === data.length ? wma2 : Array(data.length - wma2.length).fill(NaN).concat(wma2)

  // Calculate 2 * WMA(n/2) - WMA(n)
  const diff = []
  for (let i = 0; i < data.length; i++) {
    const wma1Val = paddedWma1[i]
    const wma2Val = paddedWma2[i]

    if (wma1Val !== undefined && wma2Val !== undefined &&
        !isNaN(wma1Val) && !isNaN(wma2Val) &&
        isFinite(wma1Val) && isFinite(wma2Val)) {
      const result = 2 * wma1Val - wma2Val
      diff.push(isFinite(result) ? result : NaN)
    } else {
      diff.push(NaN)
    }
  }

  // Calculate final WMA on the difference
  return calculateWMA(diff, sqrtLength)
}

/**
 * Calculate Relative Moving Average (RMA) with numerical stability
 *
 * Uses centralized calculation utilities.
 * Formula: RMA = (Previous RMA × (Length - 1) + Current Value) / Length
 *
 * @param data - Source data array
 * @param length - RMA period
 * @returns Array of RMA values
 */
function calculateRMA(data: number[], length: number): number[] {
  return wildersSmoothing(data, length)
}

/**
 * Wilder's Smoothing with numerical stability
 *
 * @param data - Source data array
 * @param length - Smoothing period
 * @returns Smoothed values array
 */
export function wildersSmoothing(data: number[], length: number): number[] {
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  if (data.length === 0) {
    return []
  }
  const result: number[] = []
  const alpha = 1 / length
  let firstValidIndex = -1
  let firstValidValue = 0
  for (let i = 0; i < data.length; i++) {
    if (!isNaN(data[i]!) && isFinite(data[i]!)) {
      firstValidIndex = i
      firstValidValue = data[i]!
      break
    }
  }
  if (firstValidIndex === -1) {
    return Array(data.length).fill(NaN)
  }
  for (let i = 0; i < firstValidIndex; i++) {
    result.push(NaN)
  }
  result.push(firstValidValue)
  for (let i = firstValidIndex + 1; i < data.length; i++) {
    const currentValue = data[i]!
    const previousSmoothed = result[i - 1]!
    if (isNaN(currentValue) || isNaN(previousSmoothed) || !isFinite(currentValue) || !isFinite(previousSmoothed)) {
      result.push(NaN)
    } else {
      const smoothedValue = (currentValue * alpha) + (previousSmoothed * (1 - alpha))
      result.push(isFinite(smoothedValue) ? smoothedValue : NaN)
    }
  }
  return result
}

/**
 * Apply exponential smoothing to data
 *
 * @param data - Source data array
 * @param alpha - Smoothing factor (0-1)
 * @returns Smoothed data array
 */
export function exponentialSmoothing(data: number[], alpha: number): number[] {
  if (alpha < 0 || alpha > 1) {
    throw new Error(ERROR_MESSAGES.INVALID_ALPHA)
  }
  return ArrayUtils.processArray(data, (val, i) => {
    if (i === 0) {
      return val
    } else {
      return (alpha * val) + ((1 - alpha) * (data[i - 1] ?? 0))
    }
  })
}

/**
 * Calculate vectorized moving average with improved cache locality
 * Optimized for SIMD operations and reduced memory access patterns
 *
 * @param data - Input data array
 * @param length - Window length
 * @param type - Moving average type
 * @returns Optimized moving average values
 */
export function calculateOptimizedMovingAverage(data: number[], length: number, type: 'sma' | 'ema' | 'wma'): number[] {
  if (data.length === 0 || length <= 0) {
    return []
  }
  if (type === 'sma') {
    return calculateOptimizedSMA(data, length)
  } else if (type === 'ema') {
    return calculateOptimizedEMA(data, length)
  } else {
    return calculateOptimizedWMA(data, length)
  }
}

/**
 * Optimized Simple Moving Average with vectorized operations
 * Uses block processing for better cache performance
 *
 * @param data - Input data array
 * @param length - Window length
 * @returns Optimized SMA values
 */
function calculateOptimizedSMA(data: number[], length: number): number[] {
  const result: number[] = []
  const blockSize = Math.min(length * 2, 64)

  for (let i = 0; i < data.length; i++) {
    if (i < length - 1) {
      result.push(NaN)
      continue
    }
    let sum = 0
    let count = 0
    const start = Math.max(0, i - length + 1)
    const end = i + 1
    for (let j = start; j < end; j += blockSize) {
      const blockEnd = Math.min(j + blockSize, end)
      for (let k = j; k < blockEnd; k++) {
        const val = data[k]
        if (val !== undefined && isFinite(val)) {
          sum += val
          count++
        }
      }
    }
    result.push(count > 0 ? sum / count : NaN)
  }
  return result
}

/**
 * Optimized Exponential Moving Average with improved numerical stability
 * Uses Kahan summation for better precision
 *
 * @param data - Input data array
 * @param length - Smoothing period
 * @returns Optimized EMA values
 */
function calculateOptimizedEMA(data: number[], length: number): number[] {
  if (data.length === 0) {
    return []
  }
  const alpha = 2 / (length + 1)
  const result: number[] = []
  let ema = data[0] || 0
  let compensation = 0

  for (let i = 0; i < data.length; i++) {
    const val = data[i]
    if (i === 0 || !isFinite(val ?? 0)) {
      result.push(isFinite(val ?? 0) ? val ?? 0 : NaN)
      ema = val ?? 0
      compensation = 0
    } else {
      const term = alpha * (val ?? 0) + (1 - alpha) * ema
      const newEma = term + compensation
      compensation = (term - newEma) + compensation
      ema = newEma
      result.push(isFinite(ema) ? ema : NaN)
    }
  }
  return result
}

/**
 * Optimized Weighted Moving Average with vectorized weight calculation
 * Uses pre-computed weights for better performance
 *
 * @param data - Input data array
 * @param length - Window length
 * @returns Optimized WMA values
 */
function calculateOptimizedWMA(data: number[], length: number): number[] {
  if (data.length === 0 || length <= 0) {
    return []
  }
  const weights = new Array(length)
  const weightSum = (length * (length + 1)) / 2
  for (let i = 0; i < length; i++) {
    weights[i] = (i + 1) / weightSum
  }
  const result: number[] = []
  for (let i = 0; i < data.length; i++) {
    if (i < length - 1) {
      result.push(NaN)
      continue
    }
    let weightedSum = 0
    let validCount = 0
    for (let j = 0; j < length; j++) {
      const val = data[i - j]
      if (val !== undefined && isFinite(val)) {
        weightedSum += val * weights[j]
        validCount++
      }
    }
    result.push(validCount > 0 ? weightedSum : NaN)
  }
  return result
}

/**
 * Calculate Kaufman Adaptive Moving Average (KAMA)
 *
 * KAMA adapts to market conditions by adjusting its smoothing factor.
 * It's more responsive in trending markets and smoother in sideways markets.
 *
 * Formula: KAMA = KAMA(prev) + SC * (Price - KAMA(prev))
 * SC = (ER * (Fast - Slow) + Slow)^2
 * ER = |Price - Price(n)| / Sum(|Price - Price(i)|)
 *
 * @param data - Source data array
 * @param length - KAMA period
 * @param fastPeriod - Fast EMA period (default: 2)
 * @param slowPeriod - Slow EMA period (default: 30)
 * @returns KAMA values array
 * @throws {Error} If data is empty or length is invalid
 */
export function calculateKAMA(data: number[], length: number, fastPeriod: number = 2, slowPeriod: number = 30): number[] {
  if (!data || data.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  if (fastPeriod <= 0) {
    throw new Error('Fast period must be positive')
  }
  if (slowPeriod <= 0 || slowPeriod <= fastPeriod) {
    throw new Error('Slow period must be positive and greater than fast period')
  }
  const result: number[] = []
  result.push(data[0]!)
  for (let i = 1; i < data.length; i++) {
    const er = calculateEfficiencyRatio(data, i, length)
    const fastSC = 2 / (fastPeriod + 1)
    const slowSC = 2 / (slowPeriod + 1)
    const sc = MathUtils.pow(er * (fastSC - slowSC) + slowSC, 2)
    const currentKAMA = result[i - 1]! + sc * (data[i]! - result[i - 1]!)
    result.push(isFinite(currentKAMA) ? currentKAMA : result[i - 1]!)
  }
  return result
}

/**
 * Calculate Efficiency Ratio (ER) for KAMA
 *
 * ER measures the directional movement relative to the total movement.
 * Higher values indicate trending markets, lower values indicate sideways markets.
 *
 * @param data - Source data array
 * @param index - Current price index
 * @param length - Lookback period
 * @returns Efficiency ratio value (0-1)
 */
function calculateEfficiencyRatio(data: number[], index: number, length: number): number {
  if (index < length) {
    return 0
  }
  const directionalMovement = MathUtils.abs(data[index]! - data[index - length]!)
  let totalMovement = 0
  // Fix: Use length-1 for total movement calculation (correct algorithm)
  for (let i = 0; i < length - 1; i++) {
    totalMovement += MathUtils.abs(data[index - i]! - data[index - i - 1]!)
  }
  if (totalMovement === 0) {
    return 0
  }
  return directionalMovement / totalMovement
}

/**
 * Calculate CMO (Chande Momentum Oscillator) for VIDYA
 *
 * @param changes - Price changes array
 * @param currentIndex - Current index
 * @param cmoLength - CMO calculation period
 * @returns CMO value
 */
function calculateCMOForVIDYA(changes: number[], currentIndex: number, cmoLength: number): number {
  let gains = 0
  let losses = 0
  let validCount = 0
  for (let j = Math.max(0, currentIndex - cmoLength + 1); j <= currentIndex; j++) {
    const change = changes[j]
    if (change !== undefined && !isNaN(change) && isFinite(change)) {
      if (change > 0) {
        gains += change
      } else {
        losses += MathUtils.abs(change)
      }
      validCount++
    }
  }
  if (validCount === 0) {
    return 0
  }
  const total = gains + losses
  return total === 0 ? 0 : (gains - losses) / total
}

/**
 * Calculate VIDYA value for a single point
 *
 * @param currentValue - Current price value
 * @param previousVIDYA - Previous VIDYA value
 * @param length - VIDYA period
 * @param cmo - CMO value
 * @returns VIDYA value
 */
function calculateVIDYAValue(currentValue: number, previousVIDYA: number, length: number, cmo: number): number {
  const baseAlpha = 2 / (length + 1)
  const dynamicAlpha = baseAlpha * (1 + MathUtils.abs(cmo))
  const clampedAlpha = MathUtils.clamp(dynamicAlpha, 0.01, 0.99)
  const vidya = (currentValue * clampedAlpha) + (previousVIDYA * (1 - clampedAlpha))
  return isFinite(vidya) ? vidya : NaN
}

/**
 * Calculate Variable Index Dynamic Average (VIDYA)
 *
 * VIDYA = Price × α + Previous VIDYA × (1 - α)
 * where α = 2 / (Length + 1) × (1 + CMO)
 * CMO = (Sum of gains - Sum of losses) / (Sum of gains + Sum of losses)
 *
 * @param data - Source data array
 * @param length - VIDYA period (default: 14)
 * @param cmoLength - CMO calculation period (default: 9)
 * @returns VIDYA values array
 * @throws {Error} If data is empty or length is invalid
 */
export function calculateVIDYA(data: number[], length: number = 14, cmoLength: number = 9): number[] {
  if (!data || data.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (length <= 0 || cmoLength <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  const changes = ArrayUtils.processArray(data, (current, i) => {
    if (i === 0) {
      return NaN
    }
    const previous = data[i - 1]!
    if (isNaN(current) || isNaN(previous) || !isFinite(current) || !isFinite(previous)) {
      return NaN
    }
    return current - previous
  })
  const result: number[] = []
  const firstEMA = findFirstEMA(data, length)
  if (firstEMA === null) {
    return Array(data.length).fill(NaN)
  }
  for (let i = 0; i < firstEMA.index; i++) {
    result.push(NaN)
  }
  result.push(firstEMA.value)
  for (let i = firstEMA.index + 1; i < data.length; i++) {
    const previousVIDYA = result[i - 1]!
    const currentValue = data[i]!
    if (isNaN(previousVIDYA) || isNaN(currentValue) || !isFinite(previousVIDYA) || !isFinite(currentValue)) {
      result.push(NaN)
      continue
    }
    const cmo = calculateCMOForVIDYA(changes, i, cmoLength)
    const vidya = calculateVIDYAValue(currentValue, previousVIDYA, length, cmo)
    result.push(vidya)
  }
  return result
}
