import { bollingerBands, ema, macd, rsi, sma } from '../src/indicators'
import { loadTestData } from '../tests/utils/data-loader'

/**
 * Simple Trading-Lib Example
 *
 * Shows basic usage of the most popular indicators
 */
export function simpleExample() {
  console.log('🚀 Trading-Lib Simple Example')
  console.log('==============================\n')

  // Load real Bitcoin market data
  const data = loadTestData()
  console.log(`📊 Loaded ${data.close.length} data points`)
  console.log(`💰 Price range: $${Math.min(...data.close)} - $${Math.max(...data.close)}`)

  // Get current price
  const currentPrice = data.close[data.close.length - 1]
  console.log(`💰 Current Price: $${currentPrice?.toFixed(2)}`)

  // 1. Calculate Moving Averages
  console.log('\n📈 MOVING AVERAGES:')
  const sma20 = sma(data.close, 20)
  const ema12 = ema(data.close, 12)
  const currentSMA20 = sma20[sma20.length - 1]
  const currentEMA12 = ema12[ema12.length - 1]

  console.log(`📊 SMA(20): $${currentSMA20?.toFixed(2)}`)
  console.log(`📊 EMA(12): $${currentEMA12?.toFixed(2)}`)

  // Trend analysis
  const bullishTrend = currentPrice > currentSMA20
  console.log(`🟢 Bullish Trend: ${bullishTrend}`)

  // 2. Calculate RSI
  console.log('\n⚡ MOMENTUM:')
  const rsiValues = rsi(data.close, 14)
  const currentRSI = rsiValues[rsiValues.length - 1]
  console.log(`📊 RSI(14): ${currentRSI?.toFixed(2)}`)

  // RSI signals
  const oversold = currentRSI < 30
  const overbought = currentRSI > 70
  console.log(`🟢 Oversold (<30): ${oversold}`)
  console.log(`🔴 Overbought (>70): ${overbought}`)

  // 3. Calculate MACD
  const macdResult = macd(data.close, 12, 26, 9)
  const currentMACD = macdResult.macd[macdResult.macd.length - 1]
  const currentSignal = macdResult.signal[macdResult.signal.length - 1]
  const currentHistogram = macdResult.histogram[macdResult.histogram.length - 1]

  console.log(`📊 MACD: ${currentMACD?.toFixed(2)}`)
  console.log(`📊 MACD Signal: ${currentSignal?.toFixed(2)}`)
  console.log(`📊 MACD Histogram: ${currentHistogram?.toFixed(2)}`)

  // MACD signals
  const macdBullish = currentMACD > currentSignal
  console.log(`🟢 MACD Bullish: ${macdBullish}`)

  // 4. Calculate Bollinger Bands
  console.log('\n📏 VOLATILITY:')
  const bb = bollingerBands(data.close, 20, 2)
  const currentBBUpper = bb.upper[bb.upper.length - 1]
  const currentBBMiddle = bb.middle[bb.middle.length - 1]
  const currentBBLower = bb.lower[bb.lower.length - 1]

  console.log(`📊 BB Upper: $${currentBBUpper?.toFixed(2)}`)
  console.log(`📊 BB Middle: $${currentBBMiddle?.toFixed(2)}`)
  console.log(`📊 BB Lower: $${currentBBLower?.toFixed(2)}`)

  // Bollinger Bands signals
  const priceAboveBB = currentPrice > currentBBUpper
  const priceBelowBB = currentPrice < currentBBLower
  console.log(`🔴 Price Above BB: ${priceAboveBB}`)
  console.log(`🟢 Price Below BB: ${priceBelowBB}`)

  // 5. Generate Trading Signal
  console.log('\n🎯 TRADING SIGNAL:')
  const buyConditions = [
    bullishTrend,
    oversold,
    macdBullish,
    priceBelowBB
  ]

  const sellConditions = [
    !bullishTrend,
    overbought,
    !macdBullish,
    priceAboveBB
  ]

  const buyScore = buyConditions.filter(Boolean).length
  const sellScore = sellConditions.filter(Boolean).length

  console.log(`🟢 Buy Score: ${buyScore}/4`)
  console.log(`🔴 Sell Score: ${sellScore}/4`)

  if (buyScore >= 3) {
    console.log('🟢 BUY SIGNAL!')
  } else if (sellScore >= 3) {
    console.log('🔴 SELL SIGNAL!')
  } else {
    console.log('⚪ HOLD - No clear signal')
  }

  return {
    price: currentPrice,
    sma20: currentSMA20,
    ema12: currentEMA12,
    rsi: currentRSI,
    macd: currentMACD,
    bbUpper: currentBBUpper,
    bbLower: currentBBLower,
    buyScore,
    sellScore
  }
}

// Run the example
simpleExample()
