import { BaseIndicator } from '@base/base-indicator';
import { calculateVolumeProfile } from '@utils/calculation-utils';
import { createMultiResultIndicatorWrapper } from '@utils/indicator-utils';
import { validateVolumeData } from '@utils/validation-utils';
/**
 * Volume Profile Indicator
 *
 * Creates a volume distribution across price levels
 * Groups volume by price ranges to show volume concentration
 */
export class VolumeProfile extends BaseIndicator {
    constructor() {
        super('Volume Profile', 'Volume Profile', 'volume');
    }
    validateInput(data, _config) {
        if (Array.isArray(data)) {
            throw new Error('Market data required for Volume Profile calculation');
        }
        validateVolumeData(data);
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const marketData = data;
        const levels = config?.['levels'] || 10;
        const result = calculateVolumeProfile(marketData.close, marketData.volume, levels);
        return {
            values: result.volumeDistribution,
            metadata: {
                length: result.volumeDistribution.length,
                source: config?.source || 'close',
                priceLevels: result.priceLevels,
                volumeDistribution: result.volumeDistribution,
                poc: result.poc
            }
        };
    }
}
/**
 * Calculate Volume Profile values using wrapper function
 *
 * @param data - Market data
 * @param levels - Number of price levels (default: 10)
 * @param source - Price source (default: 'close')
 * @returns Object with price levels and volume distribution
 */
export function volumeProfile(data, levels, source) {
    const result = createMultiResultIndicatorWrapper(VolumeProfile, data, levels, source);
    return {
        priceLevels: result.metadata['priceLevels'],
        volumeDistribution: result.metadata['volumeDistribution'],
        poc: result.metadata['poc']
    };
}
