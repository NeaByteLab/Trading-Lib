import { ta } from '../src/api/ta'
import { getComprehensiveTestData, loadConditionalData } from '../tests/utils/data-loader'

/**
 * Volatility Indicators Example
 *
 * Demonstrates all volatility indicators and their signals
 * Uses comprehensive data and large periods for thorough testing
 */
export function volatilityExample() {
  console.log('📊 Trading-Lib Volatility Indicators Example')
  console.log('==========================================\n')

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

  // 1. BOLLINGER BANDS
  console.log('\n📊 BOLLINGER BANDS:')
  const bbands = ta.bbands(data.close, 20, 2)
  const currentBBUpper = bbands.upper.length > 0 ? bbands.upper[bbands.upper.length - 1] : NaN
  const currentBBMiddle = bbands.middle.length > 0 ? bbands.middle[bbands.middle.length - 1] : NaN
  const currentBBLower = bbands.lower.length > 0 ? bbands.lower[bbands.lower.length - 1] : NaN

  console.log(`📊 Upper: $${currentBBUpper?.toFixed(2)}`)
  console.log(`📊 Middle: $${currentBBMiddle?.toFixed(2)}`)
  console.log(`📊 Lower: $${currentBBLower?.toFixed(2)}`)

  // Bollinger Bands statistics
  const bbStats = {
    validCount: [currentBBUpper, currentBBMiddle, currentBBLower].filter(val => !isNaN(val) && isFinite(val)).length,
    totalCount: 3,
    hasNaN: [currentBBUpper, currentBBMiddle, currentBBLower].some(val => isNaN(val) || !isFinite(val)),
    validPercentage: 0
  }
  bbStats.validPercentage = (bbStats.validCount / bbStats.totalCount) * 100

  if (bbStats.hasNaN) {
    console.log(`⚠️  BB has ${bbStats.totalCount - bbStats.validCount} NaN values (${bbStats.validPercentage.toFixed(1)}% valid)`)
  }

  // Bollinger Bands signals with safe division
  const bbSqueeze = currentBBMiddle && isFinite(currentBBMiddle) ? (currentBBUpper - currentBBLower) / currentBBMiddle < 0.1 : false
  const bbExpansion = currentBBMiddle && isFinite(currentBBMiddle) ? (currentBBUpper - currentBBLower) / currentBBMiddle > 0.3 : false
  const priceAboveUpper = currentPrice > currentBBUpper
  const priceBelowLower = currentPrice < currentBBLower
  const priceNearMiddle = currentBBMiddle && isFinite(currentBBMiddle) ? Math.abs(currentPrice - currentBBMiddle) / currentBBMiddle < 0.02 : false

  console.log(`🔴 BB Squeeze: ${bbSqueeze}`)
  console.log(`🟢 BB Expansion: ${bbExpansion}`)
  console.log(`🔴 Price Above Upper: ${priceAboveUpper}`)
  console.log(`🟢 Price Below Lower: ${priceBelowLower}`)
  console.log(`📊 Price Near Middle: ${priceNearMiddle}`)

  // 2. BOLLINGER BAND WIDTH
  console.log('\n📊 BOLLINGER BAND WIDTH:')
  const bbwidth = ta.bbwidth(data.close, 20, 2)
  const currentBBWidth = bbwidth.length > 0 ? bbwidth[bbwidth.length - 1] : NaN

  console.log(`📊 BB Width: ${currentBBWidth?.toFixed(4)}`)

  // BB Width signals
  const bbWidthLow = currentBBWidth < 0.1
  const bbWidthHigh = currentBBWidth > 0.3
  console.log(`🔴 BB Width Low: ${bbWidthLow}`)
  console.log(`🟢 BB Width High: ${bbWidthHigh}`)

  // 3. ATR (AVERAGE TRUE RANGE)
  console.log('\n📊 ATR (AVERAGE TRUE RANGE):')
  const atr14 = ta.atr(data, 14)
  const atr21 = ta.atr(data, 21)
  const currentATR14 = atr14.length > 0 ? atr14[atr14.length - 1] : NaN
  const currentATR21 = atr21.length > 0 ? atr21[atr21.length - 1] : NaN

  console.log(`📊 ATR(14): $${currentATR14?.toFixed(2)}`)
  console.log(`📊 ATR(21): $${currentATR21?.toFixed(2)}`)

  // ATR signals
  const atrHigh = currentATR14 > currentPrice * 0.05
  const atrLow = currentATR14 < currentPrice * 0.01
  console.log(`🟢 ATR High Volatility: ${atrHigh}`)
  console.log(`🔴 ATR Low Volatility: ${atrLow}`)

  // 4. STANDARD DEVIATION
  console.log('\n📊 STANDARD DEVIATION:')
  const std20 = ta.std(data.close, 20)
  const std50 = ta.std(data.close, 50)
  const currentSTD20 = std20.length > 0 ? std20[std20.length - 1] : NaN
  const currentSTD50 = std50.length > 0 ? std50[std50.length - 1] : NaN

  console.log(`📊 STD(20): ${currentSTD20?.toFixed(4)}`)
  console.log(`📊 STD(50): ${currentSTD50?.toFixed(4)}`)

  // Standard Deviation signals
  const stdHigh = currentSTD20 > currentPrice * 0.03
  const stdLow = currentSTD20 < currentPrice * 0.005
  console.log(`🟢 STD High: ${stdHigh}`)
  console.log(`🔴 STD Low: ${stdLow}`)

  // 5. KELTNER CHANNELS
  console.log('\n📊 KELTNER CHANNELS:')
  const keltner = ta.keltner(data, 20, 2)
  const currentKeltnerUpper = keltner.upper.length > 0 ? keltner.upper[keltner.upper.length - 1] : NaN
  const currentKeltnerMiddle = keltner.middle.length > 0 ? keltner.middle[keltner.middle.length - 1] : NaN
  const currentKeltnerLower = keltner.lower.length > 0 ? keltner.lower[keltner.lower.length - 1] : NaN

  console.log(`📊 Upper: $${currentKeltnerUpper?.toFixed(2)}`)
  console.log(`📊 Middle: $${currentKeltnerMiddle?.toFixed(2)}`)
  console.log(`📊 Lower: $${currentKeltnerLower?.toFixed(2)}`)

  // Keltner signals with safe division
  const keltnerSqueeze = currentKeltnerMiddle && isFinite(currentKeltnerMiddle) ? (currentKeltnerUpper - currentKeltnerLower) / currentKeltnerMiddle < 0.1 : false
  const priceAboveKeltnerUpper = currentPrice > currentKeltnerUpper
  const priceBelowKeltnerLower = currentPrice < currentKeltnerLower
  console.log(`🔴 Keltner Squeeze: ${keltnerSqueeze}`)
  console.log(`🔴 Price Above Upper: ${priceAboveKeltnerUpper}`)
  console.log(`🟢 Price Below Lower: ${priceBelowKeltnerLower}`)

  // 6. DONCHIAN CHANNELS
  console.log('\n📊 DONCHIAN CHANNELS:')
  const donchian = ta.donchian(data, 20)
  const currentDonchianUpper = donchian.upper.length > 0 ? donchian.upper[donchian.upper.length - 1] : NaN
  const currentDonchianMiddle = donchian.middle.length > 0 ? donchian.middle[donchian.middle.length - 1] : NaN
  const currentDonchianLower = donchian.lower.length > 0 ? donchian.lower[donchian.lower.length - 1] : NaN

  console.log(`📊 Upper: $${currentDonchianUpper?.toFixed(2)}`)
  console.log(`📊 Middle: $${currentDonchianMiddle?.toFixed(2)}`)
  console.log(`📊 Lower: $${currentDonchianLower?.toFixed(2)}`)

  // Donchian signals with safe division
  const priceNearDonchianUpper = currentDonchianUpper && isFinite(currentDonchianUpper) ? Math.abs(currentPrice - currentDonchianUpper) / currentDonchianUpper < 0.01 : false
  const priceNearDonchianLower = currentDonchianLower && isFinite(currentDonchianLower) ? Math.abs(currentPrice - currentDonchianLower) / currentDonchianLower < 0.01 : false
  console.log(`🔴 Near Upper: ${priceNearDonchianUpper}`)
  console.log(`🟢 Near Lower: ${priceNearDonchianLower}`)

  // 7. PRICE CHANNELS
  console.log('\n📊 PRICE CHANNELS:')
  const pchannels = ta.pchannels(data, 20)
  const currentPchannelsUpper = pchannels.upper.length > 0 ? pchannels.upper[pchannels.upper.length - 1] : NaN
  const currentPchannelsLower = pchannels.lower.length > 0 ? pchannels.lower[pchannels.lower.length - 1] : NaN

  console.log(`📊 Upper: $${currentPchannelsUpper?.toFixed(2)}`)
  console.log(`📊 Lower: $${currentPchannelsLower?.toFixed(2)}`)

  // Price Channels signals
  const priceNearUpper = currentPchannelsUpper && isFinite(currentPchannelsUpper) ? Math.abs(currentPrice - currentPchannelsUpper) / currentPchannelsUpper < 0.01 : false
  const priceNearLower = currentPchannelsLower && isFinite(currentPchannelsLower) ? Math.abs(currentPrice - currentPchannelsLower) / currentPchannelsLower < 0.01 : false
  console.log(`🔴 Near Upper: ${priceNearUpper}`)
  console.log(`🟢 Near Lower: ${priceNearLower}`)

  // 8. CHAIKIN VOLATILITY
  console.log('\n📊 CHAIKIN VOLATILITY:')
  const chaikinVol = ta.chaikinVol(data, 10)
  const currentChaikinVol = chaikinVol.length > 0 ? chaikinVol[chaikinVol.length - 1] : NaN

  console.log(`📊 Chaikin Volatility: ${currentChaikinVol?.toFixed(4)}`)

  // Chaikin Volatility signals
  const chaikinVolHigh = currentChaikinVol > 0.5
  const chaikinVolLow = currentChaikinVol < 0.1
  console.log(`🟢 Chaikin Vol High: ${chaikinVolHigh}`)
  console.log(`🔴 Chaikin Vol Low: ${chaikinVolLow}`)

  // 9. TWIGGS VOLATILITY
  console.log('\n📊 TWIGGS VOLATILITY:')
  const twiggsVol = ta.twiggsVol(data, 20, 10)
  const currentTwiggsVol = twiggsVol.length > 0 ? twiggsVol[twiggsVol.length - 1] : NaN

  console.log(`📊 Twiggs Volatility: ${currentTwiggsVol?.toFixed(4)}`)

  // Twiggs Volatility signals
  const twiggsVolHigh = currentTwiggsVol > 0.3
  const twiggsVolLow = currentTwiggsVol < 0.05
  console.log(`🟢 Twiggs Vol High: ${twiggsVolHigh}`)
  console.log(`🔴 Twiggs Vol Low: ${twiggsVolLow}`)

  // 10. COMPREHENSIVE VOLATILITY ANALYSIS
  console.log('\n🎯 COMPREHENSIVE VOLATILITY ANALYSIS:')

  const volatilitySignals = {
    bollingerBands: {
      squeeze: bbSqueeze,
      expansion: bbExpansion,
      priceAboveUpper,
      priceBelowLower,
      priceNearMiddle
    },
    keltnerChannels: {
      squeeze: keltnerSqueeze,
      priceAboveUpper: priceAboveKeltnerUpper,
      priceBelowLower: priceBelowKeltnerLower
    },
    donchianChannels: {
      priceNearUpper: priceNearDonchianUpper,
      priceNearLower: priceNearDonchianLower
    },
    atr: {
      high: atrHigh,
      low: atrLow
    },
    standardDeviation: {
      high: stdHigh,
      low: stdLow
    },
    chaikinVolatility: {
      high: chaikinVolHigh,
      low: chaikinVolLow
    },
    twiggsVolatility: {
      high: twiggsVolHigh,
      low: twiggsVolLow
    }
  }

  console.log('📊 Volatility Signal Summary:')
  Object.entries(volatilitySignals).forEach(([category, signals]) => {
    console.log(`  ${category}:`)
    Object.entries(signals).forEach(([signal, value]) => {
      console.log(`    ${signal}: ${value}`)
    })
  })

  // 11. VOLATILITY-BASED TRADING DECISIONS
  console.log('\n🎯 VOLATILITY-BASED TRADING DECISIONS:')

  const volatilityDecisions = {
    // High volatility scenarios
    highVolatility: atrHigh || stdHigh || chaikinVolHigh || twiggsVolHigh,
    
    // Low volatility scenarios
    lowVolatility: atrLow || stdLow || chaikinVolLow || twiggsVolLow,
    
    // Channel breakouts
    bollingerBreakout: priceAboveUpper || priceBelowLower,
    keltnerBreakout: priceAboveKeltnerUpper || priceBelowKeltnerLower,
    donchianBreakout: priceNearDonchianUpper || priceNearDonchianLower,
    
    // Squeeze scenarios
    bollingerSqueeze: bbSqueeze,
    keltnerSqueeze: keltnerSqueeze
  }

  console.log('📊 Volatility Trading Decisions:')
  Object.entries(volatilityDecisions).forEach(([decision, value]) => {
    console.log(`  ${decision}: ${value}`)
  })

  return {
    price: currentPrice,
    bollingerBands: {
      upper: currentBBUpper,
      middle: currentBBMiddle,
      lower: currentBBLower,
      width: currentBBWidth
    },
    atr: {
      atr14: currentATR14,
      atr21: currentATR21
    },
    standardDeviation: {
      std20: currentSTD20,
      std50: currentSTD50
    },
    keltnerChannels: {
      upper: currentKeltnerUpper,
      middle: currentKeltnerMiddle,
      lower: currentKeltnerLower
    },
    donchianChannels: {
      upper: currentDonchianUpper,
      middle: currentDonchianMiddle,
      lower: currentDonchianLower
    },
    chaikinVolatility: currentChaikinVol,
    twiggsVolatility: currentTwiggsVol,
    signals: volatilitySignals,
    decisions: volatilityDecisions
  }
}

// Run the example
volatilityExample()
