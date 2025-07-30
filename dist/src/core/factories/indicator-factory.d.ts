import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
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
export declare function createMovingAverageIndicator(name: string, description: string, type: 'sma' | 'ema' | 'wma' | 'hull', defaultLength: number): {
    class: {
        new (): {
            calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
            name: string;
            description: string;
            category: string;
            validateInput(_data: MarketData | number[], _config?: IndicatorConfig): void;
            getSourceData(data: MarketData, source?: string): number[];
        };
    };
    function: (_data: MarketData | number[], _length?: number, _source?: string) => number[];
};
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
export declare function createOscillatorIndicator(name: string, description: string, calculator: (data: number[], length: number) => number[], defaultLength: number): {
    new (): {
        calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
        name: string;
        description: string;
        category: string;
        validateInput(_data: MarketData | number[], _config?: IndicatorConfig): void;
        getSourceData(data: MarketData, source?: string): number[];
    };
};
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
export declare function createVolatilityIndicator(name: string, description: string, calculator: (_data: MarketData | number[], _length: number) => number[], defaultLength: number): {
    new (): {
        calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
        name: string;
        description: string;
        category: string;
        validateInput(_data: MarketData | number[], _config?: IndicatorConfig): void;
        getSourceData(data: MarketData, source?: string): number[];
    };
};
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
export declare function createVolumeIndicator(name: string, description: string, calculator: (_data: MarketData | number[], _length: number) => number[], defaultLength: number): {
    new (): {
        calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
        name: string;
        description: string;
        category: string;
        validateInput(_data: MarketData | number[], _config?: IndicatorConfig): void;
        getSourceData(data: MarketData, source?: string): number[];
    };
};
//# sourceMappingURL=indicator-factory.d.ts.map