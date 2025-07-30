import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Base class for oscillator indicators
 * Eliminates duplication in oscillator validation and processing patterns
 */
export declare abstract class OscillatorIndicator extends BaseIndicator {
    protected defaultLength: number;
    protected minLength: number;
    protected maxLength?: number;
    constructor(name: string, description: string, defaultLength?: number, minLength?: number, maxLength?: number);
    /**
     * Centralized oscillator validation
     * Eliminates duplication across all oscillator indicators
     */
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    /**
     * Abstract method for oscillator calculation
     * Each oscillator must implement its specific calculation logic
     */
    protected abstract calculateOscillator(data: number[], length: number): number[];
    /**
     * Standard oscillator calculation wrapper
     * Provides consistent processing for all oscillators
     */
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
//# sourceMappingURL=oscillator-indicator.d.ts.map