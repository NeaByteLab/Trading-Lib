import type { MarketData } from '@core/types/indicator-types';
/**
 * Load test data from CSV file
 *
 * @returns Market data object
 */
export declare function loadTestData(): MarketData;
/**
 * Load test data subset
 *
 * @param offset - Starting offset
 * @param count - Number of records
 * @returns Test data subset
 */
export declare function loadTestDataSubset(offset: number, count: number): MarketData;
/**
 * Load trending data for testing
 *
 * @param count - Number of records
 * @returns Trending test data
 */
export declare function loadTrendingData(count: number): MarketData;
/**
 * Load volatile data for testing
 *
 * @param count - Number of records
 * @returns Volatile test data
 */
export declare function loadVolatileData(count: number): MarketData;
/**
 * Load stable data for testing
 *
 * @param count - Number of records
 * @returns Stable test data
 */
export declare function loadStableData(count: number): MarketData;
/**
 * Load all available data for comprehensive testing
 *
 * @returns Complete market data
 */
export declare function loadAllData(): MarketData;
/**
 * Load data optimized for large period testing
 *
 * @param minPeriod - Minimum period to test (default: 200)
 * @returns Market data with enough points for large period testing
 */
export declare function loadLargePeriodData(minPeriod?: number): MarketData;
/**
 * Load data for specific market conditions
 *
 * @param condition - Market condition type
 * @param count - Number of records (default: 500)
 * @returns Market data for specific condition
 */
export declare function loadConditionalData(condition: 'bullish' | 'bearish' | 'sideways' | 'volatile' | 'stable', count?: number): MarketData;
/**
 * Get a subset of test data for specific test scenarios
 *
 * @param count - Number of records to return
 * @param offset - Starting offset (default: 0)
 * @returns Sliced market data
 */
export declare function getTestDataSubset(count: number, offset?: number): MarketData;
/**
 * Get test data with specific characteristics
 *
 * @param type - Data type ('trending', 'sideways', 'volatile')
 * @param count - Number of records (default: 100)
 * @returns Market data with specified characteristics
 */
export declare function getTestDataByType(type: 'trending' | 'sideways' | 'volatile', count?: number): MarketData;
/**
 * Get comprehensive test data for all examples
 *
 * @param useAllData - Whether to use all available data (default: true)
 * @returns Market data optimized for comprehensive testing
 */
export declare function getComprehensiveTestData(useAllData?: boolean): MarketData;
export declare function validateTestData(data: MarketData, length: number): boolean;
//# sourceMappingURL=data-loader.d.ts.map