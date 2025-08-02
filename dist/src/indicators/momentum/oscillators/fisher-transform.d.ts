import { OscillatorIndicator } from '@core/base/oscillator-indicator';
import type { MarketData } from '@core/types/indicator-types';
/**
 * Fisher Transform Indicator
 * Transforms price data to make it more Gaussian distributed for better signal detection
 */
export declare class FisherTransformIndicator extends OscillatorIndicator {
    constructor();
    protected calculateOscillator(data: number[], length: number): number[];
}
/**
 * Calculate Fisher Transform
 * @param data - Market data or price array
 * @param length - Period for calculation (default: 10)
 * @param source - Price source (default: 'close')
 * @returns Fisher Transform values
 */
export declare function fisherTransform(data: MarketData | number[], length?: number, source?: string): number[];
//# sourceMappingURL=fisher-transform.d.ts.map