import { BaseIndicator } from '@base/base-indicator';
import type { IndicatorConfig } from '@core/types/indicator-types';
/**
 * Indicator Factory Configuration
 *
 * Defines the structure for registering indicators with the factory
 */
export interface IndicatorFactoryConfig {
    name: string;
    description: string;
    category: string;
    defaultLength: number;
    defaultMultiplier?: number;
    calculationFunction: (data: number[], config?: IndicatorConfig) => number[];
    multiResult?: boolean;
}
/**
 * Indicator Factory - Creates reusable indicator instances
 *
 * This approach reduces code duplication and provides consistent interfaces
 * using centralized utilities for all calculations.
 */
export declare class IndicatorFactory {
    private static indicators;
    /**
     * Register an indicator with the factory
     *
     * @param config - Indicator configuration
     */
    static registerIndicator(config: IndicatorFactoryConfig): void;
    /**
     * Create an indicator instance by name
     *
     * @param name - Indicator name
     * @returns Indicator instance or null if not found
     */
    static createIndicator(name: string): BaseIndicator | null;
    /**
     * Get list of available indicator names
     *
     * @returns Array of indicator names
     */
    static getAvailableIndicators(): string[];
}
/**
 * Create an indicator instance by name
 *
 * @param name - Indicator name
 * @returns Indicator instance or null if not found
 */
export declare function createIndicator(name: string): BaseIndicator | null;
/**
 * Get list of available indicator names
 *
 * @returns Array of indicator names
 */
export declare function getAvailableIndicators(): string[];
//# sourceMappingURL=indicator-factory.d.ts.map