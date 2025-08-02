import { BaseIndicator } from '@core/base/base-indicator';
import { validateMarketDataOnly } from '@core/utils/validation-utils';
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
export class HarmonicPatternsIndicator extends BaseIndicator {
    constructor() {
        super('HarmonicPatterns', 'Harmonic Pattern Detection', 'trend');
    }
    validateInput(data, _config) {
        validateMarketDataOnly(data);
    }
    calculate(data, config) {
        this.validateInput(data, config);
        const marketData = data;
        const lookback = config?.length || 20;
        const patterns = [];
        const confidences = [];
        const xabLevels = [];
        const abcLevels = [];
        const bcdLevels = [];
        const xadLevels = [];
        for (let i = lookback; i < marketData.close.length; i++) {
            const pattern = this.detectHarmonicPattern(marketData, i, lookback);
            patterns.push(pattern.pattern);
            confidences.push(pattern.confidence);
            xabLevels.push(pattern.levels.xab);
            abcLevels.push(pattern.levels.abc);
            bcdLevels.push(pattern.levels.bcd);
            xadLevels.push(pattern.levels.xad);
        }
        // Fill initial values with NaN
        const initialNaN = Array(lookback).fill(NaN);
        patterns.unshift(...initialNaN);
        confidences.unshift(...initialNaN);
        xabLevels.unshift(...initialNaN);
        abcLevels.unshift(...initialNaN);
        bcdLevels.unshift(...initialNaN);
        xadLevels.unshift(...initialNaN);
        return {
            // Use confidence as primary values
            values: confidences,
            metadata: {
                length: lookback,
                source: 'harmonic-patterns',
                patternTypes: patterns.join(','),
                xabLevels,
                abcLevels,
                bcdLevels,
                xadLevels
            }
        };
    }
    detectHarmonicPattern(data, currentIndex, lookback) {
        const highs = data.high.slice(currentIndex - lookback, currentIndex + 1);
        const lows = data.low.slice(currentIndex - lookback, currentIndex + 1);
        // Find swing highs and lows
        const swings = this.findSwingPoints(highs, lows);
        if (swings.length < 4) {
            return {
                pattern: 'none',
                confidence: 0,
                levels: { xab: 0, abc: 0, bcd: 0, xad: 0 }
            };
        }
        // Calculate Fibonacci ratios
        const ratios = this.calculateFibonacciRatios(swings);
        // Check for harmonic patterns
        const patterns = [
            this.checkBatPattern(ratios),
            this.checkButterflyPattern(ratios),
            this.checkCrabPattern(ratios),
            this.checkCypherPattern(ratios),
            this.checkGartleyPattern(ratios),
            this.checkSharkPattern(ratios)
        ];
        // Find best pattern
        return patterns.reduce((best, current) => current.confidence > best.confidence ? current : best);
    }
    findSwingPoints(highs, lows) {
        const swings = [];
        for (let i = 1; i < highs.length - 1; i++) {
            // Swing high
            if (highs[i] > highs[i - 1] && highs[i] > highs[i + 1]) {
                swings.push({ price: highs[i], type: 'high', index: i });
            }
            // Swing low
            if (lows[i] < lows[i - 1] && lows[i] < lows[i + 1]) {
                swings.push({ price: lows[i], type: 'low', index: i });
            }
        }
        return swings;
    }
    calculateFibonacciRatios(swings) {
        if (swings.length < 4) {
            return { xab: 0, abc: 0, bcd: 0, xad: 0 };
        }
        const x = swings[0].price;
        const a = swings[1].price;
        const b = swings[2].price;
        const c = swings[3].price;
        const d = swings[4]?.price || c;
        const xab = Math.abs((b - a) / (a - x));
        const abc = Math.abs((c - b) / (b - a));
        const bcd = Math.abs((d - c) / (c - b));
        const xad = Math.abs((d - a) / (a - x));
        return { xab, abc, bcd, xad };
    }
    checkBatPattern(ratios) {
        const tolerance = 0.1;
        const isBat = Math.abs(ratios.xab - 0.382) < tolerance &&
            Math.abs(ratios.abc - 0.382) < tolerance &&
            Math.abs(ratios.bcd - 2.618) < tolerance &&
            Math.abs(ratios.xad - 0.886) < tolerance;
        return {
            pattern: isBat ? 'bat' : 'none',
            confidence: isBat ? 0.8 : 0,
            levels: ratios
        };
    }
    checkButterflyPattern(ratios) {
        const tolerance = 0.1;
        const isButterfly = Math.abs(ratios.xab - 0.786) < tolerance &&
            Math.abs(ratios.abc - 0.382) < tolerance &&
            Math.abs(ratios.bcd - 1.618) < tolerance &&
            Math.abs(ratios.xad - 1.27) < tolerance;
        return {
            pattern: isButterfly ? 'butterfly' : 'none',
            confidence: isButterfly ? 0.8 : 0,
            levels: ratios
        };
    }
    checkCrabPattern(ratios) {
        const tolerance = 0.1;
        const isCrab = Math.abs(ratios.xab - 0.382) < tolerance &&
            Math.abs(ratios.abc - 0.886) < tolerance &&
            Math.abs(ratios.bcd - 3.618) < tolerance &&
            Math.abs(ratios.xad - 1.618) < tolerance;
        return {
            pattern: isCrab ? 'crab' : 'none',
            confidence: isCrab ? 0.8 : 0,
            levels: ratios
        };
    }
    checkCypherPattern(ratios) {
        const tolerance = 0.1;
        const isCypher = Math.abs(ratios.xab - 0.382) < tolerance &&
            Math.abs(ratios.abc - 1.13) < tolerance &&
            Math.abs(ratios.bcd - 1.414) < tolerance &&
            Math.abs(ratios.xad - 0.786) < tolerance;
        return {
            pattern: isCypher ? 'cypher' : 'none',
            confidence: isCypher ? 0.8 : 0,
            levels: ratios
        };
    }
    checkGartleyPattern(ratios) {
        const tolerance = 0.1;
        const isGartley = Math.abs(ratios.xab - 0.618) < tolerance &&
            Math.abs(ratios.abc - 0.382) < tolerance &&
            Math.abs(ratios.bcd - 1.272) < tolerance &&
            Math.abs(ratios.xad - 0.786) < tolerance;
        return {
            pattern: isGartley ? 'gartley' : 'none',
            confidence: isGartley ? 0.8 : 0,
            levels: ratios
        };
    }
    checkSharkPattern(ratios) {
        const tolerance = 0.1;
        const isShark = Math.abs(ratios.xab - 1.13) < tolerance &&
            Math.abs(ratios.abc - 1.618) < tolerance &&
            Math.abs(ratios.bcd - 1.13) < tolerance &&
            Math.abs(ratios.xad - 0.886) < tolerance;
        return {
            pattern: isShark ? 'shark' : 'none',
            confidence: isShark ? 0.8 : 0,
            levels: ratios
        };
    }
}
/**
 * Calculate Harmonic Patterns using wrapper function
 *
 * @param data - Market data with OHLC
 * @param length - Lookback period (default: 20)
 * @returns Harmonic pattern detection results
 */
export function harmonicPatterns(data, length) {
    const indicator = new HarmonicPatternsIndicator();
    const result = indicator.calculate(data, { length: length || 20 });
    return {
        patterns: result.metadata['patternTypes'].split(',').map(p => p),
        confidences: result.values,
        levels: {
            xab: result.metadata['xabLevels'],
            abc: result.metadata['abcLevels'],
            bcd: result.metadata['bcdLevels'],
            xad: result.metadata['xadLevels']
        }
    };
}
