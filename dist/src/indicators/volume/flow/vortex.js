import { BaseIndicator } from '@base/base-indicator';
import { DEFAULT_LENGTHS } from '@constants/indicator-constants';
import { calculateVortexIndicator } from '@utils/calculation-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { validateVolumeData } from '@utils/validation-utils';
/**
 * Vortex Indicator
 *
 * VI+ = |Current High - Prior Low| / True Range
 * VI- = |Current Low - Prior High| / True Range
 * Uses centralized calculation utilities for consistency.
 */
export class Vortex extends BaseIndicator {
    constructor() {
        super('Vortex', 'Vortex Indicator', 'volume');
    }
    validateInput(data, _config) {
        if (Array.isArray(data)) {
            throw new Error('Market data required for Vortex calculation');
        }
        validateVolumeData(data);
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const marketData = data;
        const length = config?.length || DEFAULT_LENGTHS.ADX;
        const result = calculateVortexIndicator(marketData.high, marketData.low, marketData.close, length);
        return {
            values: result.viPlus,
            metadata: {
                length,
                source: config?.source || 'close',
                viPlus: result.viPlus,
                viMinus: result.viMinus
            }
        };
    }
}
/**
 * Calculate Vortex values using wrapper function
 *
 * @param data - Market data
 * @param length - Calculation period (default: 14)
 * @param source - Price source (default: 'close')
 * @returns Object with VI+ and VI- arrays
 */
export function vortex(data, length, source) {
    const result = createMultiResultIndicatorWrapper(Vortex, data, length, source);
    return {
        viPlus: result.metadata['viPlus'],
        viMinus: result.metadata['viMinus']
    };
}
