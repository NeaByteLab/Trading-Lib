import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { DEFAULT_LENGTHS, DEFAULT_MULTIPLIERS } from '@constants/indicator-constants';
import { calculateMean, calculateVariance, combineArrays, rollingWindow } from '@utils/calculation-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
export class BollingerBands extends BaseIndicator {
    constructor() {
        super('BollingerBands', 'Bollinger Bands', 'volatility');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.BOLLINGER, DEFAULT_LENGTHS.BOLLINGER);
        const multiplier = config?.['multiplier'] || DEFAULT_MULTIPLIERS.BOLLINGER;
        const { upper, middle, lower } = this.calculateBollingerBands(source, length, multiplier);
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
    calculateBollingerBands(data, length, multiplier) {
        const middle = movingAverage(data, length, 'sma');
        const stdDev = rollingWindow(data, length, (window) => {
            const mean = calculateMean(window);
            const variance = calculateVariance(window, mean, true);
            return Math.sqrt(variance);
        });
        const stdDevMultiplied = combineArrays(stdDev, new Array(stdDev.length).fill(multiplier), 'multiply');
        const upper = combineArrays(middle, stdDevMultiplied, 'add');
        const lower = combineArrays(middle, stdDevMultiplied, 'subtract');
        return { upper, middle, lower };
    }
}
export function bollingerBands(data, length, multiplier, source) {
    const result = createMultiResultIndicatorWrapper(BollingerBands, data, length, source, { multiplier });
    return {
        upper: result.metadata['upper'],
        middle: result.values,
        lower: result.metadata['lower']
    };
}
//# sourceMappingURL=bollinger-bands.js.map