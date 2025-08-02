import { ERROR_MESSAGES } from '@constants/indicator-constants'
import { ArrayUtils } from '@core/utils/array-utils'

/**
 * Standard Pivot Points - support and resistance levels based on previous period
 * Formula: PP = (High + Low + Close) / 3, R1 = 2×PP - Low, S1 = 2×PP - High
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @returns Pivot point levels
 * @throws {Error} If data is empty or arrays have different lengths
 *
 * @example
 * ```typescript
 * const pivots = calculatePivotPoints(data.high, data.low, data.close)
 * // Returns: { pp: [...], r1: [...], r2: [...], r3: [...], s1: [...], s2: [...], s3: [...] }
 * ```
 */
export function calculatePivotPoints(high: number[], low: number[], close: number[]): {
  pp: number[]
  r1: number[]
  r2: number[]
  r3: number[]
  s1: number[]
  s2: number[]
  s3: number[]
} {
  if (!high || !low || !close || high.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (high.length !== low.length || high.length !== close.length) {
    throw new Error(ERROR_MESSAGES.ARRAY_LENGTH_MISMATCH)
  }
  const pp = ArrayUtils.processArray(high, (highVal, i) => {
    const lowVal = low[i]!
    const closeVal = close[i]!
    if (isNaN(highVal) || isNaN(lowVal) || isNaN(closeVal)) {
      return NaN
    }
    return (highVal + lowVal + closeVal) / 3
  })
  const r1 = ArrayUtils.processArray(pp, (pivot, i) => {
    if (isNaN(pivot)) {
      return NaN
    }
    return 2 * pivot - low[i]!
  })
  const s1 = ArrayUtils.processArray(pp, (pivot, i) => {
    if (isNaN(pivot)) {
      return NaN
    }
    return 2 * pivot - high[i]!
  })
  const r2 = ArrayUtils.processArray(pp, (pivot, i) => {
    if (isNaN(pivot)) {
      return NaN
    }
    return pivot + (high[i]! - low[i]!)
  })
  const s2 = ArrayUtils.processArray(pp, (pivot, i) => {
    if (isNaN(pivot)) {
      return NaN
    }
    return pivot - (high[i]! - low[i]!)
  })
  const r3 = ArrayUtils.processArray(pp, (pivot, i) => {
    if (isNaN(pivot)) {
      return NaN
    }
    return high[i]! + 2 * (pivot - low[i]!)
  })
  const s3 = ArrayUtils.processArray(pp, (pivot, i) => {
    if (isNaN(pivot)) {
      return NaN
    }
    return low[i]! - 2 * (high[i]! - pivot)
  })
  return { pp, r1, r2, r3, s1, s2, s3 }
}

/**
 * Camarilla Pivot Points - intraday support and resistance levels
 * Formula: PP = (High + Low + Close) / 3, R1 = Close + (High - Low) × 1.1/12
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @returns Camarilla pivot levels
 * @throws {Error} If data is empty or arrays have different lengths
 *
 * @example
 * ```typescript
 * const camarilla = calculateCamarillaPivots(data.high, data.low, data.close)
 * // Returns: { pp: [...], r1: [...], r2: [...], r3: [...], s1: [...], s2: [...], s3: [...] }
 * ```
 */
export function calculateCamarillaPivots(high: number[], low: number[], close: number[]): {
  pp: number[]
  r1: number[]
  r2: number[]
  r3: number[]
  s1: number[]
  s2: number[]
  s3: number[]
} {
  if (!high || !low || !close || high.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (high.length !== low.length || high.length !== close.length) {
    throw new Error(ERROR_MESSAGES.ARRAY_LENGTH_MISMATCH)
  }
  const results = ArrayUtils.processArray(close, (_, i) => {
    if (i === 0) {
      return { pp: NaN, r1: NaN, r2: NaN, r3: NaN, s1: NaN, s2: NaN, s3: NaN }
    }
    const prevHigh = high[i - 1]!
    const prevLow = low[i - 1]!
    const prevClose = close[i - 1]!
    const range = prevHigh - prevLow
    const pivot = (prevHigh + prevLow + prevClose) / 3
    const r1Val = prevClose + range * 1.1 / 12
    const r2Val = prevClose + range * 1.1 / 6
    const r3Val = prevClose + range * 1.1 / 4
    const s1Val = prevClose - range * 1.1 / 12
    const s2Val = prevClose - range * 1.1 / 6
    const s3Val = prevClose - range * 1.1 / 4
    return {
      pp: isFinite(pivot) ? pivot : NaN,
      r1: isFinite(r1Val) ? r1Val : NaN,
      r2: isFinite(r2Val) ? r2Val : NaN,
      r3: isFinite(r3Val) ? r3Val : NaN,
      s1: isFinite(s1Val) ? s1Val : NaN,
      s2: isFinite(s2Val) ? s2Val : NaN,
      s3: isFinite(s3Val) ? s3Val : NaN
    }
  })
  return {
    pp: results.map(r => r.pp),
    r1: results.map(r => r.r1),
    r2: results.map(r => r.r2),
    r3: results.map(r => r.r3),
    s1: results.map(r => r.s1),
    s2: results.map(r => r.s2),
    s3: results.map(r => r.s3)
  }
}

/**
 * Calculate Woodie pivot points using centralized utilities
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @returns Woodie pivot levels
 * @throws {Error} If data is empty or arrays have different lengths
 */
export function calculateWoodiePivots(high: number[], low: number[], close: number[]): {
  pp: number[]
  r1: number[]
  r2: number[]
  r3: number[]
  s1: number[]
  s2: number[]
  s3: number[]
} {
  if (!high || !low || !close || high.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (high.length !== low.length || high.length !== close.length) {
    throw new Error(ERROR_MESSAGES.ARRAY_LENGTH_MISMATCH)
  }
  const results = ArrayUtils.processArray(close, (_, i) => {
    if (i === 0) {
      return { pp: NaN, r1: NaN, r2: NaN, r3: NaN, s1: NaN, s2: NaN, s3: NaN }
    }
    const prevHigh = high[i - 1]!
    const prevLow = low[i - 1]!
    const prevClose = close[i - 1]!
    const range = prevHigh - prevLow
    const pivot = (prevHigh + prevLow + prevClose + prevClose) / 4
    const r1Val = 2 * pivot - prevLow
    const s1Val = 2 * pivot - prevHigh
    const r2Val = pivot + range
    const s2Val = pivot - range
    const r3Val = prevHigh + 2 * (pivot - prevLow)
    const s3Val = prevLow - 2 * (prevHigh - pivot)
    return {
      pp: isFinite(pivot) ? pivot : NaN,
      r1: isFinite(r1Val) ? r1Val : NaN,
      r2: isFinite(r2Val) ? r2Val : NaN,
      r3: isFinite(r3Val) ? r3Val : NaN,
      s1: isFinite(s1Val) ? s1Val : NaN,
      s2: isFinite(s2Val) ? s2Val : NaN,
      s3: isFinite(s3Val) ? s3Val : NaN
    }
  })
  return {
    pp: results.map(r => r.pp),
    r1: results.map(r => r.r1),
    r2: results.map(r => r.r2),
    r3: results.map(r => r.r3),
    s1: results.map(r => r.s1),
    s2: results.map(r => r.s2),
    s3: results.map(r => r.s3)
  }
}
