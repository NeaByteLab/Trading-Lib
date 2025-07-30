import fs from 'fs';
import path from 'path';
/**
 * Load test data from CSV file
 *
 * @returns Market data object
 */
export function loadTestData() {
    const csvPath = path.join(process.cwd(), 'tests/data/BTCUSDT_4H_2025.csv');
    if (!fs.existsSync(csvPath)) {
        throw new Error(`Test data file not found: ${csvPath}`);
    }
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.trim().split('\n');
    const marketData = {
        open: [],
        high: [],
        low: [],
        close: [],
        volume: []
    };
    // Skip header line
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length >= 6) {
            marketData.open.push(parseFloat(values[1] || '0'));
            marketData.high.push(parseFloat(values[2] || '0'));
            marketData.low.push(parseFloat(values[3] || '0'));
            marketData.close.push(parseFloat(values[4] || '0'));
            marketData.volume.push(parseFloat(values[5] || '0'));
        }
    }
    return marketData;
}
/**
 * Load test data subset
 *
 * @param offset - Starting offset
 * @param count - Number of records
 * @returns Test data subset
 */
export function loadTestDataSubset(offset, count) {
    const fullData = loadTestData();
    return {
        open: fullData.open.slice(offset, offset + count),
        high: fullData.high.slice(offset, offset + count),
        low: fullData.low.slice(offset, offset + count),
        close: fullData.close.slice(offset, offset + count),
        volume: fullData.volume?.slice(offset, offset + count) || []
    };
}
/**
 * Load trending data for testing
 *
 * @param count - Number of records
 * @returns Trending test data
 */
export function loadTrendingData(count) {
    const fullData = loadTestData();
    return {
        open: fullData.open.slice(0, count),
        high: fullData.high.slice(0, count),
        low: fullData.low.slice(0, count),
        close: fullData.close.slice(0, count),
        volume: fullData.volume?.slice(0, count) || []
    };
}
/**
 * Load volatile data for testing
 *
 * @param count - Number of records
 * @returns Volatile test data
 */
export function loadVolatileData(count) {
    const fullData = loadTestData();
    // Use data from a volatile period (around line 50-150)
    const startIndex = 50;
    return {
        open: fullData.open.slice(startIndex, startIndex + count),
        high: fullData.high.slice(startIndex, startIndex + count),
        low: fullData.low.slice(startIndex, startIndex + count),
        close: fullData.close.slice(startIndex, startIndex + count),
        volume: fullData.volume?.slice(startIndex, startIndex + count) || []
    };
}
/**
 * Load stable data for testing
 *
 * @param count - Number of records
 * @returns Stable test data
 */
export function loadStableData(count) {
    const fullData = loadTestData();
    // Use data from a stable period (around line 200-300)
    const startIndex = 200;
    return {
        open: fullData.open.slice(startIndex, startIndex + count),
        high: fullData.high.slice(startIndex, startIndex + count),
        low: fullData.low.slice(startIndex, startIndex + count),
        close: fullData.close.slice(startIndex, startIndex + count),
        volume: fullData.volume?.slice(startIndex, startIndex + count) || []
    };
}
/**
 * Load all available data for comprehensive testing
 *
 * @returns Complete market data
 */
export function loadAllData() {
    return loadTestData();
}
/**
 * Load data optimized for large period testing
 *
 * @param minPeriod - Minimum period to test (default: 200)
 * @returns Market data with enough points for large period testing
 */
export function loadLargePeriodData(minPeriod = 200) {
    const fullData = loadTestData();
    const requiredLength = minPeriod * 3;
    if (fullData.close.length < requiredLength) {
        console.warn(`⚠️ Available data (${fullData.close.length}) is less than recommended (${requiredLength}) for period ${minPeriod}`);
        return fullData;
    }
    return fullData;
}
/**
 * Load data for specific market conditions
 *
 * @param condition - Market condition type
 * @param count - Number of records (default: 500)
 * @returns Market data for specific condition
 */
export function loadConditionalData(condition, count = 500) {
    const fullData = loadTestData();
    switch (condition) {
        case 'bullish':
            // Use data from bullish period (around line 40-140)
            return loadTestDataSubset(40, Math.min(count, fullData.close.length - 40));
        case 'bearish':
            // Use data from bearish period (around line 150-250)
            return loadTestDataSubset(150, Math.min(count, fullData.close.length - 150));
        case 'sideways':
            // Use data from sideways period (around line 200-300)
            return loadTestDataSubset(200, Math.min(count, fullData.close.length - 200));
        case 'volatile':
            // Use data from volatile period (around line 50-150)
            return loadTestDataSubset(50, Math.min(count, fullData.close.length - 50));
        case 'stable':
            // Use data from stable period (around line 300-400)
            return loadTestDataSubset(300, Math.min(count, fullData.close.length - 300));
        default:
            return loadTestDataSubset(0, count);
    }
}
/**
 * Get a subset of test data for specific test scenarios
 *
 * @param count - Number of records to return
 * @param offset - Starting offset (default: 0)
 * @returns Sliced market data
 */
export function getTestDataSubset(count, offset = 0) {
    return loadTestDataSubset(offset, count);
}
/**
 * Get test data with specific characteristics
 *
 * @param type - Data type ('trending', 'sideways', 'volatile')
 * @param count - Number of records (default: 100)
 * @returns Market data with specified characteristics
 */
export function getTestDataByType(type, count = 100) {
    switch (type) {
        case 'trending':
            // Use data from a trending period (around line 40-140)
            return loadTestDataSubset(40, count);
        case 'sideways':
            // Use data from a sideways period (around line 200-300)
            return loadTestDataSubset(200, count);
        case 'volatile':
            // Use data from a volatile period (around line 50-150)
            return loadTestDataSubset(50, count);
        default:
            return loadTestDataSubset(0, count);
    }
}
/**
 * Get comprehensive test data for all examples
 *
 * @param useAllData - Whether to use all available data (default: true)
 * @returns Market data optimized for comprehensive testing
 */
export function getComprehensiveTestData(useAllData = true) {
    if (useAllData) {
        return loadAllData();
    }
    return loadLargePeriodData(200);
}
function isValidArray(arr, length) {
    return Array.isArray(arr) && arr.length === length;
}
function isValidValue(val) {
    return val !== undefined && !isNaN(val) && isFinite(val);
}
function isValidVolume(val) {
    return val === undefined || (!isNaN(val) && val >= 0);
}
export function validateTestData(data, length) {
    if (!data ||
        !isValidArray(data.open, length) ||
        !isValidArray(data.high, length) ||
        !isValidArray(data.low, length) ||
        !isValidArray(data.close, length)) {
        return false;
    }
    // Volume is optional, so don't require it
    if (data.volume && !isValidArray(data.volume, length)) {
        return false;
    }
    for (let i = 0; i < length; i++) {
        const open = data.open[i];
        const high = data.high[i];
        const low = data.low[i];
        const close = data.close[i];
        const volume = data.volume?.[i];
        if (!isValidValue(open) || !isValidValue(high) || !isValidValue(low) || !isValidValue(close)) {
            return false;
        }
        if (!isValidVolume(volume)) {
            return false;
        }
        // Basic OHLC validation
        if (high < low) {
            return false;
        }
        if (high < open || high < close) {
            return false;
        }
        if (low > open || low > close) {
            return false;
        }
    }
    return true;
}
