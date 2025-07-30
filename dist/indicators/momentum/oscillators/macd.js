import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
export class MACD extends BaseIndicator {
    constructor() {
        super('MACD', 'Moving Average Convergence Divergence', 'momentum');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const fastLength = pineLength(config?.['fastLength'] || DEFAULT_LENGTHS.MACD, DEFAULT_LENGTHS.MACD);
        const slowLength = pineLength(config?.['slowLength'] || DEFAULT_LENGTHS.MACD_SIGNAL, DEFAULT_LENGTHS.MACD_SIGNAL);
        const signalLength = pineLength(config?.['signalLength'] || DEFAULT_LENGTHS.MACD_HISTOGRAM, DEFAULT_LENGTHS.MACD_HISTOGRAM);
        const { macd, signal, histogram } = this.calculateMACD(source, fastLength, slowLength, signalLength);
        return {
            values: macd,
            metadata: {
                length: fastLength,
                fastLength,
                slowLength,
                signalLength,
                source: config?.source || 'close',
                signal,
                histogram
            }
        };
    }
    calculateMACD(data, fastLength, slowLength, signalLength) {
        const fastEMA = movingAverage(data, fastLength, 'ema');
        const slowEMA = movingAverage(data, slowLength, 'ema');
        const macd = fastEMA.map((fast, i) => fast - slowEMA[i]);
        const signal = movingAverage(macd, signalLength, 'ema');
        const histogram = macd.map((macdVal, i) => macdVal - signal[i]);
        return { macd, signal, histogram };
    }
}
export function macd(data, fastLength, slowLength, signalLength, source) {
    const result = createMultiResultIndicatorWrapper(MACD, data, undefined, source, { fastLength, slowLength, signalLength });
    return {
        macd: result.values,
        signal: result.metadata['signal'],
        histogram: result.metadata['histogram']
    };
}
//# sourceMappingURL=macd.js.map