import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { DEFAULT_LENGTHS, DEFAULT_MULTIPLIERS } from '@constants/indicator-constants';
/**
 * Indicator Factory - Creates reusable indicator instances
 *
 * This approach reduces code duplication and provides consistent interfaces
 * using centralized utilities for all calculations.
 */
export class IndicatorFactory {
    static indicators = new Map();
    /**
     * Register an indicator with the factory
     *
     * @param config - Indicator configuration
     */
    static registerIndicator(config) {
        this.indicators.set(config.name, config);
    }
    /**
     * Create an indicator instance by name
     *
     * @param name - Indicator name
     * @returns Indicator instance or null if not found
     */
    static createIndicator(name) {
        const config = this.indicators.get(name);
        if (!config) {
            return null;
        }
        return new class extends BaseIndicator {
            constructor() {
                super(config.name, config.description, config.category);
            }
            calculate(data, config) {
                this.validateInput(data, config);
                // Handle both MarketData and number[] inputs
                const source = Array.isArray(data) ? data : this.getSourceData(data, config?.source);
                const length = config?.length || this.getDefaultLength();
                const values = this.calculateValues(source, { ...config, length });
                return {
                    values,
                    metadata: {
                        length,
                        source: config?.source || 'close'
                    }
                };
            }
            calculateValues(data, config) {
                const factoryConfig = IndicatorFactory.indicators.get(this.name);
                return factoryConfig.calculationFunction(data, config);
            }
            getDefaultLength() {
                const factoryConfig = IndicatorFactory.indicators.get(this.name);
                return factoryConfig.defaultLength;
            }
        }();
    }
    /**
     * Get list of available indicator names
     *
     * @returns Array of indicator names
     */
    static getAvailableIndicators() {
        return Array.from(this.indicators.keys());
    }
}
// Register indicators with centralized utilities
IndicatorFactory.registerIndicator({
    name: 'SMA',
    description: 'Simple Moving Average',
    category: 'trend',
    defaultLength: DEFAULT_LENGTHS.SMA,
    calculationFunction: (data, config = {}) => movingAverage(data, config.length || DEFAULT_LENGTHS.SMA, 'sma')
});
IndicatorFactory.registerIndicator({
    name: 'EMA',
    description: 'Exponential Moving Average',
    category: 'trend',
    defaultLength: DEFAULT_LENGTHS.EMA,
    calculationFunction: (data, config = {}) => movingAverage(data, config.length || DEFAULT_LENGTHS.EMA, 'ema')
});
IndicatorFactory.registerIndicator({
    name: 'WMA',
    description: 'Weighted Moving Average',
    category: 'trend',
    defaultLength: DEFAULT_LENGTHS.WMA,
    calculationFunction: (data, config = {}) => movingAverage(data, config.length || DEFAULT_LENGTHS.WMA, 'wma')
});
IndicatorFactory.registerIndicator({
    name: 'HULL',
    description: 'Hull Moving Average',
    category: 'trend',
    defaultLength: DEFAULT_LENGTHS.HULL,
    calculationFunction: (data, config = {}) => movingAverage(data, config.length || DEFAULT_LENGTHS.HULL, 'hull')
});
// RSI using centralized calculation utility
IndicatorFactory.registerIndicator({
    name: 'RSI',
    description: 'Relative Strength Index',
    category: 'momentum',
    defaultLength: DEFAULT_LENGTHS.RSI,
    calculationFunction: (data, config = {}) => {
        // Use centralized RSI calculation from calculation-utils
        const { calculateRSI } = require('@utils/calculation-utils');
        return calculateRSI(data, config.length || DEFAULT_LENGTHS.RSI);
    }
});
// Bollinger Bands using centralized calculation utility
IndicatorFactory.registerIndicator({
    name: 'BOLLINGER',
    description: 'Bollinger Bands',
    category: 'volatility',
    defaultLength: DEFAULT_LENGTHS.BOLLINGER,
    defaultMultiplier: DEFAULT_MULTIPLIERS.BOLLINGER,
    calculationFunction: (data, config = {}) => {
        // Use centralized Bollinger Bands calculation
        const { bollingerBands } = require('@indicators/volatility/bollinger/bollinger-bands');
        const result = bollingerBands(data, config.length || DEFAULT_LENGTHS.BOLLINGER, config['multiplier'] || DEFAULT_MULTIPLIERS.BOLLINGER);
        return result.middle;
    }
});
/**
 * Create an indicator instance by name
 *
 * @param name - Indicator name
 * @returns Indicator instance or null if not found
 */
export function createIndicator(name) {
    return IndicatorFactory.createIndicator(name);
}
/**
 * Get list of available indicator names
 *
 * @returns Array of indicator names
 */
export function getAvailableIndicators() {
    return IndicatorFactory.getAvailableIndicators();
}
//# sourceMappingURL=indicator-factory.js.map