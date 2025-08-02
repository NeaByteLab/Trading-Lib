import { BaseIndicator } from '@base/base-indicator'
import { movingAverage } from '@calculations/moving-averages'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { calculatePPO } from '@utils/calculation-utils'

/**
 * Percentage Price Oscillator (PPO) - momentum indicator showing price momentum
 * Formula: PPO = ((Fast EMA - Slow EMA) / Slow EMA) × 100
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @param signalLength - Signal line period (default: 9)
 * @returns Object with PPO, signal, and histogram values
 *
 * @example
 * ```typescript
 * const ppo = ta.ppo(data.close, 12, 26, 9)
 * // Returns: { ppo: [...], signal: [...], histogram: [...] }
 * ```
 */
function calculatePPOWithSignal(data: number[], fastLength: number = 12, slowLength: number = 26, signalLength: number = 9): {
  ppo: number[]
  signal: number[]
  histogram: number[]
} {
  // Validate input data
  if (!data || data.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_DATA)
  }

  const ppo = calculatePPO(data, fastLength, slowLength)

  // Filter out NaN values for signal calculation
  const validPPO = ppo.filter(val => !isNaN(val) && isFinite(val))
  if (validPPO.length === 0) {
    return {
      ppo,
      signal: Array(ppo.length).fill(NaN),
      histogram: Array(ppo.length).fill(NaN)
    }
  }

  // Calculate signal using only valid PPO values
  const signal = movingAverage(validPPO, signalLength, 'ema')

  // Create aligned arrays with proper padding
  const alignedPPO = [...ppo]
  const alignedSignal = Array(ppo.length).fill(NaN)

  // Fill signal array starting from the end to align with PPO
  const signalStartIndex = ppo.length - signal.length
  for (let i = 0; i < signal.length; i++) {
    alignedSignal[signalStartIndex + i] = signal[i]
  }

  const histogram = ArrayUtils.processArray(alignedPPO, (ppoVal, i) => {
    const signalVal = alignedSignal[i]
    if (ppoVal === undefined || signalVal === undefined || isNaN(ppoVal) || isNaN(signalVal)) {
      return NaN
    }
    return ppoVal - signalVal
  })

  return {
    ppo: alignedPPO,
    signal: alignedSignal,
    histogram
  }
}

class PPOIndicator extends BaseIndicator {
  constructor() {
    super('PPO', 'Percentage Price Oscillator', 'momentum')
  }

  calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const source = Array.isArray(data) ? data : data.close
    const fastLength = config?.length || 12
    const slowLength = config?.['slowLength'] as number || 26
    const signalLength = config?.['signalLength'] as number || 9

    const result = calculatePPOWithSignal(source, fastLength, slowLength as number, signalLength as number)

    return {
      values: result.ppo,
      metadata: {
        length: fastLength,
        slowLength,
        signalLength,
        source: config?.source || 'close',
        signal: result.signal,
        histogram: result.histogram
      }
    }
  }
}

const PPO = new PPOIndicator()

/**
 * Percentage Price Oscillator (PPO) - momentum indicator showing price momentum
 * Formula: PPO = ((Fast EMA - Slow EMA) / Slow EMA) × 100
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @param signalLength - Signal line period (default: 9)
 * @returns Object with PPO, signal, and histogram values
 *
 * @example
 * ```typescript
 * const ppo = ta.ppo(data.close, 12, 26, 9)
 * // Returns: { ppo: [...], signal: [...], histogram: [...] }
 * ```
 */
export function percentagePriceOscillator(
  data: MarketData | number[],
  fastLength: number = 12,
  slowLength: number = 26,
  signalLength: number = 9
): {
  ppo: number[]
  signal: number[]
  histogram: number[]
} {
  const source = Array.isArray(data) ? data : data.close
  return calculatePPOWithSignal(source, fastLength, slowLength, signalLength)
}

/**
 * Percentage Price Oscillator (PPO) - momentum indicator showing price momentum
 * Formula: PPO = ((Fast EMA - Slow EMA) / Slow EMA) × 100
 *
 * @param data - Market data or price array
 * @param fastLength - Fast EMA period (default: 12)
 * @param slowLength - Slow EMA period (default: 26)
 * @param signalLength - Signal line period (default: 9)
 * @param source - Price source (default: 'close')
 * @returns PPO values array
 *
 * @example
 * ```typescript
 * const ppo = ta.ppo(data.close, 12, 26, 9)
 * // Returns: [0.5, 0.8, ..., 2.1, 1.9, ...]
 * ```
 */
export function ppo(data: MarketData | number[], fastLength?: number, slowLength?: number, signalLength?: number, source?: string): number[] {
  const config: IndicatorConfig = {
    length: fastLength || 12,
    source: source || 'close',
    slowLength: slowLength || 26,
    signalLength: signalLength || 9
  }
  return PPO.calculate(data, config).values
}
