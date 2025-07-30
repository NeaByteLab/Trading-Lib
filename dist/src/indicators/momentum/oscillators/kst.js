import { BaseIndicator } from '@base/base-indicator';
import { calculateKST } from '@utils/calculations/oscillators';
import { pineLength, pineSource } from '@utils/pine-script-utils';
/**
 * Know Sure Thing (KST) oscillator indicator
 *
 * KST combines multiple rate of change calculations to identify long-term trends.
 * Uses four different ROC periods with different weights.
 */
export class KST extends BaseIndicator {
    constructor() {
        super('KST', 'Know Sure Thing', 'momentum');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const source = pineSource(data, config?.source);
        const roc1 = pineLength(config?.['roc1'] || 10, 10);
        const roc2 = pineLength(config?.['roc2'] || 15, 15);
        const roc3 = pineLength(config?.['roc3'] || 20, 20);
        const roc4 = pineLength(config?.['roc4'] || 30, 30);
        const sma1 = pineLength(config?.['sma1'] || 10, 10);
        const sma2 = pineLength(config?.['sma2'] || 10, 10);
        const sma3 = pineLength(config?.['sma3'] || 10, 10);
        const sma4 = pineLength(config?.['sma4'] || 15, 15);
        const values = calculateKST(source, roc1, roc2, roc3, roc4, sma1, sma2, sma3, sma4);
        return {
            values,
            metadata: {
                length: roc1,
                roc1,
                roc2,
                roc3,
                roc4,
                sma1,
                sma2,
                sma3,
                sma4,
                source: config?.source || 'close'
            }
        };
    }
}
const KST_INDICATOR = new KST();
/**
 * Calculate KST values using wrapper function
 *
 * @param data - Market data or price array
 * @param roc1 - First ROC period (default: 10)
 * @param roc2 - Second ROC period (default: 15)
 * @param roc3 - Third ROC period (default: 20)
 * @param roc4 - Fourth ROC period (default: 30)
 * @param sma1 - First SMA period (default: 10)
 * @param sma2 - Second SMA period (default: 10)
 * @param sma3 - Third SMA period (default: 10)
 * @param sma4 - Fourth SMA period (default: 15)
 * @param source - Price source (default: 'close')
 * @returns KST values array
 */
export function kst(data, roc1, roc2, roc3, roc4, sma1, sma2, sma3, sma4, source) {
    const config = {
        roc1: roc1 || 10,
        roc2: roc2 || 15,
        roc3: roc3 || 20,
        roc4: roc4 || 30,
        sma1: sma1 || 10,
        sma2: sma2 || 10,
        sma3: sma3 || 10,
        sma4: sma4 || 15,
        source: source || 'close'
    };
    return KST_INDICATOR.calculate(data, config).values;
}
