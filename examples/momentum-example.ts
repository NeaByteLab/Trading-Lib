import { ta } from '../src/api/ta'
import { getComprehensiveTestData, loadConditionalData } from '../tests/utils/data-loader'

/**
 * Momentum Indicators Example
 *
 * Demonstrates all momentum oscillators and directional indicators
 * Uses comprehensive data and large periods for thorough testing
 */
export function momentumExample() {
  console.log('⚡ Trading-Lib Momentum Indicators Example')
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

  // 1. RSI (RELATIVE STRENGTH INDEX) - Testing with large periods
  console.log('\n📊 RSI (RELATIVE STRENGTH INDEX) - Large Period Testing:')
  const rsi14 = ta.rsi(data.close, 14)
  const rsi21 = ta.rsi(data.close, 21)
  const rsi50 = ta.rsi(data.close, 50)
  const rsi100 = ta.rsi(data.close, 100)
  const currentRSI14 = rsi14.length > 0 ? rsi14[rsi14.length - 1] : NaN
  const currentRSI21 = rsi21.length > 0 ? rsi21[rsi21.length - 1] : NaN
  const currentRSI50 = rsi50.length > 0 ? rsi50[rsi50.length - 1] : NaN
  const currentRSI100 = rsi100.length > 0 ? rsi100[rsi100.length - 1] : NaN

  console.log(`📊 RSI(14): ${currentRSI14?.toFixed(2)}`)
  console.log(`📊 RSI(21): ${currentRSI21?.toFixed(2)}`)
  console.log(`📊 RSI(50): ${currentRSI50?.toFixed(2)}`)
  console.log(`📊 RSI(100): ${currentRSI100?.toFixed(2)}`)

  // RSI signals
  const rsi14Oversold = currentRSI14 < 30
  const rsi14Overbought = currentRSI14 > 70
  const rsi21Oversold = currentRSI21 < 30
  const rsi21Overbought = currentRSI21 > 70

  console.log(`🟢 RSI(14) Oversold: ${rsi14Oversold}`)
  console.log(`🔴 RSI(14) Overbought: ${rsi14Overbought}`)
  console.log(`🟢 RSI(21) Oversold: ${rsi21Oversold}`)
  console.log(`🔴 RSI(21) Overbought: ${rsi21Overbought}`)

  // 2. MACD (MOVING AVERAGE CONVERGENCE DIVERGENCE)
  console.log('\n📈 MACD (MOVING AVERAGE CONVERGENCE DIVERGENCE):')
  const macd = ta.macd(data.close, 12, 26, 9)
  const currentMACD = macd.macd.length > 0 ? macd.macd[macd.macd.length - 1] : NaN
  const currentSignal = macd.signal.length > 0 ? macd.signal[macd.signal.length - 1] : NaN
  const currentHistogram = macd.histogram.length > 0 ? macd.histogram[macd.histogram.length - 1] : NaN

  console.log(`📊 MACD: ${currentMACD?.toFixed(2)}`)
  console.log(`📊 Signal: ${currentSignal?.toFixed(2)}`)
  console.log(`📊 Histogram: ${currentHistogram?.toFixed(2)}`)

  // MACD signals
  const macdBullish = currentMACD > currentSignal
  const macdAboveZero = currentMACD > 0
  const histogramPositive = currentHistogram > 0

  console.log(`🟢 MACD Bullish: ${macdBullish}`)
  console.log(`🟢 MACD Above Zero: ${macdAboveZero}`)
  console.log(`🟢 Histogram Positive: ${histogramPositive}`)

  // 3. STOCHASTIC OSCILLATOR
  console.log('\n📊 STOCHASTIC OSCILLATOR:')
  const stochastic = ta.stochastic(data, 14, 3)
  const currentStochK = stochastic.length > 0 ? stochastic[stochastic.length - 1] : NaN

  console.log(`📊 %K: ${currentStochK?.toFixed(2)}`)

  // Stochastic signals
  const stochOversold = currentStochK < 20
  const stochOverbought = currentStochK > 80

  console.log(`🟢 Stochastic Oversold: ${stochOversold}`)
  console.log(`🔴 Stochastic Overbought: ${stochOverbought}`)

  // 4. STOCHASTIC RSI
  console.log('\n📊 STOCHASTIC RSI:')
  const stochRsi = ta.stochRsi(data.close, 14, 14, 3)
  const currentStochRSIK = stochRsi.k.length > 0 ? stochRsi.k[stochRsi.k.length - 1] : NaN
  const currentStochRSID = stochRsi.d.length > 0 ? stochRsi.d[stochRsi.d.length - 1] : NaN

  console.log(`📊 Stoch RSI %K: ${currentStochRSIK?.toFixed(2)}`)
  console.log(`📊 Stoch RSI %D: ${currentStochRSID?.toFixed(2)}`)

  // Stochastic RSI signals
  const stochRSIOversold = currentStochRSIK < 20
  const stochRSIOverbought = currentStochRSIK > 80
  const stochRSIBullish = currentStochRSIK > currentStochRSID

  console.log(`🟢 Stoch RSI Oversold: ${stochRSIOversold}`)
  console.log(`🔴 Stoch RSI Overbought: ${stochRSIOverbought}`)
  console.log(`🟢 Stoch RSI Bullish: ${stochRSIBullish}`)

  // 5. WILLIAMS %R
  console.log('\n📊 WILLIAMS %R:')
  const williamsR = ta.williamsR(data, 14)
  const currentWilliamsR = williamsR.length > 0 ? williamsR[williamsR.length - 1] : NaN

  console.log(`📊 Williams %R: ${currentWilliamsR?.toFixed(2)}`)

  // Williams %R signals
  const williamsROversold = currentWilliamsR < -80
  const williamsROverbought = currentWilliamsR > -20

  console.log(`🟢 Williams %R Oversold: ${williamsROversold}`)
  console.log(`🔴 Williams %R Overbought: ${williamsROverbought}`)

  // 6. CCI (COMMODITY CHANNEL INDEX)
  console.log('\n📊 CCI (COMMODITY CHANNEL INDEX):')
  const cci = ta.cci(data, 20)
  const currentCCI = cci.length > 0 ? cci[cci.length - 1] : NaN

  console.log(`📊 CCI: ${currentCCI?.toFixed(2)}`)

  // CCI signals
  const cciOversold = currentCCI < -100
  const cciOverbought = currentCCI > 100

  console.log(`🟢 CCI Oversold: ${cciOversold}`)
  console.log(`🔴 CCI Overbought: ${cciOverbought}`)

  // 7. MOMENTUM
  console.log('\n📊 MOMENTUM:')
  const momentum = ta.momentumUtil(data.close, 10)
  const currentMomentum = momentum.length > 0 ? momentum[momentum.length - 1] : NaN

  console.log(`📊 Momentum: ${currentMomentum?.toFixed(2)}`)

  // Momentum signals
  const momentumPositive = currentMomentum > 0
  console.log(`🟢 Momentum Positive: ${momentumPositive}`)

  // 8. ROC (RATE OF CHANGE)
  console.log('\n📊 ROC (RATE OF CHANGE):')
  const roc = ta.rocUtil(data.close, 10)
  const currentROC = roc.length > 0 ? roc[roc.length - 1] : NaN

  console.log(`📊 ROC: ${currentROC?.toFixed(2)}%`)

  // ROC signals
  const rocPositive = currentROC > 0
  console.log(`🟢 ROC Positive: ${rocPositive}`)

  // 9. AWESOME OSCILLATOR
  console.log('\n📊 AWESOME OSCILLATOR:')
  const ao = ta.ao(data, 5, 34)
  const currentAO = ao.length > 0 ? ao[ao.length - 1] : NaN

  console.log(`📊 AO: ${currentAO?.toFixed(2)}`)

  // AO signals
  const aoPositive = currentAO > 0
  console.log(`🟢 AO Positive: ${aoPositive}`)

  // 10. ACCELERATOR OSCILLATOR
  console.log('\n📊 ACCELERATOR OSCILLATOR:')
  const accel = ta.accel(data, 5, 34)
  const currentAccel = accel.length > 0 ? accel[accel.length - 1] : NaN

  console.log(`📊 Accelerator: ${currentAccel?.toFixed(2)}`)

  // Accelerator signals
  const accelPositive = currentAccel > 0
  console.log(`🟢 Accelerator Positive: ${accelPositive}`)

  // 11. APO (ABSOLUTE PRICE OSCILLATOR)
  console.log('\n📊 APO (ABSOLUTE PRICE OSCILLATOR):')
  const apo = ta.apo(data.close, 12, 26)
  const currentAPO = apo.length > 0 ? apo[apo.length - 1] : NaN

  console.log(`📊 APO: ${currentAPO?.toFixed(2)}`)

  // APO signals
  const apoPositive = currentAPO > 0
  console.log(`🟢 APO Positive: ${apoPositive}`)

  // 12. PPO (PERCENTAGE PRICE OSCILLATOR)
  console.log('\n📊 PPO (PERCENTAGE PRICE OSCILLATOR):')
  const ppoResult = ta.ppo(data.close, 12, 26, 9)
  const currentPPO = ppoResult.ppo.length > 0 ? ppoResult.ppo[ppoResult.ppo.length - 1] : NaN
  const currentPPOSignal = ppoResult.signal.length > 0 ? ppoResult.signal[ppoResult.signal.length - 1] : NaN
  const currentPPOHistogram = ppoResult.histogram.length > 0 ? ppoResult.histogram[ppoResult.histogram.length - 1] : NaN

  console.log(`📊 PPO: ${currentPPO?.toFixed(2)}%`)
  console.log(`📊 PPO Signal: ${currentPPOSignal?.toFixed(2)}%`)
  console.log(`📊 PPO Histogram: ${currentPPOHistogram?.toFixed(2)}%`)

  // PPO signals
  const ppoPositive = currentPPO > 0
  const ppoBullish = currentPPO > currentPPOSignal
  console.log(`🟢 PPO Positive: ${ppoPositive}`)
  console.log(`🟢 PPO Bullish: ${ppoBullish}`)

  // 13. AROON OSCILLATOR
  console.log('\n📊 AROON OSCILLATOR:')
  const aroon = ta.aroon(data, 14)
  const currentAroonUp = aroon.up.length > 0 ? aroon.up[aroon.up.length - 1] : NaN
  const currentAroonDown = aroon.down.length > 0 ? aroon.down[aroon.down.length - 1] : NaN

  console.log(`📊 Aroon Up: ${currentAroonUp?.toFixed(2)}`)
  console.log(`📊 Aroon Down: ${currentAroonDown?.toFixed(2)}`)

  // Aroon signals
  const aroonBullish = currentAroonUp > currentAroonDown
  const aroonStrongUp = currentAroonUp > 70
  const aroonStrongDown = currentAroonDown > 70

  console.log(`🟢 Aroon Bullish: ${aroonBullish}`)
  console.log(`🟢 Aroon Strong Up: ${aroonStrongUp}`)
  console.log(`🔴 Aroon Strong Down: ${aroonStrongDown}`)

  // 14. ADX (AVERAGE DIRECTIONAL INDEX)
  console.log('\n📊 ADX (AVERAGE DIRECTIONAL INDEX):')
  const adx = ta.adx(data, 14)
  const currentADX = adx.adx.length > 0 ? adx.adx[adx.adx.length - 1] : NaN
  const currentPlusDI = adx.plusDI.length > 0 ? adx.plusDI[adx.plusDI.length - 1] : NaN
  const currentMinusDI = adx.minusDI.length > 0 ? adx.minusDI[adx.minusDI.length - 1] : NaN

  console.log(`📊 ADX: ${currentADX?.toFixed(2)}`)
  console.log(`📊 +DI: ${currentPlusDI?.toFixed(2)}`)
  console.log(`📊 -DI: ${currentMinusDI?.toFixed(2)}`)

  // ADX signals
  const adxStrong = currentADX > 25
  const diBullish = currentPlusDI > currentMinusDI

  console.log(`🟢 ADX Strong Trend: ${adxStrong}`)
  console.log(`🟢 DI Bullish: ${diBullish}`)

  // 15. DMI (DIRECTIONAL MOVEMENT INDEX)
  console.log('\n📊 DMI (DIRECTIONAL MOVEMENT INDEX):')
  const dmi = ta.dmi(data, 14)
  const currentPlusDMI = dmi.plusDI.length > 0 ? dmi.plusDI[dmi.plusDI.length - 1] : NaN
  const currentMinusDMI = dmi.minusDI.length > 0 ? dmi.minusDI[dmi.minusDI.length - 1] : NaN

  console.log(`📊 +DI: ${currentPlusDMI?.toFixed(2)}`)
  console.log(`📊 -DI: ${currentMinusDMI?.toFixed(2)}`)

  // DMI signals
  const dmiBullish = currentPlusDMI > currentMinusDMI
  console.log(`🟢 DMI Bullish: ${dmiBullish}`)

  // 16. BALANCE OF POWER
  console.log('\n📊 BALANCE OF POWER:')
  const bop = ta.bop(data, 14)
  const currentBOP = bop.length > 0 ? bop[bop.length - 1] : NaN

  console.log(`📊 BOP: ${currentBOP?.toFixed(2)}`)

  // BOP signals
  const bopPositive = currentBOP > 0
  console.log(`🟢 BOP Positive: ${bopPositive}`)

  // 17. SHANNON ENTROPY
  console.log('\n📊 SHANNON ENTROPY:')
  const shannon = ta.shannon(data.close, 20, 8)
  const currentShannon = shannon.length > 0 ? shannon[shannon.length - 1] : NaN

  console.log(`📊 Shannon Entropy: ${currentShannon?.toFixed(2)}`)

  // 18. SAFEZONE
  console.log('\n📊 SAFEZONE:')
  const safezone = ta.safezone(data.close, 20, 2.0)
  const currentSafezoneUpper = safezone.upper.length > 0 ? safezone.upper[safezone.upper.length - 1] : NaN
  const currentSafezoneMiddle = safezone.middle.length > 0 ? safezone.middle[safezone.middle.length - 1] : NaN
  const currentSafezoneLower = safezone.lower.length > 0 ? safezone.lower[safezone.lower.length - 1] : NaN

  console.log(`📊 Upper: $${currentSafezoneUpper?.toFixed(2)}`)
  console.log(`📊 Middle: $${currentSafezoneMiddle?.toFixed(2)}`)
  console.log(`📊 Lower: $${currentSafezoneLower?.toFixed(2)}`)

  // 19. CHAIKIN OSCILLATOR
  console.log('\n📊 CHAIKIN OSCILLATOR:')
  const chaikin = ta.chaikin(data, 3, 10)
  const currentChaikin = chaikin.length > 0 ? chaikin[chaikin.length - 1] : NaN

  console.log(`📊 Chaikin: ${currentChaikin?.toFixed(2)}`)

  // Chaikin signals
  const chaikinPositive = currentChaikin > 0
  console.log(`🟢 Chaikin Positive: ${chaikinPositive}`)

  // 20. EASE OF MOVEMENT
  console.log('\n📊 EASE OF MOVEMENT:')
  const eom = ta.eom(data, 14)
  const currentEOM = eom.length > 0 ? eom[eom.length - 1] : NaN

  console.log(`📊 EOM: ${currentEOM?.toFixed(2)}`)

  // EOM signals
  const eomPositive = currentEOM > 0
  console.log(`🟢 EOM Positive: ${eomPositive}`)

  // 21. ELDER RAY INDEX
  console.log('\n📊 ELDER RAY INDEX:')
  const elderRay = ta.elderRay(data, 13)
  const currentBullPower = elderRay.bullPower.length > 0 ? elderRay.bullPower[elderRay.bullPower.length - 1] : NaN
  const currentBearPower = elderRay.bearPower.length > 0 ? elderRay.bearPower[elderRay.bearPower.length - 1] : NaN

  console.log(`📊 Bull Power: ${currentBullPower?.toFixed(2)}`)
  console.log(`📊 Bear Power: ${currentBearPower?.toFixed(2)}`)

  // Elder Ray signals
  const bullPowerPositive = currentBullPower > 0
  const bearPowerNegative = currentBearPower < 0
  console.log(`🟢 Bull Power Positive: ${bullPowerPositive}`)
  console.log(`🔴 Bear Power Negative: ${bearPowerNegative}`)

  // 22. CHOPPINESS INDEX
  console.log('\n📊 CHOPPINESS INDEX:')
  const choppiness = ta.choppiness(data, 14)
  const currentChoppiness = choppiness.length > 0 ? choppiness[choppiness.length - 1] : NaN

  console.log(`📊 Choppiness: ${currentChoppiness?.toFixed(2)}`)

  // Choppiness signals
  const choppy = currentChoppiness > 61.8
  const trending = currentChoppiness < 38.2
  console.log(`🔴 Choppy Market: ${choppy}`)
  console.log(`🟢 Trending Market: ${trending}`)

  // 23. CMO (CHANDE MOMENTUM OSCILLATOR)
  console.log('\n📊 CMO (CHANDE MOMENTUM OSCILLATOR):')
  const cmo = ta.cmo(data.close, 14)
  const currentCMO = cmo.length > 0 ? cmo[cmo.length - 1] : NaN

  console.log(`📊 CMO: ${currentCMO?.toFixed(2)}`)

  // CMO signals
  const cmoOversold = currentCMO < -50
  const cmoOverbought = currentCMO > 50
  console.log(`🟢 CMO Oversold: ${cmoOversold}`)
  console.log(`🔴 CMO Overbought: ${cmoOverbought}`)

  // 24. COPPOCK CURVE
  console.log('\n📊 COPPOCK CURVE:')
  const coppock = ta.coppock(data.close, 14, 11, 10)
  const currentCoppock = coppock.length > 0 ? coppock[coppock.length - 1] : NaN

  console.log(`📊 Coppock: ${currentCoppock?.toFixed(2)}`)

  // Coppock signals
  const coppockPositive = currentCoppock > 0
  console.log(`🟢 Coppock Positive: ${coppockPositive}`)

  // 25. DPO (DETRENDED PRICE OSCILLATOR)
  console.log('\n📊 DPO (DETRENDED PRICE OSCILLATOR):')
  const dpo = ta.dpo(data.close, 20)
  const currentDPO = dpo.length > 0 ? dpo[dpo.length - 1] : NaN

  console.log(`📊 DPO: ${currentDPO?.toFixed(2)}`)

  // DPO signals
  const dpoPositive = currentDPO > 0
  console.log(`🟢 DPO Positive: ${dpoPositive}`)

  // 26. MOVING AVERAGE OSCILLATOR
  console.log('\n📊 MOVING AVERAGE OSCILLATOR:')
  const mao = ta.mao(data.close, 10, 21, 'sma')
  const currentMAO = mao.length > 0 ? mao[mao.length - 1] : NaN

  console.log(`📊 MAO: ${currentMAO?.toFixed(2)}`)

  // MAO signals
  const maoPositive = currentMAO > 0
  console.log(`�� MAO Positive: ${maoPositive}`)

  // 27. MASS INDEX
  console.log('\n📊 MASS INDEX:')
  const massIndex = ta.massIndex(data, 9)
  const currentMassIndex = massIndex.length > 0 ? massIndex[massIndex.length - 1] : NaN

  console.log(`📊 Mass Index: ${currentMassIndex?.toFixed(2)}`)

  // Mass Index signals
  const massIndexHigh = currentMassIndex > 27
  console.log(`🔴 Mass Index High: ${massIndexHigh}`)

  // 28. TRIX
  console.log('\n📊 TRIX:')
  const trix = ta.trix(data.close, 18)
  const currentTRIX = trix.length > 0 ? trix[trix.length - 1] : NaN

  console.log(`📊 TRIX: ${currentTRIX?.toFixed(4)}`)

  // TRIX signals
  const trixPositive = currentTRIX > 0
  console.log(`🟢 TRIX Positive: ${trixPositive}`)

  // 29. TSI (TRUE STRENGTH INDEX)
  console.log('\n📊 TSI (TRUE STRENGTH INDEX):')
  const tsi = ta.tsi(data.close, 25, 13)
  const currentTSI = tsi.length > 0 ? tsi[tsi.length - 1] : NaN

  console.log(`📊 TSI: ${currentTSI?.toFixed(4)}`)

  // TSI signals
  const tsiPositive = currentTSI > 0
  console.log(`🟢 TSI Positive: ${tsiPositive}`)

  // 30. TWIGGS MOMENTUM
  console.log('\n📊 TWIGGS MOMENTUM:')
  const twiggs = ta.twiggs(data.close, 20, 10)
  const currentTwiggs = twiggs.length > 0 ? twiggs[twiggs.length - 1] : NaN

  console.log(`📊 Twiggs: ${currentTwiggs?.toFixed(2)}`)

  // Twiggs signals
  const twiggsPositive = currentTwiggs > 0
  console.log(`🟢 Twiggs Positive: ${twiggsPositive}`)

  // 31. COMPREHENSIVE MOMENTUM ANALYSIS
  console.log('\n🎯 COMPREHENSIVE MOMENTUM ANALYSIS:')

  const momentumSignals = {
    oscillators: {
      rsi14Oversold,
      rsi14Overbought,
      stochOversold,
      stochOverbought,
      williamsROversold,
      williamsROverbought,
      cciOversold,
      cciOverbought,
      stochRSIOversold,
      stochRSIOverbought,
      cmoOversold,
      cmoOverbought
    },
    macd: {
      bullish: macdBullish,
      aboveZero: macdAboveZero,
      histogramPositive
    },
    directional: {
      adxStrong,
      diBullish,
      dmiBullish,
      aroonBullish,
      aroonStrongUp
    },
    momentum: {
      momentumPositive,
      rocPositive,
      aoPositive,
      accelPositive,
      apoPositive,
      ppoPositive,
      bopPositive,
      chaikinPositive,
      eomPositive,
      bullPowerPositive,
      coppockPositive,
      dpoPositive,
      maoPositive,
      trixPositive,
      tsiPositive,
      twiggsPositive
    },
    market: {
      choppy,
      trending
    }
  }

  const bullishCount = Object.values(momentumSignals.oscillators).filter(Boolean).length +
    Object.values(momentumSignals.macd).filter(Boolean).length +
    Object.values(momentumSignals.directional).filter(Boolean).length +
    Object.values(momentumSignals.momentum).filter(Boolean).length +
    Object.values(momentumSignals.market).filter(Boolean).length

  const totalSignals = Object.values(momentumSignals).flat().length
  const bullishPercentage = (bullishCount / totalSignals) * 100

  console.log(`🟢 Bullish Signals: ${bullishCount}/${totalSignals} (${bullishPercentage.toFixed(1)}%)`)

  if (bullishPercentage >= 70) {
    console.log('🟢 STRONG BULLISH MOMENTUM!')
  } else if (bullishPercentage >= 50) {
    console.log('🟡 MODERATE BULLISH MOMENTUM')
  } else if (bullishPercentage >= 30) {
    console.log('🔴 MODERATE BEARISH MOMENTUM')
  } else {
    console.log('🔴 STRONG BEARISH MOMENTUM!')
  }

  // 32. MOMENTUM-BASED TRADING SIGNALS
  console.log('\n🎯 MOMENTUM-BASED TRADING SIGNALS:')

  const momentumTradingSignals = {
    // Strong momentum signals
    strongBullish: rsi14Oversold && macdBullish && aoPositive,
    strongBearish: rsi14Overbought && !macdBullish && !aoPositive,

    // Divergence signals
    bullishDivergence: rsi14Oversold && currentPrice > data.close[data.close.length - 2],
    bearishDivergence: rsi14Overbought && currentPrice < data.close[data.close.length - 2],

    // Trend confirmation
    trendConfirmation: adxStrong && diBullish && aroonBullish,
    trendReversal: !adxStrong && (rsi14Oversold || rsi14Overbought),

    // Momentum acceleration
    momentumAcceleration: aoPositive && accelPositive && ppoPositive,
    momentumDeceleration: !aoPositive && !accelPositive && !ppoPositive
  }

  console.log('📊 Momentum Trading Signals:')
  Object.entries(momentumTradingSignals).forEach(([signal, value]) => {
    console.log(`  ${signal}: ${value}`)
  })

  return {
    price: currentPrice,
    rsi: {
      rsi14: currentRSI14,
      rsi21: currentRSI21
    },
    macd: {
      macd: currentMACD,
      signal: currentSignal,
      histogram: currentHistogram
    },
    stochastic: {
      k: currentStochK
    },
    stochRsi: {
      k: currentStochRSIK,
      d: currentStochRSID
    },
    williamsR: currentWilliamsR,
    cci: currentCCI,
    momentum: currentMomentum,
    roc: currentROC,
    ao: currentAO,
    accel: currentAccel,
    apo: currentAPO,
    ppo: {
      ppo: currentPPO,
      signal: currentPPOSignal,
      histogram: currentPPOHistogram
    },
    aroon: {
      up: currentAroonUp,
      down: currentAroonDown
    },
    adx: {
      adx: currentADX,
      plusDI: currentPlusDI,
      minusDI: currentMinusDI
    },
    dmi: {
      plusDI: currentPlusDMI,
      minusDI: currentMinusDMI
    },
    bop: currentBOP,
    shannon: currentShannon,
    safezone: {
      upper: currentSafezoneUpper,
      middle: currentSafezoneMiddle,
      lower: currentSafezoneLower
    },
    chaikin: currentChaikin,
    eom: currentEOM,
    elderRay: {
      bullPower: currentBullPower,
      bearPower: currentBearPower
    },
    choppiness: currentChoppiness,
    cmo: currentCMO,
    coppock: currentCoppock,
    dpo: currentDPO,
    mao: currentMAO,
    massIndex: currentMassIndex,
    trix: currentTRIX,
    tsi: currentTSI,
    twiggs: currentTwiggs,
    momentumSignals,
    momentumTradingSignals,
    bullishPercentage
  }
}

// Run the example
momentumExample()
