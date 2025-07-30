import { BaseIndicator } from '@base/base-indicator';
import { movingAverage } from '@calculations/moving-averages';
import { ERROR_MESSAGES } from '@constants/indicator-constants';
import { createIndicatorWrapper } from '@utils/indicator-utils';
import { pineLength, pineSource } from '@utils/pine-script-utils';
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
