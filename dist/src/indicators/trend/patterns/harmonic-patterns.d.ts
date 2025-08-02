import { BaseIndicator } from '@core/base/base-indicator';
import type { IndicatorConfig, IndicatorResult, MarketData } from '@core/types/indicator-types';
/**
 * Harmonic Pattern Types
 */
export type HarmonicPattern = 'bat' | 'butterfly' | 'crab' | 'cypher' | 'gartley' | 'shark' | 'none';
/**
 * Harmonic Pattern Detection Result
 */
export interface HarmonicPatternResult {
    pattern: HarmonicPattern;
    confidence: number;
    levels: {
        xab: number;
        abc: number;
        bcd: number;
        xad: number;
    };
}
/**
 * Harmonic Patterns Indicator
 *
 * Detects harmonic patterns in price action using Fibonacci ratios.
 * Identifies Bat, Butterfly, Crab, Cypher, Gartley, and Shark patterns.
 *
 * @example
 * ```typescript
 * const patterns = harmonicPatterns(data, 20)
 * console.log(patterns.pattern) // Detected pattern type
 * console.log(patterns.confidence) // Pattern confidence score
 * ```
 */
export declare class HarmonicPatternsIndicator extends BaseIndicator {
    constructor();
    validateInput(data: MarketData | number[], _config?: IndicatorConfig): void;
    calculate(data: MarketData | number[], config?: IndicatorConfig): IndicatorResult;
    private detectHarmonicPattern;
    private findSwingPoints;
    private calculateFibonacciRatios;
    private checkBatPattern;
    private checkButterflyPattern;
    private checkCrabPattern;
    private checkCypherPattern;
    private checkGartleyPattern;
    private checkSharkPattern;
}
/**
 * Calculate Harmonic Patterns using wrapper function
 *
 * @param data - Market data with OHLC
 * @param length - Lookback period (default: 20)
 * @returns Harmonic pattern detection results
 */
export declare function harmonicPatterns(data: MarketData, length?: number): {
    patterns: HarmonicPattern[];
    confidences: number[];
    levels: {
        xab: number[];
        abc: number[];
        bcd: number[];
        xad: number[];
    };
};
//# sourceMappingURL=harmonic-patterns.d.ts.map