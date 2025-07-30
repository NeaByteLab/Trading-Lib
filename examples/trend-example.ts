import { ta } from '../src/api/ta'
import { getComprehensiveTestData, loadLargePeriodData, loadConditionalData } from '../tests/utils/data-loader'

/**
 * Trend Indicators Example
 *
 * Demonstrates all trend-following indicators and their signals
 * Uses comprehensive data and large periods for thorough testing
 */
export function trendExample() {
  console.log('📈 Trading-Lib Trend Indicators Example')
  console.log('=======================================\n')

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

  // 1. MOVING AVERAGES (Testing with large periods)
  console.log('\n📊 MOVING AVERAGES (Large Period Testing):')
  const sma20 = ta.sma(data.close, 20)
  const sma50 = ta.sma(data.close, 50)
  const sma200 = ta.sma(data.close, 200)
  const ema12 = ta.ema(data.close, 12)
  const ema26 = ta.ema(data.close, 26)
  const wma10 = ta.wma(data.close, 10)
  const wma50 = ta.wma(data.close, 50)
  const hull20 = ta.hull(data.close, 20)
  const hull50 = ta.hull(data.close, 50)
  const alma9 = ta.alma(data.close, 9, 6)
  const wilders14 = ta.wilders(data.close, 14)

  const currentSMA20 = sma20[sma20.length - 1]
  const currentSMA50 = sma50[sma50.length - 1]
  const currentSMA200 = sma200[sma200.length - 1]
  const currentEMA12 = ema12[ema12.length - 1]
  const currentEMA26 = ema26[ema26.length - 1]
  const currentWMA10 = wma10[wma10.length - 1]
  const currentWMA50 = wma50[wma50.length - 1]
  const currentHull20 = hull20[hull20.length - 1]
  const currentHull50 = hull50[hull50.length - 1]
  const currentALMA9 = alma9[alma9.length - 1]
  const currentWilders14 = wilders14[wilders14.length - 1]

  console.log(`📊 SMA(20): $${currentSMA20?.toFixed(2)}`)
  console.log(`📊 SMA(50): $${currentSMA50?.toFixed(2)}`)
  console.log(`📊 SMA(200): $${currentSMA200?.toFixed(2)}`)
  console.log(`📊 EMA(12): $${currentEMA12?.toFixed(2)}`)
  console.log(`📊 EMA(26): $${currentEMA26?.toFixed(2)}`)
  console.log(`📊 WMA(10): $${currentWMA10?.toFixed(2)}`)
  console.log(`📊 WMA(50): $${currentWMA50?.toFixed(2)}`)
  console.log(`📊 Hull(20): $${currentHull20?.toFixed(2)}`)
  console.log(`📊 Hull(50): $${currentHull50?.toFixed(2)}`)
  console.log(`📊 ALMA(9): $${currentALMA9?.toFixed(2)}`)
  console.log(`📊 Wilders(14): $${currentWilders14?.toFixed(2)}`)

  // Moving average signals
  const bullishSMA = currentPrice > currentSMA20
  const bullishEMA = currentPrice > currentEMA12
  const bullishWMA = currentPrice > currentWMA10
  const bullishHull = currentPrice > currentHull20
  const bullishALMA = currentPrice > currentALMA9
  const bullishWilders = currentPrice > currentWilders14

  console.log(`🟢 SMA Bullish: ${bullishSMA}`)
  console.log(`🟢 EMA Bullish: ${bullishEMA}`)
  console.log(`🟢 WMA Bullish: ${bullishWMA}`)
  console.log(`🟢 Hull Bullish: ${bullishHull}`)
  console.log(`🟢 ALMA Bullish: ${bullishALMA}`)
  console.log(`🟢 Wilders Bullish: ${bullishWilders}`)

  // 2. ICHIMOKU CLOUD
  console.log('\n☁️ ICHIMOKU CLOUD:')
  const ichimoku = ta.ichimoku(data, 9, 26, 52, 26)
  const currentTenkan = ichimoku.tenkan[ichimoku.tenkan.length - 1]
  const currentKijun = ichimoku.kijun[ichimoku.kijun.length - 1]
  const currentSenkouA = ichimoku.senkouA[ichimoku.senkouA.length - 1]
  const currentSenkouB = ichimoku.senkouB[ichimoku.senkouB.length - 1]
  const currentChikou = ichimoku.chikou[ichimoku.chikou.length - 1]

  console.log(`📊 Tenkan: $${currentTenkan?.toFixed(2)}`)
  console.log(`📊 Kijun: $${currentKijun?.toFixed(2)}`)
  console.log(`📊 Senkou A: $${currentSenkouA?.toFixed(2)}`)
  console.log(`📊 Senkou B: $${currentSenkouB?.toFixed(2)}`)
  console.log(`📊 Chikou: $${currentChikou?.toFixed(2)}`)

  // Ichimoku signals
  const tenkanAboveKijun = currentTenkan > currentKijun
  const priceAboveCloud = currentPrice > Math.max(currentSenkouA, currentSenkouB)
  const priceBelowCloud = currentPrice < Math.min(currentSenkouA, currentSenkouB)
  const cloudBullish = currentSenkouA > currentSenkouB

  console.log(`🟢 Tenkan > Kijun: ${tenkanAboveKijun}`)
  console.log(`🟢 Price Above Cloud: ${priceAboveCloud}`)
  console.log(`🔴 Price Below Cloud: ${priceBelowCloud}`)
  console.log(`🟢 Cloud Bullish: ${cloudBullish}`)

  // 3. SUPERTREND
  console.log('\n🚀 SUPERTREND:')
  const supertrend = ta.supertrend(data, 10, 3)
  const currentSuperTrend = supertrend.superTrend[supertrend.superTrend.length - 1]
  const currentDirection = supertrend.direction[supertrend.direction.length - 1]

  console.log(`📊 SuperTrend: $${currentSuperTrend?.toFixed(2)}`)
  console.log(`📊 Direction: ${currentDirection === 1 ? 'Bullish' : 'Bearish'}`)

  // SuperTrend signals
  const superTrendBullish = currentDirection === 1
  const priceAboveSuperTrend = currentPrice > currentSuperTrend

  console.log(`🟢 SuperTrend Bullish: ${superTrendBullish}`)
  console.log(`🟢 Price Above SuperTrend: ${priceAboveSuperTrend}`)

  // 4. PARABOLIC SAR
  console.log('\n🎯 PARABOLIC SAR:')
  const psar = ta.psar(data, 0.02, 0.2)
  const currentPSAR = psar[psar.length - 1]

  console.log(`📊 PSAR: $${currentPSAR?.toFixed(2)}`)

  // PSAR signals
  const psarBullish = currentPrice > currentPSAR
  console.log(`🟢 PSAR Bullish: ${psarBullish}`)

  // 5. PIVOT POINTS
  console.log('\n📍 PIVOT POINTS:')
  const pivots = ta.pivots(data)
  const currentPP = pivots.pp[pivots.pp.length - 1]
  const currentR1 = pivots.r1[pivots.r1.length - 1]
  const currentR2 = pivots.r2[pivots.r2.length - 1]
  const currentS1 = pivots.s1[pivots.s1.length - 1]
  const currentS2 = pivots.s2[pivots.s2.length - 1]

  console.log(`📊 Pivot Point: $${currentPP?.toFixed(2)}`)
  console.log(`📊 Resistance 1: $${currentR1?.toFixed(2)}`)
  console.log(`📊 Resistance 2: $${currentR2?.toFixed(2)}`)
  console.log(`📊 Support 1: $${currentS1?.toFixed(2)}`)
  console.log(`📊 Support 2: $${currentS2?.toFixed(2)}`)

  // Pivot signals with safe division
  const nearPivot = currentPP && isFinite(currentPP) ? Math.abs(currentPrice - currentPP) / currentPP < 0.01 : false
  const nearResistance = currentR1 && isFinite(currentR1) ? Math.abs(currentPrice - currentR1) / currentR1 < 0.01 : false
  const nearSupport = currentS1 && isFinite(currentS1) ? Math.abs(currentPrice - currentS1) / currentS1 < 0.01 : false

  console.log(`📍 Near Pivot: ${nearPivot}`)
  console.log(`🔴 Near Resistance: ${nearResistance}`)
  console.log(`🟢 Near Support: ${nearSupport}`)

  // 6. WOODIE PIVOTS
  console.log('\n🌳 WOODIE PIVOTS:')
  const woodie = ta.woodie(data)
  const currentWoodiePP = woodie.pp[woodie.pp.length - 1]
  const currentWoodieR1 = woodie.r1[woodie.r1.length - 1]
  const currentWoodieS1 = woodie.s1[woodie.s1.length - 1]

  console.log(`📊 Woodie PP: $${currentWoodiePP?.toFixed(2)}`)
  console.log(`📊 Woodie R1: $${currentWoodieR1?.toFixed(2)}`)
  console.log(`📊 Woodie S1: $${currentWoodieS1?.toFixed(2)}`)

  // 7. PRICE ENVELOPES
  console.log('\n📦 PRICE ENVELOPES:')
  const penv = ta.penv(data.close, 20, 2.5)
  const currentPenvUpper = penv.upper[penv.upper.length - 1]
  const currentPenvMiddle = penv.middle[penv.middle.length - 1]
  const currentPenvLower = penv.lower[penv.lower.length - 1]

  console.log(`📊 Upper: $${currentPenvUpper?.toFixed(2)}`)
  console.log(`📊 Middle: $${currentPenvMiddle?.toFixed(2)}`)
  console.log(`📊 Lower: $${currentPenvLower?.toFixed(2)}`)

  // 8. PERCENTAGE BANDS
  console.log('\n📊 PERCENTAGE BANDS:')
  const pbands = ta.pbands(data.close, 20, 2.5)
  const currentPbandsUpper = pbands.upper[pbands.upper.length - 1]
  const currentPbandsMiddle = pbands.middle[pbands.middle.length - 1]
  const currentPbandsLower = pbands.lower[pbands.lower.length - 1]

  console.log(`📊 Upper: $${currentPbandsUpper?.toFixed(2)}`)
  console.log(`📊 Middle: $${currentPbandsMiddle?.toFixed(2)}`)
  console.log(`📊 Lower: $${currentPbandsLower?.toFixed(2)}`)

  // 9. PERCENTAGE TRAILING STOPS
  console.log('\n🎯 PERCENTAGE TRAILING STOPS:')
  const ptrail = ta.ptrail(data.close, 2.5)
  const currentPtrail = ptrail.trailingStop[ptrail.trailingStop.length - 1]

  console.log(`📊 Trailing Stop: $${currentPtrail?.toFixed(2)}`)

  // 10. ADVANCED MOVING AVERAGES
  console.log('\n📊 ADVANCED MOVING AVERAGES:')
  const dema20 = ta.dema(data.close, 20)
  const tema20 = ta.tema(data.close, 20)
  const t3_20 = ta.t3(data.close, 20)
  const trima20 = ta.trima(data.close, 20)
  const displaced20 = ta.displaced(data.close, 20, 5, 'sma')

  const currentDEMA20 = dema20[dema20.length - 1]
  const currentTEMA20 = tema20[tema20.length - 1]
  const currentT3_20 = t3_20[t3_20.length - 1]
  const currentTRIMA20 = trima20[trima20.length - 1]
  const currentDisplaced20 = displaced20[displaced20.length - 1]

  console.log(`📊 DEMA(20): $${currentDEMA20?.toFixed(2)}`)
  console.log(`📊 TEMA(20): $${currentTEMA20?.toFixed(2)}`)
  console.log(`📊 T3(20): $${currentT3_20?.toFixed(2)}`)
  console.log(`📊 TRIMA(20): $${currentTRIMA20?.toFixed(2)}`)
  console.log(`📊 Displaced(20): $${currentDisplaced20?.toFixed(2)}`)

  // Advanced MA signals
  const bullishDEMA = currentPrice > currentDEMA20
  const bullishTEMA = currentPrice > currentTEMA20
  const bullishT3 = currentPrice > currentT3_20
  const bullishTRIMA = currentPrice > currentTRIMA20
  const bullishDisplaced = currentPrice > currentDisplaced20

  // 11. PRICE LEVELS
  console.log('\n📊 PRICE LEVELS:')
  const typicalPrice = ta.typical(data)
  const currentTypicalPrice = typicalPrice[typicalPrice.length - 1]
  console.log(`📊 Typical Price: $${currentTypicalPrice?.toFixed(2)}`)

  // 10. COMPREHENSIVE TREND ANALYSIS
  console.log('\n🎯 COMPREHENSIVE TREND ANALYSIS:')

  const trendSignals = {
    movingAverages: {
      sma: bullishSMA,
      ema: bullishEMA,
      wma: bullishWMA,
      hull: bullishHull,
      alma: bullishALMA,
      wilders: bullishWilders
    },
    advancedMovingAverages: {
      dema: bullishDEMA,
      tema: bullishTEMA,
      t3: bullishT3,
      trima: bullishTRIMA,
      displaced: bullishDisplaced
    },
    ichimoku: {
      tenkanAboveKijun,
      priceAboveCloud,
      cloudBullish
    },
    supertrend: {
      bullish: superTrendBullish,
      priceAbove: priceAboveSuperTrend
    },
    psar: {
      bullish: psarBullish
    },
    pivots: {
      nearPivot,
      nearResistance,
      nearSupport
    }
  }

  const bullishCount = Object.values(trendSignals.movingAverages).filter(Boolean).length +
    Object.values(trendSignals.ichimoku).filter(Boolean).length +
    Object.values(trendSignals.supertrend).filter(Boolean).length +
    Object.values(trendSignals.psar).filter(Boolean).length

  const totalSignals = Object.values(trendSignals).flat().length
  const bullishPercentage = (bullishCount / totalSignals) * 100

  console.log(`🟢 Bullish Signals: ${bullishCount}/${totalSignals} (${bullishPercentage.toFixed(1)}%)`)

  if (bullishPercentage >= 70) {
    console.log('🟢 STRONG BULLISH TREND!')
  } else if (bullishPercentage >= 50) {
    console.log('🟡 MODERATE BULLISH TREND')
  } else if (bullishPercentage >= 30) {
    console.log('🔴 MODERATE BEARISH TREND')
  } else {
    console.log('🔴 STRONG BEARISH TREND!')
  }

  return {
    price: currentPrice,
    movingAverages: {
      sma20: currentSMA20,
      ema12: currentEMA12,
      wma10: currentWMA10,
      hull20: currentHull20,
      alma9: currentALMA9,
      wilders14: currentWilders14
    },
    ichimoku: {
      tenkan: currentTenkan,
      kijun: currentKijun,
      senkouA: currentSenkouA,
      senkouB: currentSenkouB,
      chikou: currentChikou
    },
    supertrend: {
      value: currentSuperTrend,
      direction: currentDirection
    },
    psar: currentPSAR,
    pivots: {
      pp: currentPP,
      r1: currentR1,
      s1: currentS1
    },
    bullishPercentage
  }
}

// Run the example
trendExample()
