import { OscillatorIndicator } from '@base/oscillator-indicator'
import { movingAverage } from '@calculations/moving-averages'
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types'
import { ArrayUtils } from '@utils/array-utils'
import { createIndicatorWrapper } from '@utils/indicator-utils'

/**
 * Calculate Coppock Indicator
 *
 * Coppock Indicator is a momentum oscillator that measures the rate of change.
 * Formula: Coppock = WMA(ROC(14) + ROC(11), 10)
 *
 * @param data - Source data array
 * @param roc1Length - First ROC period (default: 14)
 * @param roc2Length - Second ROC period (default: 11)
 * @param wmaLength - WMA period (default: 10)
 * @returns Coppock Indicator values array
 */
function calculateCoppock(data: number[], roc1Length: number = 14, roc2Length: number = 11, wmaLength: number = 10): number[] {
  const roc1 = ArrayUtils.processArray(data, (price, i) => {
    if (i < roc1Length) {return NaN}
    const previous = data[i - roc1Length]
    if (previous === undefined || previous === 0) {return NaN}
    const result = ((price - previous) / previous) * 100
    return isFinite(result) ? result : NaN
  })
  const roc2 = ArrayUtils.processArray(data, (price, i) => {
    if (i < roc2Length) {return NaN}
    const previous = data[i - roc2Length]
    if (previous === undefined || previous === 0) {return NaN}
    const result = ((price - previous) / previous) * 100
    return isFinite(result) ? result : NaN
  })
  const combined = ArrayUtils.processArray(roc1, (val1, i) => {
    const val2 = roc2[i]
    return val1 !== undefined && val2 !== undefined && !isNaN(val1) && !isNaN(val2) ? val1 + val2 : NaN
  })
  return movingAverage(combined, wmaLength, 'wma')
}

/**
 * Coppock Indicator
 *
 * A momentum oscillator that measures the rate of change using two ROC periods.
 * Used to identify long-term buying opportunities in bear markets.
 * Values above zero indicate potential bullish signals.
 *
 * @example
 * ```typescript
 * const coppock = new CoppockIndicator()
 * const result = coppock.calculate(marketData, { roc1Length: 14, roc2Length: 11, wmaLength: 10 })
 * console.log(result.values) // Coppock Indicator values
 * ```
 */
export class CoppockIndicator extends OscillatorIndicator {
  constructor() {
    super('CoppockIndicator', 'Coppock Indicator', 14, 1)
  }

  protected calculateOscillator(data: number[], _length: number): number[] {
    return calculateCoppock(data, 14, 11, 10)
  }

  override calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult {
    this.validateInput(data, config)
    const source = Array.isArray(data) ? data : data.close
    const roc1Length = (config?.['roc1Length'] as number) || 14
    const roc2Length = (config?.['roc2Length'] as number) || 11
    const wmaLength = (config?.['wmaLength'] as number) || 10
    const values = calculateCoppock(source, roc1Length, roc2Length, wmaLength)
    return {
      values,
      metadata: {
        length: roc1Length,
        roc1Length,
        roc2Length,
        wmaLength,
        source: config?.source || 'close'
      }
    }
  }
}

/**
 * Calculate Coppock Indicator using wrapper function
 *
 * @param data - Market data or price array
 * @param roc1Length - First ROC period (default: 14)
 * @param roc2Length - Second ROC period (default: 11)
 * @param wmaLength - WMA period (default: 10)
 * @returns Coppock Indicator values array
 */
export function coppock(data: MarketData | number[], roc1Length: number = 14, roc2Length: number = 11, wmaLength: number = 10): number[] {
  return createIndicatorWrapper(CoppockIndicator, data, undefined, undefined, { roc1Length, roc2Length, wmaLength })
}
