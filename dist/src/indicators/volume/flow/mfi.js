import { BaseIndicator } from '@base/base-indicator';
import { moneyFlowIndex } from '@calculations/volume/money-flow';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength } from '@utils/pine-script-utils';
/**
 * Money Flow Index (MFI) indicator
 *
 * A volume-weighted oscillator that measures buying and selling pressure.
 * Formula: MFI = 100 - (100 / (1 + Money Ratio))
 *
 * @example
 * ```typescript
 * const mfi = new MFI()
 * const result = mfi.calculate(marketData, { length: 14 })
 * console.log(result.values) // MFI values (0-100)
 * ```
 */
export class MFI extends BaseIndicator {
    constructor() {
        super('MFI', 'Money Flow Index', 'volume');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        if (Array.isArray(data)) {
            throw new Error('MFI requires OHLCV market data');
        }
        if (!data.volume) {
            throw new Error('Volume data is required for MFI calculation');
        }
        const length = pineLength(config?.length || DEFAULT_LENGTHS.MFI, DEFAULT_LENGTHS.MFI);
        const values = this.calculateMFI(data, length);
        return {
            values,
            metadata: {
                length,
                source: 'hlc3'
            }
        };
    }
    calculateMFI(data, length) {
        return moneyFlowIndex(data, length);
    }
}
/**
 * Calculate MFI values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'hlc3')
 * @returns MFI values array
 */
export function mfi(data, length, source) {
    return createIndicatorWrapper(MFI, data, length, source);
}
