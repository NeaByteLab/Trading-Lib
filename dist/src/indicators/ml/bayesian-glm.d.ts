import type { MarketData } from '@core/types/indicator-types';
/**
 * Bayesian GLM Signal Generator
 *
 * Uses Bayesian Generalized Linear Model to generate trading signals
 * based on price momentum and volatility features.
 *
 * @param data - Market data with OHLCV
 * @param lookback - Lookback period for feature calculation (default: 20)
 * @param threshold - Signal threshold (default: 0.5)
 * @returns Array of signal values (-1, 0, 1)
 * @throws {Error} If data is invalid or missing required fields
 *
 * @example
 * ```typescript
 * import { ta } from '@api/ta'
 *
 * const signals = ta.bayesianGlm(marketData, 20, 0.5)
 * ```
 */
export declare function bayesianGLM(data: MarketData, lookback?: number, threshold?: number): number[];
/**
 * Bayesian GLM Class Implementation
 */
export declare class BayesianGLMIndicator {
    private lookback;
    private threshold;
    constructor(lookback?: number, threshold?: number);
    /**
     * Calculate Bayesian GLM signals
     *
     * @param data - Market data
     * @returns Array of signal values
     */
    calculate(data: MarketData): number[];
}
//# sourceMappingURL=bayesian-glm.d.ts.map