import { BaseIndicator } from '@base/base-indicator';
import { moneyFlowIndex } from '@calculations/volume/money-flow';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
export class MFI extends BaseIndicator {
    constructor() {
        super('MFI', 'Money Flow Index', 'volume');
    }
    calculate(data, config) {
        this.validateInput(data, config);
        // Validate source but don't use the result
        pineSource(data, config?.source);
        const length = pineLength(config?.length || DEFAULT_LENGTHS.MFI, DEFAULT_LENGTHS.MFI);
        const values = moneyFlowIndex(data, length);
        return {
            values,
            metadata: {
                length,
                source: config?.source || 'close'
            }
        };
    }
}
export function mfi(data, length, source) {
    return createIndicatorWrapper(MFI, data, length, source);
}
//# sourceMappingURL=mfi.js.map