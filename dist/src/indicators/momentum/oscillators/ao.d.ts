import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
declare const AwesomeOscillator_base: {
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
 * Awesome Oscillator indicator
 *
 * AO = Fast SMA - Slow SMA using median price (high + low) / 2
 *
 * @example
 * ```typescript
 * const ao = new AwesomeOscillator()
 * const result = ao.calculate(marketData, { fastLength: 5, slowLength: 34 })
 * console.log(result.values) // AO values
 * ```
 */
export declare class AwesomeOscillator extends AwesomeOscillator_base {
}
declare const AcceleratorOscillator_base: {
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
 * Accelerator Oscillator indicator
 *
 * AO = Fast SMA - Slow SMA using median price (high + low) / 2
 *
 * @example
 * ```typescript
 * const accel = new AcceleratorOscillator()
 * const result = accel.calculate(marketData, { fastLength: 5, slowLength: 34 })
 * console.log(result.values) // Accelerator values
 * ```
 */
export declare class AcceleratorOscillator extends AcceleratorOscillator_base {
}
/**
 * Calculate Awesome Oscillator values
 *
 * @param data - Market data with high, low arrays
 * @param fastLength - Fast SMA period (default: 5)
 * @param slowLength - Slow SMA period (default: 34)
 * @returns Awesome Oscillator values array
 */
export declare function awesomeOscillator(data: MarketData, fastLength?: number, slowLength?: number): number[];
/**
 * Calculate Accelerator Oscillator values
 *
 * @param data - Market data with high, low arrays
 * @param fastLength - Fast SMA period (default: 5)
 * @param slowLength - Slow SMA period (default: 34)
 * @returns Accelerator Oscillator values array
 */
export declare function acceleratorOscillator(data: MarketData, fastLength?: number, slowLength?: number): number[];
export {};
//# sourceMappingURL=ao.d.ts.map