import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { averageTrueRange } from '@calculations/volatility/average-true-range';
import { DEFAULT_LENGTHS, DEFAULT_MULTIPLIERS } from '@constants/indicator-constants';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
export class KeltnerChannel extends BaseIndicator {
    constructor() {
        super('KeltnerChannel', 'Keltner Channel', 'volatility');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        // Validate source but don't use the result
        pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.KELTNER, DEFAULT_LENGTHS.KELTNER);
        const multiplier = config?.['multiplier'] || DEFAULT_MULTIPLIERS.KELTNER;
        const { upper, middle, lower } = this.calculateKeltnerChannel(data, length, multiplier);
        return {
            values: middle,
            metadata: {
                length,
                multiplier,
                source: config?.source || 'close',
                upper,
                lower
            }
        };
    }
    calculateKeltnerChannel(data, length, multiplier) {
        const typicalPrices = data.high.map((high, i) => (high + data.low[i] + data.close[i]) / 3);
        const middle = movingAverage(typicalPrices, length, 'ema');
        const atr = averageTrueRange(data, length);
        const upper = middle.map((mid, i) => mid + (multiplier * atr[i]));
        const lower = middle.map((mid, i) => mid - (multiplier * atr[i]));
        return { upper, middle, lower };
    }
}
export function keltnerChannel(data, length, multiplier, source) {
    const result = createMultiResultIndicatorWrapper(KeltnerChannel, data, length, source, { multiplier });
    return {
        upper: result.metadata['upper'],
        middle: result.values,
        lower: result.metadata['lower']
    };
}
//# sourceMappingURL=keltner-channel.js.map