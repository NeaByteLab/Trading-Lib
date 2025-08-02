import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Create Moving Average Indicator Factory
 *
 * Factory function that creates moving average indicators with consistent behavior.
 * Supports SMA, EMA, WMA, and Hull moving average types.
 *
 * @param name - Indicator name
 * @param description - Indicator description
 * @param type - Moving average type ('sma' | 'ema' | 'wma' | 'hull')
 * @param defaultLength - Default calculation period
 * @returns Object with indicator class and function
 *
 * @example
 * ```typescript
 * const smaIndicator = createMovingAverageIndicator('SMA', 'Simple Moving Average', 'sma', 20)
 * const smaValues = smaIndicator.function(data, 20, 'close')
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
            validateLength(length: number, minLength: number, maxLength?: number): void;
            validateMultiplier(multiplier: number): void;
            getSourceData(data: MarketData, source?: string): number[];
        };
    };
    function: (_data: MarketData | number[], _length?: number, _source?: string) => number[];
};
/**
 * Create Pivot Indicator Factory
 *
 * Factory function that creates pivot point indicators with consistent behavior.
 * Supports standard, Camarilla, Woodie, and DeMark pivot calculations.
 *
 * @param name - Indicator name
 * @param description - Indicator description
 * @param calculator - Pivot calculation function
 * @returns Pivot indicator class
 *
 * @example
 * ```typescript
 * const standardPivots = createPivotIndicator('Standard Pivots', 'Standard Pivot Points', calculatePivotPoints)
 * const camarillaPivots = createPivotIndicator('Camarilla Pivots', 'Camarilla Pivot Points', calculateCamarillaPivots)
 * ```
 */
export declare function createPivotIndicator(name: string, description: string, calculator: (high: number[], low: number[], close: number[]) => {
    pp: number[];
    r1: number[];
    r2: number[];
    r3: number[];
    s1: number[];
    s2: number[];
    s3: number[];
}): {
    new (): {
        validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
        calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
        name: string;
        description: string;
        category: string;
        validateLength(length: number, minLength: number, maxLength?: number): void;
        validateMultiplier(multiplier: number): void;
        getSourceData(data: MarketData, source?: string): number[];
    };
};
/**
 * Create Price Comparison Indicator Factory
 *
 * Factory function that creates price comparison indicators.
 * Supports ratio, performance, and correlation calculations between price series.
 *
 * @param name - Indicator name
 * @param description - Indicator description
 * @param calculator - Price comparison calculation function
 * @returns Price comparison indicator class
 *
 * @example
 * ```typescript
 * const priceRatio = createPriceComparisonIndicator('Price Ratio', 'Price Ratio Indicator', calculatePriceRatio)
 * const result = priceRatio.calculate(data, { length: 20 })
 * ```
 */
export declare function createPriceComparisonIndicator(name: string, description: string, calculator: (price1: number[], price2: number[], basePrice?: number) => number[] | {
    ratio: number[];
    performance: number[];
    correlation: number;
}): {
    new (): {
        validateInput(_data: MarketData | number[], config?: IndicatorConfig): void;
        calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
        name: string;
        description: string;
        category: string;
        validateLength(length: number, minLength: number, maxLength?: number): void;
        validateMultiplier(multiplier: number): void;
        getSourceData(data: MarketData, source?: string): number[];
    };
};
/**
 * Create Oscillator Indicator Factory
 *
 * Factory function that creates oscillator indicators with consistent behavior.
 * Supports RSI, CCI, Williams %R, and other momentum oscillators.
 *
 * @param name - Indicator name
 * @param description - Indicator description
 * @param calculator - Oscillator calculation function
 * @param defaultLength - Default calculation period
 * @returns Oscillator indicator class
 *
 * @example
 * ```typescript
 * const rsiIndicator = createOscillatorIndicator('RSI', 'Relative Strength Index', calculateRSI, 14)
 * const rsiValues = rsiIndicator.calculate(data, { length: 14 })
 * ```
 */
export declare function createOscillatorIndicator(name: string, description: string, calculator: (data: number[], length: number) => number[], defaultLength: number): {
    new (): {
        calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
        name: string;
        description: string;
        category: string;
        validateInput(_data: MarketData | number[], _config?: IndicatorConfig): void;
        validateLength(length: number, minLength: number, maxLength?: number): void;
        validateMultiplier(multiplier: number): void;
        getSourceData(data: MarketData, source?: string): number[];
    };
};
/**
 * Create Volatility Indicator Factory
 *
 * Factory function that creates volatility indicators with consistent behavior.
 * Supports ATR, Bollinger Bands, Keltner Channels, and other volatility measures.
 *
 * @param name - Indicator name
 * @param description - Indicator description
 * @param calculator - Volatility calculation function
 * @param defaultLength - Default calculation period
 * @returns Volatility indicator class
 *
 * @example
 * ```typescript
 * const atrIndicator = createVolatilityIndicator('ATR', 'Average True Range', calculateATR, 14)
 * const atrValues = atrIndicator.calculate(data, { length: 14 })
 * ```
 */
export declare function createVolatilityIndicator(name: string, description: string, calculator: (_data: MarketData | number[], _length: number) => number[], defaultLength: number): {
    new (): {
        calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
        name: string;
        description: string;
        category: string;
        validateInput(_data: MarketData | number[], _config?: IndicatorConfig): void;
        validateLength(length: number, minLength: number, maxLength?: number): void;
        validateMultiplier(multiplier: number): void;
        getSourceData(data: MarketData, source?: string): number[];
    };
};
/**
 * Create Volume Indicator Factory
 *
 * Factory function that creates volume indicators with consistent behavior.
 * Supports OBV, MFI, VWAP, and other volume-based indicators.
 *
 * @param name - Indicator name
 * @param description - Indicator description
 * @param calculator - Volume calculation function
 * @param defaultLength - Default calculation period
 * @returns Volume indicator class
 *
 * @example
 * ```typescript
 * const obvIndicator = createVolumeIndicator('OBV', 'On Balance Volume', calculateOBV, 1)
 * const obvValues = obvIndicator.calculate(data, { length: 1 })
 * ```
 */
export declare function createVolumeIndicator(name: string, description: string, calculator: (_data: MarketData | number[], _length: number) => number[], defaultLength: number): {
    new (): {
        validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
        calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
        name: string;
        description: string;
        category: string;
        validateLength(length: number, minLength: number, maxLength?: number): void;
        validateMultiplier(multiplier: number): void;
        getSourceData(data: MarketData, source?: string): number[];
    };
};
//# sourceMappingURL=indicator-factory.d.ts.map