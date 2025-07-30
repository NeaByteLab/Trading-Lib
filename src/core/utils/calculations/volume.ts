import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@core/utils/array-utils'
import { calculateHLC3, PriceCalculations } from '@core/utils/calculations/price-calculations'
import { MathUtils } from '@core/utils/math-utils'



/**
 * Calculate On Balance Volume (OBV) using centralized utilities
 *
 * @param close - Close prices array
 * @param volume - Volume array
 * @returns OBV values array
 * @throws {Error} If data is empty or missing volume
 */
export function calculateOBV(close: number[], volume: number[]): number[] {
  if (!close || close.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (!volume || volume.length === 0) {
    throw new Error(ERROR_MESSAGES.MISSING_VOLUME)
  }
  if (close.length !== volume.length) {
    throw new Error(ERROR_MESSAGES.CLOSE_VOLUME_LENGTH_MISMATCH)
  }
  let obv = 0
  return ArrayUtils.processArray(close, (currentClose, i) => {
    if (i === 0) {
      obv = volume[i]!
      return obv
    }
    const previousClose = close[i - 1]!
    const currentVolume = volume[i]!
    if (isNaN(currentClose) || isNaN(previousClose) || isNaN(currentVolume)) {
      return NaN
    }
    if (currentClose > previousClose) {
      obv += currentVolume
    } else if (currentClose < previousClose) {
      obv -= currentVolume
    }
    return obv
  })
}

/**
 * Calculate Accumulation Distribution using centralized utilities
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @param volume - Volume array
 * @returns Accumulation Distribution values array
 * @throws {Error} If data is empty or missing required fields
 */
export function calculateAccumulationDistribution(high: number[], low: number[], close: number[], volume: number[]): number[] {
  if (!close || close.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (!volume || volume.length === 0) {
    throw new Error(ERROR_MESSAGES.MISSING_VOLUME)
  }
  if (high.length !== close.length || low.length !== close.length || volume.length !== close.length) {
    throw new Error(ERROR_MESSAGES.OHLC_VOLUME_LENGTH_MISMATCH)
  }
  let previousAD = 0
  return ArrayUtils.processArray(close, (currentClose, i) => {
    const currentHigh = high[i]!
    const currentLow = low[i]!
    const currentVolume = volume[i]!
    const range = currentHigh - currentLow
    if (range === 0) {
      return previousAD
    }
    const moneyFlowMultiplier = ((currentClose - currentLow) - (currentHigh - currentClose)) / range
    const moneyFlowVolume = moneyFlowMultiplier * currentVolume
    previousAD += moneyFlowVolume
    return previousAD
  })
}

/**
 * Calculate VWAP (Volume Weighted Average Price) using centralized logic
 *
 * @param data - Market data with OHLCV
 * @param length - Calculation period
 * @returns VWAP values array
 */
export function calculateVWAP(data: MarketData, length: number): number[] {
  const typicalPrices = PriceCalculations.typical(data)
  return ArrayUtils.processWindow(typicalPrices, length, (window, i) => {
    const startIndex = i - length + 1
    const validData = ArrayUtils.processArray(window, (price, j) => {
      const originalIndex = startIndex + j
      const volume = data.volume?.[originalIndex]
      if (!isNaN(price) && volume && volume > 0) {
        return { price, volume }
      }
      return null
    }).filter(item => item !== null) as { price: number; volume: number }[]
    if (validData.length === 0) {
      return NaN
    }
    const tpvValues = validData.map(item => {
      const product = item.price * item.volume
      return isFinite(product) ? product : 0
    })
    const volumes = validData.map(item => item.volume)
    const cumulativeTPV = MathUtils.sum(tpvValues)
    const cumulativeVolume = MathUtils.sum(volumes)
    return cumulativeVolume === 0 ? NaN : cumulativeTPV / cumulativeVolume
  })
}

/**
 * Calculate Price Volume Trend (PVT)
 *
 * PVT measures cumulative volume-weighted price change.
 * Formula: PVT = Previous PVT + ((Current Close - Previous Close) / Previous Close) * Current Volume
 *
 * @param close - Close prices array
 * @param volume - Volume array
 * @returns PVT values array
 * @throws {Error} If data is empty or missing required fields
 */
export function calculatePriceVolumeTrend(close: number[], volume: number[]): number[] {
  if (!close || close.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (!volume || volume.length === 0) {
    throw new Error(ERROR_MESSAGES.MISSING_VOLUME)
  }
  if (close.length !== volume.length) {
    throw new Error(ERROR_MESSAGES.CLOSE_VOLUME_LENGTH_MISMATCH)
  }
  const pvt: number[] = []
  ArrayUtils.processArray(close, (currentClose, i) => {
    if (i === 0) {
      pvt.push(0)
      return
    }
    const prevClose = close[i - 1]!
    const currentVolume = volume[i]!
    if (prevClose === 0) {
      pvt.push(pvt[i - 1]! || 0)
      return
    }
    const priceChange = ((currentClose - prevClose) / prevClose) * 100
    const volumeWeightedChange = priceChange * currentVolume
    pvt.push(pvt[i - 1]! + volumeWeightedChange)
  })
  return pvt
}

/**
 * Calculate Positive Volume Index (PVI)
 *
 * PVI measures price changes only on days when volume increases.
 * Formula: PVI = Previous PVI * (1 + Percent Change / 100) if Volume > Previous Volume
 *
 * @param close - Close prices array
 * @param volume - Volume array
 * @returns PVI values array
 * @throws {Error} If data is empty or missing required fields
 */
export function calculatePositiveVolumeIndex(close: number[], volume: number[]): number[] {
  if (!close || close.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (!volume || volume.length === 0) {
    throw new Error(ERROR_MESSAGES.MISSING_VOLUME)
  }
  if (close.length !== volume.length) {
    throw new Error(ERROR_MESSAGES.CLOSE_VOLUME_LENGTH_MISMATCH)
  }
  const pvi: number[] = []
  for (let i = 0; i < close.length; i++) {
    if (i === 0) {
      pvi.push(1000)
    } else {
      const prevClose = close[i - 1]!
      const currentVolume = volume[i]!
      const prevVolume = volume[i - 1]!
      if (currentVolume > prevVolume) {
        const percentChange = ((close[i]! - prevClose) / prevClose) * 100
        pvi.push(pvi[i - 1]! * (1 + percentChange / 100))
      } else {
        pvi.push(pvi[i - 1]!)
      }
    }
  }
  return pvi
}

/**
 * Calculate Twiggs Money Flow
 *
 * Twiggs Money Flow is a volume-weighted momentum indicator.
 * Formula: TMF = (HLC3 - L) / (H - L) * V where HLC3 = (H + L + C) / 3
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @param volume - Volume array
 * @returns Twiggs Money Flow values array
 * @throws {Error} If data is empty or missing required fields
 */
export function calculateTwiggsMoneyFlow(high: number[], low: number[], close: number[], volume: number[]): number[] {
  if (!close || close.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (!volume || volume.length === 0) {
    throw new Error(ERROR_MESSAGES.MISSING_VOLUME)
  }
  if (high.length !== close.length || low.length !== close.length || volume.length !== close.length) {
    throw new Error(ERROR_MESSAGES.OHLC_VOLUME_LENGTH_MISMATCH)
  }
  return ArrayUtils.processArray(close, (currentClose, i) => {
    const currentHigh = high[i]!
    const currentLow = low[i]!
    const currentVolume = volume[i]!
    const hlc3 = calculateHLC3(currentHigh, currentLow, currentClose)
    const range = currentHigh - currentLow
    if (range === 0) {
      return 0
    }
    const result = ((hlc3 - currentLow) / range) * currentVolume
    return isFinite(result) ? result : 0
  })
}

/**
 * Calculate Amihud Illiquidity Measure
 *
 * Amihud = |Return| / Volume
 * Return = (Close - Previous Close) / Previous Close
 *
 * @param close - Close prices array
 * @param volume - Volume array
 * @returns Amihud Illiquidity values array
 * @throws {Error} If data is empty or missing required fields
 */
export function calculateAmihudIlliquidity(close: number[], volume: number[]): number[] {
  if (!close || close.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (!volume || volume.length === 0) {
    throw new Error(ERROR_MESSAGES.MISSING_VOLUME)
  }
  if (close.length !== volume.length) {
    throw new Error(ERROR_MESSAGES.CLOSE_VOLUME_LENGTH_MISMATCH)
  }
  return ArrayUtils.processArray(close, (currentClose, i) => {
    if (i === 0) {
      return NaN
    }
    const previousClose = close[i - 1]!
    const currentVolume = volume[i]!
    if (previousClose === 0 || currentVolume === 0) {
      return NaN
    }
    const returnValue = (currentClose - previousClose) / previousClose
    const result = MathUtils.abs(returnValue) / currentVolume
    return isFinite(result) ? result : 0
  })
}

/**
 * Calculate cumulative volume for money flow indicators
 *
 * @param volume - Volume array
 * @param startIndex - Start index
 * @param endIndex - End index
 * @returns Cumulative volume
 */
export function calculateCumulativeVolume(volume: number[], startIndex: number, endIndex: number): number {
  const volumeSlice = volume.slice(startIndex, endIndex)
  return volumeSlice.reduce((sum, vol) => sum + (vol || 0), 0)
}

/**
 * Calculate average volume from volume array
 *
 * @param volume - Volume array
 * @returns Average volume or 1 if array is empty
 */
export function calculateAverageVolume(volume: number[]): number {
  if (!volume || volume.length === 0) {
    return 1
  }
  const validVolumes = volume.filter(vol => vol && isFinite(vol))
  if (validVolumes.length === 0) {
    return 1
  }
  return validVolumes.reduce((sum, vol) => sum + vol, 0) / validVolumes.length
}

/**
 * Calculate volume ratio based on average volume
 *
 * @param volume - Current volume
 * @param avgVolume - Average volume
 * @returns Volume ratio
 */
export function calculateVolumeRatio(volume: number, avgVolume: number): number {
  if (avgVolume === 0) {
    return 1
  }
  const ratio = volume / avgVolume
  return isFinite(ratio) ? ratio : 1
}

/**
 * Calculate Volume Rate of Change (VROC)
 *
 * VROC = ((Current Volume - Volume n periods ago) / Volume n periods ago) × 100
 * Uses centralized calculation utilities for consistency.
 *
 * @param volume - Volume array
 * @param length - Lookback period (default: 14)
 * @returns VROC values array
 * @throws {Error} If volume data is empty or length is invalid
 */
export function calculateVolumeRateOfChange(volume: number[], length: number = 14): number[] {
  if (!volume || volume.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  return ArrayUtils.processArray(volume, (currentVolume, i) => {
    if (i < length) {
      return NaN
    }
    const previousVolume = volume[i - length]!
    if (isNaN(currentVolume) || isNaN(previousVolume) || !isFinite(currentVolume) || !isFinite(previousVolume)) {
      return NaN
    }
    if (previousVolume === 0) {
      return currentVolume > 0 ? 100 : 0
    }
    const vroc = ((currentVolume - previousVolume) / previousVolume) * 100
    return isFinite(vroc) ? vroc : NaN
  })
}

/**
 * Calculate Volume Weighted Moving Average (VWMA)
 *
 * VWMA = Σ(Price × Volume) / Σ(Volume) for the specified period
 * Uses centralized calculation utilities for consistency.
 *
 * @param prices - Price array
 * @param volume - Volume array
 * @param length - Moving average period (default: 20)
 * @returns VWMA values array
 * @throws {Error} If data is empty or arrays have different lengths
 */
export function calculateVWMA(prices: number[], volume: number[], length: number = 20): number[] {
  if (!prices || prices.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (!volume || volume.length === 0) {
    throw new Error(ERROR_MESSAGES.MISSING_VOLUME)
  }
  if (prices.length !== volume.length) {
    throw new Error(ERROR_MESSAGES.CLOSE_VOLUME_LENGTH_MISMATCH)
  }
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  return ArrayUtils.processWindow(prices, length, (priceWindow, i) => {
    const startIndex = i - length + 1
    const volumeWindow = volume.slice(startIndex, i + 1)
    let totalVolume = 0
    let weightedSum = 0
    let validCount = 0
    for (let j = 0; j < priceWindow.length; j++) {
      const price = priceWindow[j]!
      const vol = volumeWindow[j]!
      if (!isNaN(price) && !isNaN(vol) && isFinite(price) && isFinite(vol) && vol > 0) {
        weightedSum += price * vol
        totalVolume += vol
        validCount++
      }
    }
    if (validCount === 0 || totalVolume === 0) {
      return NaN
    }
    const vwma = weightedSum / totalVolume
    return isFinite(vwma) ? vwma : NaN
  })
}

/**
 * Calculate Volume Adjusted Moving Average (VAMA)
 *
 * VAMA = Σ(Price × Volume) / Σ(Volume) for the specified period
 * Similar to VWMA but with additional volume filtering
 *
 * @param prices - Price array
 * @param volume - Volume array
 * @param length - Moving average period (default: 20)
 * @param volumeThreshold - Minimum volume threshold (default: 0)
 * @returns VAMA values array
 * @throws {Error} If data is empty or arrays have different lengths
 */
export function calculateVAMA(prices: number[], volume: number[], length: number = 20, volumeThreshold: number = 0): number[] {
  if (!prices || prices.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (!volume || volume.length === 0) {
    throw new Error(ERROR_MESSAGES.MISSING_VOLUME)
  }
  if (prices.length !== volume.length) {
    throw new Error(ERROR_MESSAGES.CLOSE_VOLUME_LENGTH_MISMATCH)
  }
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  return ArrayUtils.processWindow(prices, length, (priceWindow, i) => {
    const startIndex = i - length + 1
    const volumeWindow = volume.slice(startIndex, i + 1)
    let totalVolume = 0
    let weightedSum = 0
    let validCount = 0
    for (let j = 0; j < priceWindow.length; j++) {
      const price = priceWindow[j]!
      const vol = volumeWindow[j]!
      if (!isNaN(price) && !isNaN(vol) && isFinite(price) && isFinite(vol) && vol >= volumeThreshold) {
        weightedSum += price * vol
        totalVolume += vol
        validCount++
      }
    }
    if (validCount === 0 || totalVolume === 0) {
      return NaN
    }
    const vama = weightedSum / totalVolume
    return isFinite(vama) ? vama : NaN
  })
}

/**
 * Calculate Volume Weighted Sine Moving Average (VWSMA)
 *
 * VWSMA = Σ(Price × Volume × Sine Weight) / Σ(Volume × Sine Weight)
 * Uses sine function to create smooth weighting
 *
 * @param prices - Price array
 * @param volume - Volume array
 * @param length - Moving average period (default: 20)
 * @returns VWSMA values array
 * @throws {Error} If data is empty or arrays have different lengths
 */
export function calculateVWSMA(prices: number[], volume: number[], length: number = 20): number[] {
  if (!prices || prices.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (!volume || volume.length === 0) {
    throw new Error(ERROR_MESSAGES.MISSING_VOLUME)
  }
  if (prices.length !== volume.length) {
    throw new Error(ERROR_MESSAGES.CLOSE_VOLUME_LENGTH_MISMATCH)
  }
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  return ArrayUtils.processWindow(prices, length, (priceWindow, i) => {
    const startIndex = i - length + 1
    const volumeWindow = volume.slice(startIndex, i + 1)
    let totalWeightedVolume = 0
    let weightedSum = 0
    let validCount = 0
    for (let j = 0; j < priceWindow.length; j++) {
      const price = priceWindow[j]!
      const vol = volumeWindow[j]!
      if (!isNaN(price) && !isNaN(vol) && isFinite(price) && isFinite(vol) && vol > 0) {
        const sineWeight = MathUtils.sin((j + 1) * Math.PI / length)
        const weightedVolume = vol * sineWeight
        weightedSum += price * weightedVolume
        totalWeightedVolume += weightedVolume
        validCount++
      }
    }
    if (validCount === 0 || totalWeightedVolume === 0) {
      return NaN
    }
    const vwsma = weightedSum / totalWeightedVolume
    return isFinite(vwsma) ? vwsma : NaN
  })
}

/**
 * Calculate Kyle's Lambda (market microstructure indicator)
 *
 * Kyle's Lambda measures the price impact coefficient using the regression model:
 * r_i,n = λ_i * S_i,n + ε_i,n
 *
 * Where:
 * - r_i,n is the stock return for period n
 * - S_i,n is the signed square-root dollar volume
 * - λ_i is Kyle's Lambda (market impact coefficient)
 *
 * @param close - Close prices array
 * @param volume - Volume array
 * @param period - Period for calculation (default: 20)
 * @returns Kyle's Lambda values array
 * @throws {Error} If data is empty or missing required fields
 */
export function calculateKylesLambda(close: number[], volume: number[], period: number = 20): number[] {
  if (!close || close.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (!volume || volume.length === 0) {
    throw new Error(ERROR_MESSAGES.MISSING_VOLUME)
  }
  if (close.length !== volume.length) {
    throw new Error(ERROR_MESSAGES.CLOSE_VOLUME_LENGTH_MISMATCH)
  }
  if (period <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  const lambda: number[] = []
  // Calculate returns
  const returns: number[] = []
  for (let i = 1; i < close.length; i++) {
    const returnValue = (close[i]! - close[i - 1]!) / close[i - 1]!
    returns.push(returnValue)
  }
  // Calculate signed square-root volume
  const signedVolume = calculateSignedSqrtVolume(returns, volume.slice(1))
  // Rolling regression for each period
  for (let i = period - 1; i < returns.length; i++) {
    const returnsSlice = returns.slice(i - period + 1, i + 1)
    const volumeSlice = signedVolume.slice(i - period + 1, i + 1)
    // Linear regression: returns = λ * signedVolume + ε
    const regression = calculateLinearRegression(volumeSlice, returnsSlice)
    // Kyle's Lambda is the slope coefficient (multiplied by 1,000,000 for scaling)
    const lambdaValue = regression.slope * 1000000
    lambda.push(isNaN(lambdaValue) || !isFinite(lambdaValue) ? 0 : lambdaValue)
  }
  return lambda
}

/**
 * Calculate signed square-root dollar volume
 *
 * @param returns - Array of returns
 * @param volume - Array of volume values
 * @returns Array of signed square-root dollar volume
 */
function calculateSignedSqrtVolume(returns: number[], volume: number[]): number[] {
  const signedVolume: number[] = []
  for (let i = 0; i < returns.length; i++) {
    const sign = MathUtils.sign(returns[i]!)
    const sqrtVolume = MathUtils.sqrt(volume[i]!)
    signedVolume.push(sign * sqrtVolume)
  }
  return signedVolume
}

/**
 * Calculate linear regression
 *
 * @param x - X values array
 * @param y - Y values array
 * @returns Object with slope and intercept
 */
function calculateLinearRegression(x: number[], y: number[]): { slope: number; intercept: number } {
  if (!x || !y || x.length === 0 || y.length === 0) {
    return { slope: 0, intercept: 0 }
  }
  if (x.length !== y.length) {
    return { slope: 0, intercept: 0 }
  }
  // Ensure all values are valid numbers
  const validX = x.filter(val => !isNaN(val) && isFinite(val))
  const validY = y.filter((val, i) => !isNaN(val) && isFinite(val) && x[i] !== undefined && !isNaN(x[i]!) && isFinite(x[i]!))
  if (validX.length !== validY.length || validX.length === 0) {
    return { slope: 0, intercept: 0 }
  }
  const sumX = MathUtils.sum(validX)
  const sumY = MathUtils.sum(validY)
  const sumXY = validX.reduce((sum, xi, i) => {
    const yi = validY[i]
    return yi !== undefined ? sum + xi * yi : sum
  }, 0)
  const sumX2 = validX.reduce((sum, xi) => sum + xi * xi, 0)
  const denominator = validX.length * sumX2 - sumX * sumX
  if (denominator === 0) {
    return { slope: 0, intercept: 0 }
  }
  const slope = (validX.length * sumXY - sumX * sumY) / denominator
  const intercept = (sumY - slope * sumX) / validX.length
  return { slope, intercept }
}

/**
 * Calculate Vortex Indicator
 *
 * VI+ = |Current High - Prior Low| / True Range
 * VI- = |Current Low - Prior High| / True Range
 * Uses centralized calculation utilities for consistency.
 *
 * @param high - High prices array
 * @param low - Low prices array
 * @param close - Close prices array
 * @param length - Calculation period (default: 14)
 * @returns Object with VI+ and VI- arrays
 * @throws {Error} If data is empty or arrays have different lengths
 */
export function calculateVortexIndicator(high: number[], low: number[], close: number[], length: number = 14): {
  viPlus: number[]
  viMinus: number[]
} {
  if (!high || high.length === 0 || !low || low.length === 0 || !close || close.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (high.length !== low.length || high.length !== close.length) {
    throw new Error(ERROR_MESSAGES.HIGH_LOW_LENGTH_MISMATCH)
  }
  if (length <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  const trueRanges = ArrayUtils.processArray(close, (_, i) => {
    if (i === 0) {
      return high[i]! - low[i]!
    }
    const currentHigh = high[i]!
    const currentLow = low[i]!
    const previousClose = close[i - 1]!
    const range1 = currentHigh - currentLow
    const range2 = MathUtils.abs(currentHigh - previousClose)
    const range3 = MathUtils.abs(currentLow - previousClose)
    return MathUtils.max([range1, range2, range3])
  })
  const viPlus: number[] = []
  const viMinus: number[] = []
  for (let i = 0; i < close.length; i++) {
    if (i === 0) {
      viPlus.push(NaN)
      viMinus.push(NaN)
      continue
    }
    const currentHigh = high[i]!
    const currentLow = low[i]!
    const previousHigh = high[i - 1]!
    const previousLow = low[i - 1]!
    const trueRange = trueRanges[i]
    if (trueRange === undefined || isNaN(trueRange) || trueRange === 0) {
      viPlus.push(NaN)
      viMinus.push(NaN)
      continue
    }
    const plusMovement = MathUtils.abs(currentHigh - previousLow)
    const minusMovement = MathUtils.abs(currentLow - previousHigh)
    viPlus.push(plusMovement / trueRange)
    viMinus.push(minusMovement / trueRange)
  }
  return { viPlus, viMinus }
}

/**
 * Calculate price change for VPIN bucket calculation
 *
 * @param windowClose - Window of close prices
 * @param index - Current index
 * @returns Price change value
 */
function calculatePriceChange(windowClose: number[], index: number): number {
  if (index === 0) {
    return 0
  }
  const current = windowClose[index]
  const previous = windowClose[index - 1]
  if (current === undefined || previous === undefined) {
    return 0
  }
  return current - previous
}

/**
 * Process volume for bucket calculation
 *
 * @param vol - Current volume
 * @param priceChange - Price change value
 * @param currentBucketVolume - Current bucket volume
 * @param bucketSize - Target bucket size
 * @returns Object with processed volumes and updated bucket volume
 */
function processVolumeForBucket(
  vol: number,
  priceChange: number,
  currentBucketVolume: number,
  bucketSize: number
): {
  buyVolume: number
  sellVolume: number
  newBucketVolume: number
} {
  let buyVolume = 0
  let sellVolume = 0
  let newBucketVolume = currentBucketVolume + vol

  if (newBucketVolume >= bucketSize) {
    const excess = newBucketVolume - bucketSize
    const bucketVolume = vol - excess
    if (priceChange > 0) {
      buyVolume = bucketVolume
    } else {
      sellVolume = bucketVolume
    }
    newBucketVolume = excess
  } else {
    if (priceChange > 0) {
      buyVolume = vol
    } else {
      sellVolume = vol
    }
  }

  return { buyVolume, sellVolume, newBucketVolume }
}

/**
 * Calculate bucket volumes for VPIN
 *
 * @param windowClose - Window of close prices
 * @param windowVolume - Window of volume data
 * @param bucketSize - Size of each bucket
 * @returns Object with buy and sell volumes
 */
function calculateBucketVolumes(windowClose: number[], windowVolume: number[], bucketSize: number): {
  buyVolume: number
  sellVolume: number
} {
  let buyVolume = 0
  let sellVolume = 0
  let currentBucketVolume = 0

  for (let j = 0; j < windowVolume.length; j++) {
    const vol = windowVolume[j]
    if (vol === undefined) {
      continue
    }
    const priceChange = calculatePriceChange(windowClose, j)
    const result = processVolumeForBucket(vol, priceChange, currentBucketVolume, bucketSize)
    buyVolume += result.buyVolume
    sellVolume += result.sellVolume
    currentBucketVolume = result.newBucketVolume
  }
  return { buyVolume, sellVolume }
}

/**
 * Calculate VPIN for a single window
 *
 * @param windowClose - Window of close prices
 * @param windowVolume - Window of volume data
 * @param buckets - Number of volume buckets
 * @returns VPIN value
 */
function calculateVPINForWindow(windowClose: number[], windowVolume: number[], buckets: number): number {
  const totalVolume = MathUtils.sum(windowVolume)
  if (totalVolume === 0) {
    return NaN
  }
  const bucketSize = totalVolume / buckets
  const { buyVolume, sellVolume } = calculateBucketVolumes(windowClose, windowVolume, bucketSize)
  const vpin = MathUtils.abs(buyVolume - sellVolume) / totalVolume
  return isFinite(vpin) ? vpin : NaN
}

/**
 * Calculate Volume Price Impact Number (VPIN)
 *
 * VPIN measures the imbalance between buy and sell volume
 * Formula: VPIN = |Buy Volume - Sell Volume| / Total Volume
 *
 * @param close - Close prices array
 * @param volume - Volume array
 * @param length - Calculation period (default: 50)
 * @param buckets - Number of volume buckets (default: 50)
 * @returns VPIN values array
 * @throws {Error} If data is empty or length is invalid
 */
export function calculateVPIN(close: number[], volume: number[], length: number = 50, buckets: number = 50): number[] {
  if (!close || close.length === 0 || !volume || volume.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (close.length !== volume.length) {
    throw new Error(ERROR_MESSAGES.CLOSE_VOLUME_LENGTH_MISMATCH)
  }
  if (length <= 0 || buckets <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  const result: number[] = []
  for (let i = 0; i < close.length; i++) {
    if (i < length - 1) {
      result.push(NaN)
      continue
    }
    const windowClose = close.slice(i - length + 1, i + 1)
    const windowVolume = volume.slice(i - length + 1, i + 1)
    const vpin = calculateVPINForWindow(windowClose, windowVolume, buckets)
    result.push(vpin)
  }
  return result
}

/**
 * Calculate Volume Profile
 *
 * Creates a volume distribution across price levels
 * Groups volume by price ranges to show volume concentration
 *
 * @param prices - Price array (typically close prices)
 * @param volume - Volume array
 * @param levels - Number of price levels (default: 10)
 * @returns Object with price levels and volume distribution
 * @throws {Error} If data is empty or arrays have different lengths
 */
export function calculateVolumeProfile(prices: number[], volume: number[], levels: number = 10): {
  priceLevels: number[]
  volumeDistribution: number[]
  poc: number
} {
  if (!prices || prices.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }
  if (!volume || volume.length === 0) {
    throw new Error(ERROR_MESSAGES.MISSING_VOLUME)
  }
  if (prices.length !== volume.length) {
    throw new Error(ERROR_MESSAGES.CLOSE_VOLUME_LENGTH_MISMATCH)
  }
  if (levels <= 0) {
    throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
  }
  const validData = ArrayUtils.processArray(prices, (price, i) => {
    const vol = volume[i]
    if (!isNaN(price) && vol !== undefined && !isNaN(vol) && isFinite(price) && isFinite(vol) && vol > 0) {
      return { price, volume: vol }
    }
    return null
  }).filter(item => item !== null) as Array<{ price: number; volume: number }>
  if (validData.length === 0) {
    return {
      priceLevels: Array(levels).fill(NaN),
      volumeDistribution: Array(levels).fill(0),
      poc: NaN
    }
  }
  const minPrice = MathUtils.min(validData.map(d => d.price))
  const maxPrice = MathUtils.max(validData.map(d => d.price))
  const priceRange = maxPrice - minPrice
  const levelSize = priceRange / levels
  const volumeDistribution = Array(levels).fill(0)
  const priceLevels: number[] = []
  for (let i = 0; i < levels; i++) {
    priceLevels.push(minPrice + (i + 0.5) * levelSize)
  }
  for (const dataPoint of validData) {
    const levelIndex = MathUtils.clamp(Math.floor((dataPoint.price - minPrice) / levelSize), 0, levels - 1)
    volumeDistribution[levelIndex] += dataPoint.volume
  }
  const maxVolumeIndex = volumeDistribution.indexOf(MathUtils.max(volumeDistribution))
  const poc = maxVolumeIndex >= 0 && priceLevels[maxVolumeIndex] !== undefined ? priceLevels[maxVolumeIndex] : NaN
  return {
    priceLevels,
    volumeDistribution,
    poc: isFinite(poc) ? poc : NaN
  }
}
