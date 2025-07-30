import { PriceCalculations } from '@utils/calculation-utils';
/**
 * Base class for all technical indicators
 * Provides common functionality and validation
 */
export class BaseIndicator {
    name;
    description;
    category;
    constructor(name, description, category) {
        this.name = name;
        this.description = description;
        this.category = category;
    }
    /**
     * Validate input data and configuration
     *
     * @param _data - Input data (unused in base implementation)
     * @param _config - Configuration (unused in base implementation)
     */
    validateInput(_data, _config) {
        // Base implementation - override in subclasses for specific validation
    }
    /**
     * Get source data based on configuration
     */
    getSourceData(data, source) {
        switch (source) {
            case 'open':
                return data.open;
            case 'high':
                return data.high;
            case 'low':
                return data.low;
            case 'close':
                return data.close;
            case 'hl2':
                return PriceCalculations.hl2(data);
            case 'hlc3':
            case 'typical':
                return PriceCalculations.typical(data);
            case 'ohlc4':
                return PriceCalculations.ohlc4(data);
            case 'volume':
                if (!data.volume) {
                    throw new Error('Volume data is required for volume-based calculations');
                }
                return data.volume;
            default:
                return data.close;
        }
    }
}
