import { BaseIndicator } from '@base/base-indicator';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { ArrayUtils } from '@utils/array-utils';
import { calculateAverageVolume, calculateVolumeRatio } from '@utils/calculation-utils';
/**
 * Calculate Equivolume Chart Data
 *
 * Creates equivolume chart data that combines price and volume information.
 * Bar Width = Base Width * Volume Ratio
 *
 * @param data - Market data with OHLCV
 * @param baseWidth - Base width for volume bars (default: 1)
 * @returns Equivolume chart data
 */
function calculateEquivolume(data, baseWidth = 1) {
    const avgVolume = calculateAverageVolume(data.volume || []);
    const volumeRatio = ArrayUtils.processArray(data.volume || [], (volume) => {
        return calculateVolumeRatio(volume, avgVolume);
    });
    const barWidth = ArrayUtils.processArray(volumeRatio, (ratio) => {
        const width = baseWidth * ratio;
        return isFinite(width) ? width : baseWidth;
    });
    const priceRange = ArrayUtils.processArray(data.close, (_, i) => {
        const high = data.high[i];
        const low = data.low[i];
        const range = high - low;
        return isFinite(range) ? range : 0;
    });
    return { volumeRatio, barWidth, priceRange };
}
/**
 * Equivolume Chart Indicator
 *
 * Creates equivolume chart data that combines price and volume information.
 * Bar width represents volume, bar height represents price range.
 * Useful for identifying volume-price relationships and market structure.
 *
 * @example
 * ```typescript
 * const equivolume = new Equivolume()
 * const result = equivolume.calculate(marketData, { baseWidth: 1 })
 * console.log(result.values) // Volume ratio values
 * console.log(result.metadata.barWidth) // Bar width values
 * console.log(result.metadata.priceRange) // Price range values
 * ```
 */
export class Equivolume extends BaseIndicator {
    constructor() {
        super('Equivolume', 'Equivolume Chart', 'trend');
    }
    validateInput(data, config) {
        if (Array.isArray(data)) {
            throw new Error(ERROR_MESSAGES.MISSING_OHLC);
        }
        if (!data.volume) {
            throw new Error(ERROR_MESSAGES.VOLUME_REQUIRED);
        }
        const baseWidth = config?.['baseWidth'] || 1;
        if (baseWidth <= 0) {
            throw new Error('Base width must be positive');
        }
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const baseWidth = config?.['baseWidth'] || 1;
        const { volumeRatio, barWidth, priceRange } = calculateEquivolume(data, baseWidth);
        return {
            values: volumeRatio,
            metadata: {
                length: volumeRatio.length,
                baseWidth,
                barWidth,
                priceRange,
                source: config?.source || 'close'
            }
        };
    }
}
/**
 * Calculate Equivolume Chart Data using wrapper function
 *
 * @param data - Market data with OHLCV
 * @param baseWidth - Base width for volume bars (default: 1)
 * @returns Equivolume chart data
 */
export function equivolume(data, baseWidth = 1) {
    const indicator = new Equivolume();
    const result = indicator.calculate(data, { baseWidth });
    return {
        volumeRatio: result.values,
        barWidth: result.metadata['barWidth'],
        priceRange: result.metadata['priceRange']
    };
}
