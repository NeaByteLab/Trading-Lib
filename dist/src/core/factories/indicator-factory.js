import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
import { validateArray, validateIndicatorData } from '@utils/validation-utils';
/**
 * Moving Average Indicator Factory
 *
 * Centralized factory for creating moving average indicators.
 * Eliminates code duplication across SMA, EMA, WMA, and Hull indicators.
 *
 * @example
 * ```typescript
 * const sma = createMovingAverageIndicator('SMA', 'Simple Moving Average', 'sma', 20)
 * const ema = createMovingAverageIndicator('EMA', 'Exponential Moving Average', 'ema', 20)
 * ```
 */
export function createMovingAverageIndicator(name, description, type, defaultLength) {
    class MovingAverageIndicator extends BaseIndicator {
        constructor() {
            super(name, description, 'trend');
        }
        calculate(data, config) {
            this.validateInput(data, config);
            const source = pineSource(data, config?.source);
            const length = pineLength(config?.length || defaultLength, defaultLength);
            if (length <= 0) {
                throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
            }
            const values = movingAverage(source, length, type);
            return {
                values,
                metadata: {
                    length,
                    source: config?.source || 'close'
                }
            };
        }
    }
    return {
        class: MovingAverageIndicator,
        function: (_data, _length, _source) => {
            if (_length !== undefined && _length <= 0) {
                throw new Error(ERROR_MESSAGES.INVALID_LENGTH);
            }
            return createIndicatorWrapper(MovingAverageIndicator, _data, _length, _source);
        }
    };
}
/**
 * Pivot Indicator Factory
 *
 * Centralized factory for creating pivot point indicators.
 * Eliminates code duplication across standard, Camarilla, Woodie, and DeMark pivots.
 *
 * @example
 * ```typescript
 * const standardPivots = createPivotIndicator('Standard Pivots', calculatePivotPoints)
 * const camarillaPivots = createPivotIndicator('Camarilla Pivots', calculateCamarillaPivots)
 * ```
 */
export function createPivotIndicator(name, description, calculator) {
    class PivotIndicator extends BaseIndicator {
        constructor() {
            super(name, description, 'trend');
        }
        validateInput(data, _config) {
            if (Array.isArray(data)) {
                throw new Error(ERROR_MESSAGES.MISSING_OHLC);
            }
            validateIndicatorData(data);
        }
        calculate(data, config) {
            this.validateInput(data, config);
            const marketData = data;
            const { pp, r1, r2, r3, s1, s2, s3 } = calculator(marketData.high, marketData.low, marketData.close);
            return {
                values: pp,
                metadata: {
                    length: pp.length,
                    source: config?.source || 'close',
                    r1,
                    r2,
                    r3,
                    s1,
                    s2,
                    s3
                }
            };
        }
    }
    return PivotIndicator;
}
/**
 * Price Comparison Indicator Factory
 *
 * Centralized factory for creating price comparison indicators.
 * Eliminates code duplication across price ratio, differential, and comparison indicators.
 *
 * @example
 * ```typescript
 * const priceRatio = createPriceComparisonIndicator('Price Ratio', calculatePriceRatio)
 * const priceDiff = createPriceComparisonIndicator('Price Differential', calculatePriceDifferential)
 * ```
 */
export function createPriceComparisonIndicator(name, description, calculator) {
    class PriceComparisonIndicator extends BaseIndicator {
        constructor() {
            super(name, description, 'trend');
        }
        validateInput(_data, config) {
            const price1 = config?.['price1'];
            const price2 = config?.['price2'];
            validateArray(price1);
            validateArray(price2);
            if (price1.length !== price2.length) {
                throw new Error(ERROR_MESSAGES.ARRAY_LENGTH_MISMATCH);
            }
        }
        calculate(data, config) {
            this.validateInput(data, config);
            const price1 = config?.['price1'];
            const price2 = config?.['price2'];
            const basePrice = config?.['basePrice'] || 100;
            const result = calculator(price1, price2, basePrice);
            if (Array.isArray(result)) {
                return {
                    values: result,
                    metadata: {
                        length: result.length,
                        source: config?.source || 'comparison'
                    }
                };
            }
            else {
                return {
                    values: result.ratio,
                    metadata: {
                        length: result.ratio.length,
                        performance: result.performance,
                        correlation: result.correlation,
                        basePrice,
                        source: config?.source || 'comparison'
                    }
                };
            }
        }
    }
    return PriceComparisonIndicator;
}
/**
 * Oscillator Indicator Factory
 *
 * Centralized factory for creating oscillator indicators.
 * Eliminates code duplication across RSI, CCI, ROC, and other oscillators.
 *
 * @example
 * ```typescript
 * const rsi = createOscillatorIndicator('RSI', 'Relative Strength Index', calculateRSI, 14)
 * const cci = createOscillatorIndicator('CCI', 'Commodity Channel Index', calculateCCI, 20)
 * ```
 */
export function createOscillatorIndicator(name, description, calculator, defaultLength) {
    return createGenericIndicator(name, description, 'momentum', calculator, defaultLength);
}
/**
 * Generic Indicator Factory
 *
 * Centralized factory for creating indicators with custom categories.
 * Eliminates code duplication across different indicator types.
 */
function createGenericIndicator(name, description, category, calculator, defaultLength) {
    return class extends BaseIndicator {
        constructor() {
            super(name, description, category);
        }
        calculate(data, config) {
            this.validateInput(data, config);
            const source = pineSource(data, config?.source);
            const length = pineLength(config?.length || defaultLength, defaultLength);
            const values = typeof calculator === 'function' && calculator.length === 2
                ? calculator(source, length)
                : calculator(source, length);
            return {
                values,
                metadata: {
                    length,
                    source: config?.source || 'close'
                }
            };
        }
    };
}
/**
 * Volatility Indicator Factory
 *
 * Centralized factory for creating volatility indicators.
 * Eliminates code duplication across ATR, Bollinger Bands, and other volatility indicators.
 *
 * @example
 * ```typescript
 * const atr = createVolatilityIndicator('ATR', 'Average True Range', calculateATR, 14)
 * const std = createVolatilityIndicator('STD', 'Standard Deviation', calculateStd, 20)
 * ```
 */
export function createVolatilityIndicator(name, description, calculator, defaultLength) {
    return createGenericIndicator(name, description, 'volatility', calculator, defaultLength);
}
/**
 * Volume Indicator Factory
 *
 * Centralized factory for creating volume indicators.
 * Eliminates code duplication across OBV, MFI, CMF, and other volume indicators.
 *
 * @example
 * ```typescript
 * const obv = createVolumeIndicator('OBV', 'On Balance Volume', calculateOBV, 1)
 * const mfi = createVolumeIndicator('MFI', 'Money Flow Index', calculateMFI, 14)
 * ```
 */
export function createVolumeIndicator(name, description, calculator, defaultLength) {
    return class extends BaseIndicator {
        constructor() {
            super(name, description, 'volume');
        }
        validateInput(data, _config) {
            if (Array.isArray(data)) {
                throw new Error(ERROR_MESSAGES.MISSING_OHLCV);
            }
            if (!data.volume) {
                throw new Error(ERROR_MESSAGES.MISSING_VOLUME);
            }
        }
        calculate(data, config) {
            this.validateInput(data, config);
            const length = pineLength(config?.length || defaultLength, defaultLength);
            const values = calculator(data, length);
            return {
                values,
                metadata: {
                    length,
                    source: config?.source || 'close'
                }
            };
        }
    };
}
