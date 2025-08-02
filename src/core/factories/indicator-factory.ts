import { BaseIndicator } from '@base/base-indicator'
import { movingAverage } from '@calculations/moving-averages'
import { ERROR_MESSAGES } from '@constants/indicator-constants'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { createIndicatorWrapper } from '@utils/indicator-utils'
import { pineLength, pineSource } from '@utils/pine-script-utils'
import { validateArray, validateIndicatorData } from '@utils/validation-utils'

/**
 * Create Moving Average Indicator Factory
 *
 * Factory function that creates moving average indicators with consistent behavior.
 * Supports SMA, EMA, WMA, and Hull moving average types.
 *
 * @param name - Indicator name
 * @param description - Indicator description
 * @param type - Moving average type ('sma' | 'ema' | 'wma' | 'hull')
 * @param defaultLength - Default calculation period
 * @returns Object with indicator class and function
 *
 * @example
 * ```typescript
 * const smaIndicator = createMovingAverageIndicator('SMA', 'Simple Moving Average', 'sma', 20)
 * const smaValues = smaIndicator.function(data, 20, 'close')
 * ```
 */
export function createMovingAverageIndicator(
  name: string,
  description: string,
  type: 'sma' | 'ema' | 'wma' | 'hull',
  defaultLength: number
) {
  class MovingAverageIndicator extends BaseIndicator {
    constructor() {
      super(name, description, 'trend')
    }

    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
      this.validateInput(data, config)
      const source = pineSource(data, config?.source)
      const length = pineLength(config?.length || defaultLength, defaultLength)
      if (length <= 0) {
        throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
      }
      const values = movingAverage(source, length, type)
      return {
        values,
        metadata: {
          length,
          source: config?.source || 'close'
        }
      }
    }
  }
  return {
    class: MovingAverageIndicator,
    function: (_data: MarketData | number[], _length?: number, _source?: string): number[] => {
      if (_length !== undefined && _length <= 0) {
        throw new Error(ERROR_MESSAGES.INVALID_LENGTH)
      }
      return createIndicatorWrapper(MovingAverageIndicator, _data, _length, _source)
    }
  }
}

/**
 * Create Pivot Indicator Factory
 *
 * Factory function that creates pivot point indicators with consistent behavior.
 * Supports standard, Camarilla, Woodie, and DeMark pivot calculations.
 *
 * @param name - Indicator name
 * @param description - Indicator description
 * @param calculator - Pivot calculation function
 * @returns Pivot indicator class
 *
 * @example
 * ```typescript
 * const standardPivots = createPivotIndicator('Standard Pivots', 'Standard Pivot Points', calculatePivotPoints)
 * const camarillaPivots = createPivotIndicator('Camarilla Pivots', 'Camarilla Pivot Points', calculateCamarillaPivots)
 * ```
 */
export function createPivotIndicator(
  name: string,
  description: string,
  calculator: (high: number[], low: number[], close: number[]) => {
    pp: number[]
    r1: number[]
    r2: number[]
    r3: number[]
    s1: number[]
    s2: number[]
    s3: number[]
  }
) {
  class PivotIndicator extends BaseIndicator {
    constructor() {
      super(name, description, 'trend')
    }

    override validateInput(data: MarketData | number[], _config?: IndicatorConfig): void {
      if (Array.isArray(data)) {
        throw new Error(ERROR_MESSAGES.MISSING_OHLC)
      }
      validateIndicatorData(data)
    }

    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
      this.validateInput(data, config)
      const marketData = data as MarketData
      const { pp, r1, r2, r3, s1, s2, s3 } = calculator(marketData.high, marketData.low, marketData.close)
      return {
        values: pp,
        metadata: {
          length: pp.length,
          source: config?.source || 'close',
          r1,
          r2,
          r3,
          s1,
          s2,
          s3
        }
      }
    }
  }
  return PivotIndicator
}

/**
 * Create Price Comparison Indicator Factory
 *
 * Factory function that creates price comparison indicators.
 * Supports ratio, performance, and correlation calculations between price series.
 *
 * @param name - Indicator name
 * @param description - Indicator description
 * @param calculator - Price comparison calculation function
 * @returns Price comparison indicator class
 *
 * @example
 * ```typescript
 * const priceRatio = createPriceComparisonIndicator('Price Ratio', 'Price Ratio Indicator', calculatePriceRatio)
 * const result = priceRatio.calculate(data, { length: 20 })
 * ```
 */
