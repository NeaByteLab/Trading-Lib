import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { rsi } from '@indicators/momentum/oscillators/rsi';
import { calculateStochasticRSI } from '@utils/calculation-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Stochastic RSI Indicator
 *
 * A momentum oscillator that applies the Stochastic formula to RSI values.
 * Formula: StochRSI = (RSI - RSI_min) / (RSI_max - RSI_min)
 *
 * @example
 * ```typescript
 * const stochRsi = new StochasticRSI()
 * const result = stochRsi.calculate(marketData, { length: 14, kLength: 3, dLength: 3 })
 * console.log(result.values) // %K values
 * console.log(result.metadata.d) // %D values
 * ```
 */
export class StochasticRSI extends BaseIndicator {
    constructor() {
        super('StochasticRSI', 'Stochastic RSI', 'momentum');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const rsiLength = pineLength(config?.length || DEFAULT_LENGTHS.RSI, DEFAULT_LENGTHS.RSI);
        const kLength = pineLength(config?.['kLength'] || DEFAULT_LENGTHS.STOCHASTIC_K, DEFAULT_LENGTHS.STOCHASTIC_K);
        const dLength = pineLength(config?.['dLength'] || DEFAULT_LENGTHS.STOCHASTIC_D, DEFAULT_LENGTHS.STOCHASTIC_D);
        const { k, d } = this.calculateStochasticRSI(data, rsiLength, kLength, dLength);
        return {
            values: k,
            metadata: {
                length: rsiLength,
                kLength,
                dLength,
                source: config?.source || 'close',
                d
            }
        };
    }
    calculateStochasticRSI(data, rsiLength, kLength, dLength) {
        const rsiValues = Array.isArray(data) ? rsi(data, rsiLength) : rsi(data.close, rsiLength);
        return calculateStochasticRSI(rsiValues, kLength, dLength);
    }
}
/**
 * Calculate Stochastic RSI values using wrapper function
 *
 * @param data - Market data or price array
 * @param length - RSI calculation period (default: 14)
 * @param kLength - %K calculation period (default: 3)
 * @param dLength - %D calculation period (default: 3)
 * @param source - Price source (default: 'close')
 * @returns %K and %D values
 */
export function stochasticRsi(data, length, kLength, dLength, source) {
    const result = createMultiResultIndicatorWrapper(StochasticRSI, data, length, source, { kLength, dLength });
    return {
        k: result.values,
        d: result.metadata['d']
    };
}
