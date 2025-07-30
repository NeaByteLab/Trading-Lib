import fs from 'fs';
import path from 'path';
/**
 * Load test data from CSV file
 *
 * @returns Market data object
 */
export function loadTestData() {
    const csvPath = path.join(__dirname, '../../data/test-data.csv');
    if (!fs.existsSync(csvPath)) {
        // Return sample data if file doesn't exist
        return {
            open: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
            high: [15, 17, 19, 21, 23, 25, 27, 29, 31, 33],
            low: [8, 10, 12, 14, 16, 18, 20, 22, 24, 26],
            close: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
            volume: [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800]
        };
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
    return loadTestData();
}
/**
 * Load trending data for testing
 *
 * @param count - Number of records
 * @returns Trending test data
 */
export function loadTrendingData(count) {
    return loadTestData();
}
/**
 * Load volatile data for testing
 *
 * @param count - Number of records
 * @returns Volatile test data
 */
export function loadVolatileData(count) {
    return loadTestData();
}
/**
 * Load stable data for testing
 *
 * @param count - Number of records
 * @returns Stable test data
 */
export function loadStableData(count) {
    return loadTestData();
}
/**
 * Get a subset of test data for specific test scenarios
 *
 * @param count - Number of records to return
 * @param offset - Starting offset (default: 0)
 * @returns Sliced market data
 */
export function getTestDataSubset(count, offset = 0) {
    return loadTestData(offset, offset + count);
}
/**
 * Get test data with specific characteristics
 *
 * @param type - Data type ('trending', 'sideways', 'volatile')
 * @param count - Number of records (default: 100)
 * @returns Market data with specified characteristics
 */
export function getTestDataByType(type, count = 100) {
    const fullData = loadTestData();
    switch (type) {
        case 'trending':
            // Use data from a trending period (around line 40-140)
            return loadTestData(40, 40 + count);
        case 'sideways':
            // Use data from a sideways period (around line 200-300)
            return loadTestData(200, 200 + count);
        case 'volatile':
            // Use data from a volatile period (around line 50-150)
            return loadTestData(50, 50 + count);
        default:
            return loadTestData(0, count);
    }
}
/**
 * Validate test data integrity
 *
 * @param data - Market data to validate
 * @param length - Expected length
 * @returns Validation result
 */
export function validateTestData(data, length) {
    if (!data ||
        !data.open || !data.high || !data.low || !data.close ||
        data.open.length !== length ||
        data.high.length !== length ||
        data.low.length !== length ||
        data.close.length !== length ||
        (data.volume && data.volume.length !== length)) {
        return false;
    }
    for (let i = 0; i < length; i++) {
        const open = data.open[i];
        const high = data.high[i];
        const low = data.low[i];
        const close = data.close[i];
        const volume = data.volume?.[i];
        if (open === undefined || high === undefined || low === undefined || close === undefined) {
            return false;
        }
        if (isNaN(open) || isNaN(high) || isNaN(low) || isNaN(close) || (volume !== undefined && isNaN(volume))) {
            return false;
        }
        if (high < low) {
            return false;
        }
        if (high < open || high < close) {
            return false;
        }
        if (low > open || low > close) {
            return false;
        }
        if (volume !== undefined && volume <= 0) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=test-data-loader.js.map