export function createPriceComparisonIndicator(
  name: string,
  description: string,
  calculator: (price1: number[], price2: number[], basePrice?: number) => number[] | { ratio: number[], performance: number[], correlation: number }
) {
  class PriceComparisonIndicator extends BaseIndicator {
    constructor() {
      super(name, description, 'trend')
    }

    override validateInput(_data: MarketData | number[], config?: IndicatorConfig): void {
      const price1 = config?.['price1'] as unknown as number[]
      const price2 = config?.['price2'] as unknown as number[]
      validateArray(price1)
      validateArray(price2)
      if (price1.length !== price2.length) {
        throw new Error(ERROR_MESSAGES.ARRAY_LENGTH_MISMATCH)
      }
    }

    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
      this.validateInput(data, config)
      const price1 = config?.['price1'] as unknown as number[]
      const price2 = config?.['price2'] as unknown as number[]
      const basePrice = (config?.['basePrice'] as number) || 100
      const result = calculator(price1, price2, basePrice)
      if (Array.isArray(result)) {
        return {
          values: result,
          metadata: {
            length: result.length,
            source: config?.source || 'comparison'
          }
        }
      } else {
        return {
          values: result.ratio,
          metadata: {
            length: result.ratio.length,
            performance: result.performance,
            correlation: result.correlation,
            basePrice,
            source: config?.source || 'comparison'
          }
        }
      }
    }
  }
  return PriceComparisonIndicator
}

/**
 * Create Oscillator Indicator Factory
 *
 * Factory function that creates oscillator indicators with consistent behavior.
 * Supports RSI, CCI, Williams %R, and other momentum oscillators.
 *
 * @param name - Indicator name
 * @param description - Indicator description
 * @param calculator - Oscillator calculation function
 * @param defaultLength - Default calculation period
 * @returns Oscillator indicator class
 *
 * @example
 * ```typescript
 * const rsiIndicator = createOscillatorIndicator('RSI', 'Relative Strength Index', calculateRSI, 14)
 * const rsiValues = rsiIndicator.calculate(data, { length: 14 })
 * ```
 */
export function createOscillatorIndicator(
  name: string,
  description: string,
  calculator: (data: number[], length: number) => number[],
  defaultLength: number
) {
  return createGenericIndicator(name, description, 'momentum', calculator, defaultLength)
}

/**
 * Generic Indicator Factory
 *
 * Centralized factory for creating indicators with custom categories.
 * Eliminates code duplication across different indicator types.
 */
function createGenericIndicator(
  name: string,
  description: string,
  category: string,
  calculator: ((data: number[], length: number) => number[]) | ((_data: MarketData | number[], _length: number) => number[]),
  defaultLength: number
) {
  return class extends BaseIndicator {
    constructor() {
      super(name, description, category)
    }

    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
      this.validateInput(data, config)
      const source = pineSource(data, config?.source)
      const length = pineLength(config?.length || defaultLength, defaultLength)
      const values = typeof calculator === 'function' && calculator.length === 2
        ? (calculator as (data: number[], length: number) => number[])(source, length)
        : (calculator as (_data: MarketData | number[], _length: number) => number[])(source, length)
      return {
        values,
        metadata: {
          length,
          source: config?.source || 'close'
        }
      }
    }
  }
}

/**
 * Create Volatility Indicator Factory
 *
 * Factory function that creates volatility indicators with consistent behavior.
 * Supports ATR, Bollinger Bands, Keltner Channels, and other volatility measures.
 *
 * @param name - Indicator name
 * @param description - Indicator description
 * @param calculator - Volatility calculation function
 * @param defaultLength - Default calculation period
 * @returns Volatility indicator class
 *
 * @example
 * ```typescript
 * const atrIndicator = createVolatilityIndicator('ATR', 'Average True Range', calculateATR, 14)
 * const atrValues = atrIndicator.calculate(data, { length: 14 })
 * ```
 */
export function createVolatilityIndicator(
  name: string,
  description: string,
  calculator: (_data: MarketData | number[], _length: number) => number[],
  defaultLength: number
) {
  return createGenericIndicator(name, description, 'volatility', calculator, defaultLength)
}

/**
 * Create Volume Indicator Factory
 *
 * Factory function that creates volume indicators with consistent behavior.
 * Supports OBV, MFI, VWAP, and other volume-based indicators.
 *
 * @param name - Indicator name
 * @param description - Indicator description
 * @param calculator - Volume calculation function
 * @param defaultLength - Default calculation period
 * @returns Volume indicator class
 *
 * @example
 * ```typescript
 * const obvIndicator = createVolumeIndicator('OBV', 'On Balance Volume', calculateOBV, 1)
 * const obvValues = obvIndicator.calculate(data, { length: 1 })
 * ```
 */
export function createVolumeIndicator(
  name: string,
  description: string,
  calculator: (_data: MarketData | number[], _length: number) => number[],
  defaultLength: number
) {
  return class extends BaseIndicator {
    constructor() {
      super(name, description, 'volume')
    }

    override validateInput(data: MarketData | number[], _config?: IndicatorConfig): void {
      if (Array.isArray(data)) {
        throw new Error(ERROR_MESSAGES.MISSING_OHLCV)
      }
      if (!data.volume) {
        throw new Error(ERROR_MESSAGES.MISSING_VOLUME)
      }
    }

    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
      this.validateInput(data, config)
      const length = pineLength(config?.length || defaultLength, defaultLength)
      const values = calculator(data, length)
      return {
        values,
        metadata: {
          length,
          source: config?.source || 'close'
        }
      }
    }
  }
}
