import { ta } from '../src/api/ta'
import { getComprehensiveTestData, loadConditionalData } from '../tests/utils/data-loader'

/**
 * Utilities Example
 *
 * Demonstrates all mathematical functions, array utilities, and calculation utilities
 * Uses comprehensive data and large periods for thorough testing
 */
export function utilitiesExample() {
  console.log('🔧 Trading-Lib Utilities Example')
  console.log('================================\n')

  // Load comprehensive Bitcoin market data for thorough testing
  const data = getComprehensiveTestData(true)
  
  // Validate loaded data
  if (!data || !data.close || data.close.length === 0) {
    throw new Error('Invalid or empty test data')
  }
  if (data.close.some(isNaN)) {
    console.warn('⚠️ NaN values detected in price data')
    data.close = data.close.map(price => isNaN(price) ? 0 : price)
  }
  console.log(`✅ Data validation passed: ${data.close.length} valid data points`)
  
  console.log(`📊 Loaded ${data.close.length} data points`)
  console.log(`💰 Price range: $${Math.min(...data.close)} - $${Math.max(...data.close)}`)

  const currentPrice = data.close[data.close.length - 1]
  console.log(`💰 Current Price: $${currentPrice?.toFixed(2)}`)

  // 1. MATHEMATICAL FUNCTIONS
  console.log('\n🧮 MATHEMATICAL FUNCTIONS:')
  
  const testValue = 123.456
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  
  // Basic math functions
  console.log(`📊 abs(${testValue}): ${ta.abs(testValue)}`)
  console.log(`📊 sqrt(${testValue}): ${ta.sqrt(testValue).toFixed(4)}`)
  console.log(`📊 pow(${testValue}, 2): ${ta.pow(testValue, 2).toFixed(2)}`)
  console.log(`📊 log(${testValue}): ${ta.log(testValue).toFixed(4)}`)
  console.log(`📊 log10(${testValue}): ${ta.log10(testValue).toFixed(4)}`)
  console.log(`📊 sin(${testValue}): ${ta.sin(testValue).toFixed(4)}`)
  console.log(`📊 cos(${testValue}): ${ta.cos(testValue).toFixed(4)}`)
  console.log(`📊 tan(${testValue}): ${ta.tan(testValue).toFixed(4)}`)
  console.log(`📊 floor(${testValue}): ${ta.floor(testValue)}`)
  console.log(`📊 ceil(${testValue}): ${ta.ceil(testValue)}`)
  console.log(`📊 sign(${testValue}): ${ta.sign(testValue)}`)
  console.log(`📊 exp(${testValue}): ${ta.exp(testValue).toFixed(2)}`)
  console.log(`📊 mod(${testValue}, 10): ${ta.mod(testValue, 10)}`)
  console.log(`📊 rem(${testValue}, 10): ${ta.rem(testValue, 10)}`)
  console.log(`📊 factorial(5): ${ta.factorial(5)}`)
  console.log(`📊 gcd(48, 18): ${ta.gcd(48, 18)}`)
  console.log(`📊 lcm(12, 18): ${ta.lcm(12, 18)}`)

  // 2. ARRAY UTILITIES
  console.log('\n📊 ARRAY UTILITIES:')
  
  console.log(`📊 sum([1,2,3,4,5]): ${ta.sum([1, 2, 3, 4, 5])}`)
  console.log(`📊 average([1,2,3,4,5]): ${ta.average([1, 2, 3, 4, 5])}`)
  console.log(`📊 min([1,2,3,4,5]): ${ta.min([1, 2, 3, 4, 5])}`)
  console.log(`📊 max([1,2,3,4,5]): ${ta.max([1, 2, 3, 4, 5])}`)
  console.log(`📊 highest([1,2,3,4,5], 3): ${ta.highest([1, 2, 3, 4, 5], 3)}`)
  console.log(`📊 lowest([1,2,3,4,5], 3): ${ta.lowest([1, 2, 3, 4, 5], 3)}`)
  console.log(`📊 change(100, 90): ${ta.change(100, 90)}`)
  console.log(`📊 clamp(150, 100, 200): ${ta.clamp(150, 100, 200)}`)
  console.log(`📊 round(123.456, 2): ${ta.round(123.456, 2)}`)

  // 3. PRICE CALCULATIONS
  console.log('\n💰 PRICE CALCULATIONS:')
  
  const sampleData = {
    open: [100, 102, 104, 103, 105],
    high: [102, 104, 106, 105, 107],
    low: [98, 100, 102, 101, 103],
    close: [101, 103, 105, 104, 106]
  }
  
  const hl2 = ta.hl2(sampleData)
  const hlc3 = ta.hlc3(sampleData)
  const ohlc4 = ta.ohlc4(sampleData)
  
  console.log(`📊 HL2 (High+Low)/2: ${hl2.map(v => v.toFixed(2)).join(', ')}`)
  console.log(`📊 HLC3 (High+Low+Close)/3: ${hlc3.map(v => v.toFixed(2)).join(', ')}`)
  console.log(`📊 OHLC4 (Open+High+Low+Close)/4: ${ohlc4.map(v => v.toFixed(2)).join(', ')}`)

  // 4. ARRAY PROCESSING
  console.log('\n🔄 ARRAY PROCESSING:')
  
  const testArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  
  // Process array with custom function
  const doubled = ta.processArray(testArray2, (value, index) => value * 2)
  console.log(`📊 processArray (double): [${doubled.join(', ')}]`)
  
  // Process window with custom function
  const windowSums = ta.processWindow(testArray2, 3, (window) => ta.sum(window))
  console.log(`📊 processWindow (sum of 3): [${windowSums.join(', ')}]`)
  
  // Rolling statistics
  const rollingMean = ta.rollingStatistic(testArray2, 3, 'mean')
  const rollingMax = ta.rollingStatistic(testArray2, 3, 'max')
  const rollingMin = ta.rollingStatistic(testArray2, 3, 'min')
  const rollingSum = ta.rollingStatistic(testArray2, 3, 'sum')
  
  console.log(`📊 Rolling Mean (3): [${rollingMean.map(v => v.toFixed(2)).join(', ')}]`)
  console.log(`📊 Rolling Max (3): [${rollingMax.join(', ')}]`)
  console.log(`📊 Rolling Min (3): [${rollingMin.join(', ')}]`)
  console.log(`📊 Rolling Sum (3): [${rollingSum.join(', ')}]`)

  // 5. ARRAY MANIPULATION
  console.log('\n📊 ARRAY MANIPULATION:')
  
  const shifted = ta.shift(testArray2, 2)
  const shiftedBack = ta.shift(testArray2, -2)
  
  console.log(`📊 Original: [${testArray2.join(', ')}]`)
  console.log(`📊 Shifted +2: [${shifted.join(', ')}]`)
  console.log(`📊 Shifted -2: [${shiftedBack.join(', ')}]`)
  
  // Get window slice
  const windowSlice = ta.getWindowSlice(testArray2, 5, 3)
  console.log(`📊 Window slice at index 5, size 3: [${windowSlice.join(', ')}]`)

  // 6. CALCULATION UTILITIES
  console.log('\n🧮 CALCULATION UTILITIES:')
  
  const testValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  
  console.log(`📊 Mean: ${ta.mean(testValues)}`)
  console.log(`📊 Variance: ${ta.variance(testValues).toFixed(2)}`)
  console.log(`📊 Standard Deviation: ${ta.stdev(testValues).toFixed(2)}`)
  
  // Rolling calculations
  const rollingMean2 = ta.rolling(testValues, 3, 'mean')
  const rollingMedian = ta.rolling(testValues, 3, 'median')
  const rollingMin2 = ta.rolling(testValues, 3, 'min')
  const rollingMax2 = ta.rolling(testValues, 3, 'max')
  const rollingSum2 = ta.rolling(testValues, 3, 'sum')
  
  console.log(`📊 Rolling Mean: [${rollingMean2.map(v => v.toFixed(2)).join(', ')}]`)
  console.log(`📊 Rolling Median: [${rollingMedian.map(v => v.toFixed(2)).join(', ')}]`)
  console.log(`📊 Rolling Min: [${rollingMin2.join(', ')}]`)
  console.log(`📊 Rolling Max: [${rollingMax2.join(', ')}]`)
  console.log(`📊 Rolling Sum: [${rollingSum2.join(', ')}]`)

  // 7. SMOOTHING FUNCTIONS
  console.log('\n📈 SMOOTHING FUNCTIONS:')
  
  const smoothingData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  
  const smoothed = ta.smoothing(smoothingData, 0.3)
  const wildersSmoothed = ta.wildersSmooth(smoothingData, 3)
  
  console.log(`📊 Original: [${smoothingData.join(', ')}]`)
  console.log(`📊 Exponential Smoothing (α=0.3): [${smoothed.map(v => v.toFixed(2)).join(', ')}]`)
  console.log(`📊 Wilders Smoothing (3): [${wildersSmoothed.map(v => v.toFixed(2)).join(', ')}]`)

  // 8. UTILITY FUNCTIONS
  console.log('\n🔧 UTILITY FUNCTIONS:')
  
  console.log(`📊 Safe Division (10/0): ${ta.div(10, 0)}`)
  console.log(`📊 Safe Division (10/2): ${ta.div(10, 2)}`)
  console.log(`📊 Percent Rank (5, 1, 10, 100): ${ta.percentrank(5, 1, 10, 100)}`)
  
  // High-Low range calculation
  const highData = [102, 104, 106, 105, 107]
  const lowData = [98, 100, 102, 101, 103]
  const highLowRange = ta.highlow(highData, lowData, 4, 3)
  console.log(`📊 High-Low Range: Highest=${highLowRange.highest}, Lowest=${highLowRange.lowest}`)

  // 9. ARRAY FILLING AND SHIFTING
  console.log('\n📊 ARRAY FILLING AND SHIFTING:')
  
  const dataWithNaN = [1, 2, NaN, 4, 5, NaN, 7, 8, 9, 10]
  const filled = ta.fill(dataWithNaN, 0)
  const shiftedArray = ta.shiftArray(dataWithNaN, 2)
  
  console.log(`📊 Original with NaN: [${dataWithNaN.map(v => isNaN(v) ? 'NaN' : v).join(', ')}]`)
  console.log(`📊 Filled with 0: [${filled.join(', ')}]`)
  console.log(`📊 Shifted +2: [${shiftedArray.map(v => isNaN(v) ? 'NaN' : v).join(', ')}]`)

  // 10. COMPREHENSIVE UTILITY ANALYSIS
  console.log('\n🎯 COMPREHENSIVE UTILITY ANALYSIS:')
  
  // Test all utilities with real price data
  const priceChanges = ta.changeArray(data.close)
  const priceMomentum = ta.momentumUtil(data.close, 5)
  const priceROC = ta.rocUtil(data.close, 10)
  
  const currentPriceChange = priceChanges[priceChanges.length - 1]
  const currentMomentum = priceMomentum[priceMomentum.length - 1]
  const currentROC = priceROC[priceROC.length - 1]
  
  console.log(`📊 Current Price Change: ${currentPriceChange?.toFixed(4)}`)
  console.log(`📊 Current Momentum: ${currentMomentum?.toFixed(4)}`)
  console.log(`📊 Current ROC: ${currentROC?.toFixed(4)}%`)
  
  // Statistical analysis with NaN filtering
  const validPrices = data.close.filter(price => !isNaN(price) && isFinite(price))
  if (validPrices.length === 0) {
    throw new Error('No valid price data for statistics')
  }
  
  const priceStats = {
    mean: ta.mean(validPrices),
    variance: ta.variance(validPrices),
    stdev: ta.stdev(validPrices),
    min: ta.min(validPrices),
    max: ta.max(validPrices)
  }
  
  console.log('📊 Price Statistics:')
  console.log(`  Mean: $${priceStats.mean.toFixed(2)}`)
  console.log(`  Variance: ${priceStats.variance.toFixed(2)}`)
  console.log(`  Standard Deviation: $${priceStats.stdev.toFixed(2)}`)
  console.log(`  Min: $${priceStats.min.toFixed(2)}`)
  console.log(`  Max: $${priceStats.max.toFixed(2)}`)

  // 11. UTILITY-BASED SIGNALS
  console.log('\n🎯 UTILITY-BASED SIGNALS:')
  
  const utilitySignals = {
    // Price momentum
    priceIncreasing: currentPriceChange > 0,
    strongMomentum: Math.abs(currentMomentum) > 100,
    highROC: Math.abs(currentROC) > 5,
    
    // Volatility
    highVolatility: priceStats.stdev > priceStats.mean * 0.05,
    lowVolatility: priceStats.stdev < priceStats.mean * 0.02,
    
    // Range
    wideRange: (priceStats.max - priceStats.min) / priceStats.mean > 0.3,
    narrowRange: (priceStats.max - priceStats.min) / priceStats.mean < 0.1
  }
  
  console.log('📊 Utility Signals:')
  Object.entries(utilitySignals).forEach(([name, value]) => {
    console.log(`  ${name}: ${value}`)
  })

  return {
    price: currentPrice,
    mathematicalFunctions: {
      abs: ta.abs(testValue),
      sqrt: ta.sqrt(testValue),
      pow: ta.pow(testValue, 2),
      log: ta.log(testValue),
      floor: ta.floor(testValue),
      ceil: ta.ceil(testValue)
    },
    arrayUtilities: {
      sum: ta.sum(testArray),
      average: ta.average(testArray),
      min: ta.min(testArray),
      max: ta.max(testArray)
    },
    priceCalculations: {
      hl2: hl2[hl2.length - 1],
      hlc3: hlc3[hlc3.length - 1],
      ohlc4: ohlc4[ohlc4.length - 1]
    },
    statistics: priceStats,
    signals: utilitySignals
  }
}

// Run the example
utilitiesExample() 