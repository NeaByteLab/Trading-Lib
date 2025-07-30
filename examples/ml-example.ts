import { ta } from '../src/api/ta'
import { getComprehensiveTestData, loadConditionalData } from '../tests/utils/data-loader'

/**
 * Machine Learning Indicators Example
 *
 * Demonstrates ML-based indicators and advanced signal generation
 * Uses comprehensive data and large periods for thorough testing
 */
export function mlExample() {
  console.log('🤖 Trading-Lib Machine Learning Indicators Example')
  console.log('================================================\n')

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

  // 1. BAYESIAN GLM SIGNAL GENERATION
  console.log('\n🧠 BAYESIAN GLM SIGNAL GENERATION:')

  // Test different lookback periods and thresholds
  const bayesianConfigs = [
    { lookback: 10, threshold: 0.6, name: 'Conservative' },
    { lookback: 20, threshold: 0.5, name: 'Balanced' },
    { lookback: 30, threshold: 0.4, name: 'Aggressive' }
  ]

  const bayesianResults = bayesianConfigs.map(config => {
    const signals = ta.bayesianGlm(data, config.lookback, config.threshold)
    const currentSignal = signals[signals.length - 1]
    const recentSignals = signals.slice(-5)

    return {
      config,
      currentSignal,
      recentSignals,
      signalStrength: Math.abs(currentSignal),
      signalDirection: currentSignal > 0 ? 'BULLISH' : currentSignal < 0 ? 'BEARISH' : 'NEUTRAL'
    }
  })

  bayesianResults.forEach(result => {
    console.log(`\n📊 ${result.config.name} Strategy (${result.config.lookback}d, ${result.config.threshold}):`)
    console.log(`🎯 Current Signal: ${result.currentSignal} (${result.signalDirection})`)
    console.log(`💪 Signal Strength: ${result.signalStrength.toFixed(2)}`)
    console.log(`📈 Recent Signals: [${result.recentSignals.map(s => s).join(', ')}]`)
  })

  // 2. ML-BASED FEATURE ENGINEERING
  console.log('\n🔧 ML-BASED FEATURE ENGINEERING:')

  // Calculate technical features for ML with safe array access
  const features = {
    // Price-based features with bounds checking
    priceChange: data.close.length > 1 ? ta.change(currentPrice, data.close[data.close.length - 2]) : 0,
    priceMomentum: (() => {
      const momentum = ta.momentumUtil(data.close, 5)
      return momentum.length > 0 ? momentum[momentum.length - 1] : 0
    })(),
    priceROC: (() => {
      const roc = ta.rocUtil(data.close, 10)
      return roc.length > 0 ? roc[roc.length - 1] : 0
    })(),

    // Volatility features with safe array access
    atr: (() => {
      const atr = ta.atr(data, 14)
      return atr.length > 0 ? atr[atr.length - 1] : 0
    })(),
    bbWidth: (() => {
      const bbWidth = ta.bbwidth(data.close, 20, 2)
      return bbWidth.length > 0 ? bbWidth[bbWidth.length - 1] : 0
    })(),
    std: (() => {
      const std = ta.std(data.close, 20)
      return std.length > 0 ? std[std.length - 1] : 0
    })(),

    // Momentum features with safe array access
    rsi: (() => {
      const rsi = ta.rsi(data.close, 14)
      return rsi.length > 0 ? rsi[rsi.length - 1] : 0
    })(),
    macd: (() => {
      const macd = ta.macd(data.close, 12, 26, 9)
      return macd.macd.length > 0 ? macd.macd[macd.macd.length - 1] : 0
    })(),
    stoch: (() => {
      const stoch = ta.stochastic(data, 14, 3)
      return stoch.length > 0 ? stoch[stoch.length - 1] : 0
    })(),

    // Volume features with safe array access
    cmf: (() => {
      const cmf = ta.cmf(data, 20)
      return cmf.length > 0 ? cmf[cmf.length - 1] : 0
    })(),
    mfi: (() => {
      const mfi = ta.mfi(data, 14)
      return mfi.length > 0 ? mfi[mfi.length - 1] : 0
    })(),
    obv: (() => {
      const obv = ta.obv(data)
      return obv.length > 0 ? obv[obv.length - 1] : 0
    })()
  }

  console.log('📊 Technical Features:')
  Object.entries(features).forEach(([name, value]) => {
    console.log(`  ${name}: ${value?.toFixed(4) || 'N/A'}`)
  })

  // 3. ML SIGNAL COMBINATION
  console.log('\n🎯 ML SIGNAL COMBINATION:')

  // Combine multiple ML signals
  const mlSignals = {
    bayesianConservative: bayesianResults[0].currentSignal,
    bayesianBalanced: bayesianResults[1].currentSignal,
    bayesianAggressive: bayesianResults[2].currentSignal,

    // Feature-based signals
    rsiSignal: features.rsi < 30 ? 1 : features.rsi > 70 ? -1 : 0,
    macdSignal: features.macd > 0 ? 1 : -1,
    volumeSignal: isNaN(features.cmf) ? 0 : features.cmf > 0.25 ? 1 : features.cmf < -0.25 ? -1 : 0
  }

  console.log('🤖 ML Signal Analysis:')
  Object.entries(mlSignals).forEach(([name, signal]) => {
    const direction = signal > 0 ? 'BULLISH' : signal < 0 ? 'BEARISH' : 'NEUTRAL'
    console.log(`  ${name}: ${signal} (${direction})`)
  })

  // 4. ML CONFIDENCE SCORING
  console.log('\n📊 ML CONFIDENCE SCORING:')

  const confidenceScores = {
    // Bayesian confidence based on signal strength
    bayesianConfidence: Math.abs(bayesianResults[1].currentSignal),

    // Technical indicator agreement
    technicalAgreement: Object.values(mlSignals).filter(s => s > 0).length / Object.values(mlSignals).length,

    // Volume confirmation
    volumeConfirmation: isNaN(features.cmf) ? 0 : Math.abs(features.cmf),

    // Volatility adjustment
    volatilityAdjustment: features.atr ? (features.atr / currentPrice) * 100 : 0
  }

  console.log('📊 Confidence Metrics:')
  Object.entries(confidenceScores).forEach(([name, score]) => {
    console.log(`  ${name}: ${score.toFixed(4)}`)
  })

  // 5. ML-BASED TRADING DECISION
  console.log('\n🎯 ML-BASED TRADING DECISION:')

  const decisionFactors = {
    // Primary ML signal
    primarySignal: bayesianResults[1].currentSignal,
    primaryConfidence: confidenceScores.bayesianConfidence,

    // Technical confirmation
    technicalConfirmation: confidenceScores.technicalAgreement > 0.6,

    // Volume confirmation
    volumeConfirmation: confidenceScores.volumeConfirmation > 0.3,

    // Volatility consideration
    volatilitySuitable: confidenceScores.volatilityAdjustment > 1 && confidenceScores.volatilityAdjustment < 8
  }

  // Calculate overall decision score
  const decisionScore = (decisionFactors.primarySignal * decisionFactors.primaryConfidence) +
    (decisionFactors.technicalConfirmation ? 0.3 : -0.3) +
    (decisionFactors.volumeConfirmation ? 0.2 : -0.2) +
    (decisionFactors.volatilitySuitable ? 0.1 : -0.1)

  const decision = {
    score: decisionScore,
    action: decisionScore > 0.5 ? 'STRONG_BUY' :
      decisionScore > 0.2 ? 'BUY' :
        decisionScore < -0.5 ? 'STRONG_SELL' :
          decisionScore < -0.2 ? 'SELL' : 'HOLD',
    confidence: Math.abs(decisionScore)
  }

  console.log('🤖 ML Trading Decision:')
  console.log(`  Decision Score: ${decision.score.toFixed(3)}`)
  console.log(`  Action: ${decision.action}`)
  console.log(`  Confidence: ${(decision.confidence * 100).toFixed(1)}%`)

  // 6. ML PERFORMANCE METRICS
  console.log('\n📈 ML PERFORMANCE METRICS:')

  // Simulate recent performance
  const recentPerformance = {
    signalAccuracy: 0.68, // Simulated accuracy
    profitFactor: 1.45,   // Simulated profit factor
    maxDrawdown: 0.12,    // Simulated max drawdown
    sharpeRatio: 1.23     // Simulated Sharpe ratio
  }

  console.log('📊 Performance Metrics:')
  Object.entries(recentPerformance).forEach(([name, value]) => {
    console.log(`  ${name}: ${value.toFixed(3)}`)
  })

  // 7. ML RISK MANAGEMENT
  console.log('\n🛡️ ML RISK MANAGEMENT:')

  const riskMetrics = {
    // Position sizing based on confidence
    positionSize: Math.min(decision.confidence * 100, 25), // Max 25% position

    // Stop loss based on volatility
    stopLoss: features.atr ? currentPrice - (features.atr * 2) : currentPrice * 0.95,

    // Take profit based on signal strength
    takeProfit: features.atr ? currentPrice + (features.atr * 3) : currentPrice * 1.05,

    // Risk per trade
    riskPerTrade: 0.02 // 2% risk per trade
  }

  console.log('🛡️ Risk Management:')
  console.log(`  Position Size: ${riskMetrics.positionSize.toFixed(1)}%`)
  console.log(`  Stop Loss: $${riskMetrics.stopLoss.toFixed(2)}`)
  console.log(`  Take Profit: $${riskMetrics.takeProfit.toFixed(2)}`)
  console.log(`  Risk per Trade: ${(riskMetrics.riskPerTrade * 100).toFixed(1)}%`)

  // 8. COMPREHENSIVE ML ANALYSIS
  console.log('\n🎯 COMPREHENSIVE ML ANALYSIS:')

  const mlAnalysis = {
    signalQuality: decision.confidence > 0.7 ? 'HIGH' : decision.confidence > 0.4 ? 'MEDIUM' : 'LOW',
    marketCondition: confidenceScores.volatilityAdjustment > 5 ? 'HIGH_VOLATILITY' :
      confidenceScores.volatilityAdjustment < 2 ? 'LOW_VOLATILITY' : 'NORMAL',
    trendStrength: confidenceScores.technicalAgreement > 0.7 ? 'STRONG' :
      confidenceScores.technicalAgreement > 0.4 ? 'MODERATE' : 'WEAK'
  }

  console.log('🤖 ML Analysis Summary:')
  console.log(`  Signal Quality: ${mlAnalysis.signalQuality}`)
  console.log(`  Market Condition: ${mlAnalysis.marketCondition}`)
  console.log(`  Trend Strength: ${mlAnalysis.trendStrength}`)

  // Final recommendation
  console.log('\n🎯 FINAL ML RECOMMENDATION:')

  if (decision.action === 'STRONG_BUY' && decision.confidence > 0.7) {
    console.log('🟢 STRONG BUY SIGNAL - High confidence ML prediction')
  } else if (decision.action === 'BUY' && decision.confidence > 0.5) {
    console.log('🟡 BUY SIGNAL - Moderate confidence ML prediction')
  } else if (decision.action === 'STRONG_SELL' && decision.confidence > 0.7) {
    console.log('🔴 STRONG SELL SIGNAL - High confidence ML prediction')
  } else if (decision.action === 'SELL' && decision.confidence > 0.5) {
    console.log('🟡 SELL SIGNAL - Moderate confidence ML prediction')
  } else {
    console.log('⚪ HOLD - Low confidence or conflicting signals')
  }

  return {
    price: currentPrice,
    bayesianSignals: bayesianResults,
    features,
    mlSignals,
    confidenceScores,
    decision,
    performance: recentPerformance,
    riskMetrics,
    analysis: mlAnalysis
  }
}

// Run the example
mlExample()
