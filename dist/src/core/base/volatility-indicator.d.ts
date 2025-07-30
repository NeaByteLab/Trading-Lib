import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Base class for volatility indicators
 * Eliminates duplication in volatility validation and processing patterns
 */
export declare abstract class VolatilityIndicator extends BaseIndicator {
    protected defaultLength: number;
    protected defaultMultiplier: number;
    protected minLength: number;
    protected maxLength?: number;
    constructor(name: string, description: string, defaultLength?: number, defaultMultiplier?: number, minLength?: number, maxLength?: number);
    /**
     * Centralized volatility validation
     * Eliminates duplication across all volatility indicators
     */
    validateInput(data: MarketData | number[], config?: IndicatorConfig): void;
    /**
     * Abstract method for volatility calculation
     * Each volatility indicator must implement its specific calculation logic
     */
    protected abstract calculateVolatility(data: number[], length: number, multiplier: number): number[];
    /**
     * Standard volatility calculation wrapper
     * Provides consistent processing for all volatility indicators
     */
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
}
//# sourceMappingURL=volatility-indicator.d.ts.map