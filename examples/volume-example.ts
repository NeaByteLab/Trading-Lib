import { ta } from '../src/api/ta'
import { getComprehensiveTestData, loadConditionalData } from '../tests/utils/data-loader'

/**
 * Volume Indicators Example
 *
 * Demonstrates all volume indicators and their signals
 * Uses comprehensive data and large periods for thorough testing
 */
export function volumeExample() {
  console.log('📈 Trading-Lib Volume Indicators Example')
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

  // 1. OBV (ON BALANCE VOLUME)
  console.log('\n📊 OBV (ON BALANCE VOLUME):')
  const obv = ta.obv(data)
  const currentOBV = obv[obv.length - 1]
  const obvChange = obv[obv.length - 1] - obv[obv.length - 2]

  console.log(`📊 OBV: ${currentOBV?.toFixed(0)}`)
  console.log(`📊 OBV Change: ${obvChange?.toFixed(0)}`)

  // OBV signals
  const obvIncreasing = obvChange > 0
  const obvDecreasing = obvChange < 0
  const obvStrong = Math.abs(obvChange) > Math.abs(currentOBV) * 0.1
  console.log(`🟢 OBV Increasing: ${obvIncreasing}`)
  console.log(`🔴 OBV Decreasing: ${obvDecreasing}`)
  console.log(`💪 OBV Strong Move: ${obvStrong}`)

  // 2. CMF (CHAIKIN MONEY FLOW)
  console.log('\n📊 CMF (CHAIKIN MONEY FLOW):')
  const cmf20 = ta.cmf(data, 20)
  const cmf50 = ta.cmf(data, 50)
  const currentCMF20 = cmf20[cmf20.length - 1]
  const currentCMF50 = cmf50[cmf50.length - 1]

  console.log(`📊 CMF(20): ${currentCMF20?.toFixed(4)}`)
  console.log(`📊 CMF(50): ${currentCMF50?.toFixed(4)}`)

  // CMF signals
  const cmfBullish = currentCMF20 > 0.25
  const cmfBearish = currentCMF20 < -0.25
  const cmfNeutral = currentCMF20 >= -0.25 && currentCMF20 <= 0.25
  console.log(`🟢 CMF Bullish: ${cmfBullish}`)
  console.log(`🔴 CMF Bearish: ${cmfBearish}`)
  console.log(`⚪ CMF Neutral: ${cmfNeutral}`)

  // 3. MFI (MONEY FLOW INDEX)
  console.log('\n📊 MFI (MONEY FLOW INDEX):')
  const mfi14 = ta.mfi(data, 14)
  const mfi21 = ta.mfi(data, 21)
  const currentMFI14 = mfi14[mfi14.length - 1]
  const currentMFI21 = mfi21[mfi21.length - 1]

  console.log(`📊 MFI(14): ${currentMFI14?.toFixed(2)}`)
  console.log(`📊 MFI(21): ${currentMFI21?.toFixed(2)}`)

  // MFI signals
  const mfiOverbought = currentMFI14 > 80
  const mfiOversold = currentMFI14 < 20
  const mfiBullish = currentMFI14 > 50
  const mfiBearish = currentMFI14 < 50
  console.log(`🔴 MFI Overbought: ${mfiOverbought}`)
  console.log(`🟢 MFI Oversold: ${mfiOversold}`)
  console.log(`🟢 MFI Bullish: ${mfiBullish}`)
  console.log(`🔴 MFI Bearish: ${mfiBearish}`)

  // 4. AD (ACCUMULATION DISTRIBUTION)
  console.log('\n📊 AD (ACCUMULATION DISTRIBUTION):')
  const ad = ta.ad(data)
  const currentAD = ad[ad.length - 1]
  const adChange = ad[ad.length - 1] - ad[ad.length - 2]

  console.log(`📊 AD: ${currentAD?.toFixed(0)}`)
  console.log(`📊 AD Change: ${adChange?.toFixed(0)}`)

  // AD signals
  const adIncreasing = adChange > 0
  const adDecreasing = adChange < 0
  const adStrong = Math.abs(adChange) > Math.abs(currentAD) * 0.05
  console.log(`🟢 AD Increasing: ${adIncreasing}`)
  console.log(`🔴 AD Decreasing: ${adDecreasing}`)
  console.log(`💪 AD Strong Move: ${adStrong}`)

  // 5. VWAP (VOLUME WEIGHTED AVERAGE PRICE)
  console.log('\n📊 VWAP (VOLUME WEIGHTED AVERAGE PRICE):')
  const vwap20 = ta.vwap(data, 20)
  const vwap50 = ta.vwap(data, 50)
  const currentVWAP20 = vwap20[vwap20.length - 1]
  const currentVWAP50 = vwap50[vwap50.length - 1]

  console.log(`📊 VWAP(20): $${currentVWAP20?.toFixed(2)}`)
  console.log(`📊 VWAP(50): $${currentVWAP50?.toFixed(2)}`)

  // VWAP signals with safe division
  const priceAboveVWAP20 = currentPrice > currentVWAP20
  const priceBelowVWAP20 = currentPrice < currentVWAP20
  const priceNearVWAP20 = currentVWAP20 && isFinite(currentVWAP20) ? Math.abs(currentPrice - currentVWAP20) / currentVWAP20 < 0.01 : false
  console.log(`🟢 Price Above VWAP(20): ${priceAboveVWAP20}`)
  console.log(`🔴 Price Below VWAP(20): ${priceBelowVWAP20}`)
  console.log(`📊 Price Near VWAP(20): ${priceNearVWAP20}`)

  // 6. AMIHUD ILLIQUIDITY
  console.log('\n📊 AMIHUD ILLIQUIDITY:')
  const amihud20 = ta.amihud(data, 20)
  const amihud50 = ta.amihud(data, 50)
  const currentAmihud20 = amihud20[amihud20.length - 1]
  const currentAmihud50 = amihud50[amihud50.length - 1]

  console.log(`📊 Amihud(20): ${currentAmihud20?.toFixed(6)}`)
  console.log(`📊 Amihud(50): ${currentAmihud50?.toFixed(6)}`)

  // Amihud signals
  const amihudHigh = currentAmihud20 > 0.001
  const amihudLow = currentAmihud20 < 0.0001
  console.log(`🔴 Amihud High (Illiquid): ${amihudHigh}`)
  console.log(`🟢 Amihud Low (Liquid): ${amihudLow}`)

  // 7. PVT (PRICE VOLUME TREND)
  console.log('\n📊 PVT (PRICE VOLUME TREND):')
  const pvt = ta.pvt(data)
  const currentPVT = pvt[pvt.length - 1]
  const pvtChange = pvt[pvt.length - 1] - pvt[pvt.length - 2]

  console.log(`📊 PVT: ${currentPVT?.toFixed(0)}`)
  console.log(`📊 PVT Change: ${pvtChange?.toFixed(0)}`)

  // PVT signals
  const pvtIncreasing = pvtChange > 0
  const pvtDecreasing = pvtChange < 0
  const pvtStrong = Math.abs(pvtChange) > Math.abs(currentPVT) * 0.1
  console.log(`🟢 PVT Increasing: ${pvtIncreasing}`)
  console.log(`🔴 PVT Decreasing: ${pvtDecreasing}`)
  console.log(`💪 PVT Strong Move: ${pvtStrong}`)

  // 8. PVI (POSITIVE VOLUME INDEX)
  console.log('\n📊 PVI (POSITIVE VOLUME INDEX):')
  const pvi = ta.pvi(data)
  const currentPVI = pvi[pvi.length - 1]
  const pviChange = pvi[pvi.length - 1] - pvi[pvi.length - 2]

  console.log(`📊 PVI: ${currentPVI?.toFixed(0)}`)
  console.log(`📊 PVI Change: ${pviChange?.toFixed(0)}`)

  // PVI signals
  const pviIncreasing = pviChange > 0
  const pviDecreasing = pviChange < 0
  const pviStrong = Math.abs(pviChange) > Math.abs(currentPVI) * 0.05
  console.log(`🟢 PVI Increasing: ${pviIncreasing}`)
  console.log(`🔴 PVI Decreasing: ${pviDecreasing}`)
  console.log(`💪 PVI Strong Move: ${pviStrong}`)

  // 9. TWIGGS MONEY FLOW
  console.log('\n📊 TWIGGS MONEY FLOW:')
  const twiggsMF = ta.twiggsMF(data, 21)
  const currentTwiggsMF = twiggsMF[twiggsMF.length - 1]

  console.log(`📊 Twiggs Money Flow: ${currentTwiggsMF?.toFixed(4)}`)

  // Twiggs Money Flow signals
  const twiggsMFBullish = currentTwiggsMF > 0.5
  const twiggsMFBearish = currentTwiggsMF < -0.5
  const twiggsMFNeutral = currentTwiggsMF >= -0.5 && currentTwiggsMF <= 0.5
  console.log(`🟢 Twiggs MF Bullish: ${twiggsMFBullish}`)
  console.log(`🔴 Twiggs MF Bearish: ${twiggsMFBearish}`)
  console.log(`⚪ Twiggs MF Neutral: ${twiggsMFNeutral}`)

  // 10. COMPREHENSIVE VOLUME ANALYSIS
  console.log('\n🎯 COMPREHENSIVE VOLUME ANALYSIS:')

  const volumeSignals = {
    obv: {
      increasing: obvIncreasing,
      decreasing: obvDecreasing,
      strong: obvStrong
    },
    cmf: {
      bullish: cmfBullish,
      bearish: cmfBearish,
      neutral: cmfNeutral
    },
    mfi: {
      overbought: mfiOverbought,
      oversold: mfiOversold,
      bullish: mfiBullish,
      bearish: mfiBearish
    },
    ad: {
      increasing: adIncreasing,
      decreasing: adDecreasing,
      strong: adStrong
    },
    vwap: {
      priceAbove: priceAboveVWAP20,
      priceBelow: priceBelowVWAP20,
      priceNear: priceNearVWAP20
    },
    amihud: {
      high: amihudHigh,
      low: amihudLow
    },
    pvt: {
      increasing: pvtIncreasing,
      decreasing: pvtDecreasing,
      strong: pvtStrong
    },
    pvi: {
      increasing: pviIncreasing,
      decreasing: pviDecreasing,
      strong: pviStrong
    },
    twiggsMF: {
      bullish: twiggsMFBullish,
      bearish: twiggsMFBearish,
      neutral: twiggsMFNeutral
    }
  }

  const bullishVolumeCount = Object.values(volumeSignals.obv).filter(Boolean).length +
    Object.values(volumeSignals.cmf).filter(Boolean).length +
    Object.values(volumeSignals.mfi).filter(Boolean).length +
    Object.values(volumeSignals.ad).filter(Boolean).length +
    Object.values(volumeSignals.vwap).filter(Boolean).length +
    Object.values(volumeSignals.pvt).filter(Boolean).length +
    Object.values(volumeSignals.pvi).filter(Boolean).length +
    Object.values(volumeSignals.twiggsMF).filter(Boolean).length

  const totalVolumeSignals = Object.values(volumeSignals).flat().length
  const bullishVolumePercentage = (bullishVolumeCount / totalVolumeSignals) * 100

  console.log(`📊 Bullish Volume Signals: ${bullishVolumeCount}/${totalVolumeSignals} (${bullishVolumePercentage.toFixed(1)}%)`)

  if (bullishVolumePercentage >= 70) {
    console.log('🟢 STRONG BULLISH VOLUME!')
  } else if (bullishVolumePercentage >= 50) {
    console.log('🟡 MODERATE BULLISH VOLUME')
  } else if (bullishVolumePercentage >= 30) {
    console.log('🔴 MODERATE BEARISH VOLUME')
  } else {
    console.log('🔴 STRONG BEARISH VOLUME!')
  }

  // 10. VOLUME-BASED TRADING SIGNALS
  console.log('\n🎯 VOLUME-BASED TRADING SIGNALS:')

    const volumeTradingSignals = {
    volumeConfirmation: obvIncreasing && cmfBullish,
    volumeDivergence: obvDecreasing && cmfBullish,
    strongMoneyFlow: cmfBullish && mfiBullish,
    weakMoneyFlow: cmfBearish && mfiBearish,
    accumulation: adIncreasing && pvtIncreasing,
    distribution: adDecreasing && pvtDecreasing,
    vwapSupport: priceNearVWAP20 && cmfBullish,
    vwapResistance: priceNearVWAP20 && cmfBearish,
    highLiquidity: amihudLow && obvStrong,
    lowLiquidity: amihudHigh && obvStrong,
    twiggsMFConfirmation: twiggsMFBullish && cmfBullish,
    twiggsMFDivergence: twiggsMFBearish && cmfBullish
  }

  console.log('📊 Volume Trading Signals:')
  Object.entries(volumeTradingSignals).forEach(([signal, value]) => {
    console.log(`  ${signal}: ${value}`)
  })

  // 11. VOLUME-PRICE DIVERGENCE ANALYSIS
  console.log('\n🎯 VOLUME-PRICE DIVERGENCE ANALYSIS:')

  const divergenceSignals = {
    // Bullish divergences
    bullishDivergence1: obvIncreasing && currentPrice < data.close[data.close.length - 2],
    bullishDivergence2: cmfBullish && mfiOversold,
    bullishDivergence3: adIncreasing && pvtIncreasing && currentPrice < data.close[data.close.length - 2],

    // Bearish divergences
    bearishDivergence1: obvDecreasing && currentPrice > data.close[data.close.length - 2],
    bearishDivergence2: cmfBearish && mfiOverbought,
    bearishDivergence3: adDecreasing && pvtDecreasing && currentPrice > data.close[data.close.length - 2]
  }

  const bullishDivergenceCount = Object.values(divergenceSignals).filter((signal, index) => index < 3 && signal).length
  const bearishDivergenceCount = Object.values(divergenceSignals).filter((signal, index) => index >= 3 && signal).length

  console.log(`🟢 Bullish Divergences: ${bullishDivergenceCount}`)
  console.log(`🔴 Bearish Divergences: ${bearishDivergenceCount}`)

  if (bullishDivergenceCount > bearishDivergenceCount) {
    console.log('🟢 BULLISH DIVERGENCE DETECTED!')
  } else if (bearishDivergenceCount > bullishDivergenceCount) {
    console.log('🔴 BEARISH DIVERGENCE DETECTED!')
  } else {
    console.log('⚪ NO CLEAR DIVERGENCE')
  }

  // 12. VOLUME-BASED RISK MANAGEMENT
  console.log('\n🛡️ VOLUME-BASED RISK MANAGEMENT:')

  const volumeRiskMetrics = {
    // Position sizing based on volume
    positionSize: obvStrong ? 1.0 : 0.5, // Full position if strong volume

    // Stop loss based on volume
    stopLoss: amihudHigh ? currentPrice * 0.95 : currentPrice * 0.97, // Tighter stops in illiquid conditions

    // Take profit based on volume
    takeProfit: obvStrong ? currentPrice * 1.08 : currentPrice * 1.05, // Higher targets with strong volume

    // Risk per trade adjusted for volume
    riskPerTrade: amihudHigh ? 0.01 : 0.02 // Lower risk in illiquid conditions
  }

  console.log('🛡️ Volume-Based Risk Management:')
  console.log(`  Position Size: ${(volumeRiskMetrics.positionSize * 100).toFixed(0)}%`)
  console.log(`  Stop Loss: $${volumeRiskMetrics.stopLoss.toFixed(2)}`)
  console.log(`  Take Profit: $${volumeRiskMetrics.takeProfit.toFixed(2)}`)
  console.log(`  Risk per Trade: ${(volumeRiskMetrics.riskPerTrade * 100).toFixed(1)}%`)

  return {
    price: currentPrice,
    obv: {
      value: currentOBV,
      change: obvChange
    },
    cmf: {
      cmf20: currentCMF20,
      cmf50: currentCMF50
    },
    mfi: {
      mfi14: currentMFI14,
      mfi21: currentMFI21
    },
    ad: {
      value: currentAD,
      change: adChange
    },
    vwap: {
      vwap20: currentVWAP20,
      vwap50: currentVWAP50
    },
    amihud: {
      amihud20: currentAmihud20,
      amihud50: currentAmihud50
    },
    pvt: {
      value: currentPVT,
      change: pvtChange
    },
    pvi: {
      value: currentPVI,
      change: pviChange
    },
    twiggsMF: {
      value: currentTwiggsMF
    },
    volumeSignals,
    volumeTradingSignals,
    divergenceSignals,
    volumeRiskMetrics,
    bullishVolumePercentage
  }
}

// Run the example
volumeExample()
