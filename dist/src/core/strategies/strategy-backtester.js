"use strict";
// TODO: Refactor strategy backtester to work with new StrategyBuilder architecture
// This file needs significant updates to work with the new static utility approach
/*
import type { MarketData } from '@core/types/indicator-types'

import { StrategyBuilder } from './strategy-builder'

export interface BacktestResult {
  totalTrades: number
  winningTrades: number
  losingTrades: number
  winRate: number
  totalReturn: number
  maxDrawdown: number
  sharpeRatio: number
  profitFactor: number
  averageTrade: number
  trades: Trade[]
  equity: number[]
  timestamps: number[]
}

export interface Trade {
  entryTime: number
  exitTime: number
  entryPrice: number
  exitPrice: number
  type: 'buy' | 'sell'
  profit: number
  profitPercent: number
  signal: string
}

export interface BacktestConfig {
  initialCapital: number
  positionSize: number
  stopLoss?: number
  takeProfit?: number
  commission?: number
  slippage?: number
}

export class StrategyBacktester {
  backtest(
    strategy: any,
    data: MarketData,
    config: BacktestConfig
  ): BacktestResult {
    // TODO: Implement with new StrategyBuilder
    throw new Error('Strategy backtester needs refactoring for new architecture')
  }
}

export function backtestStrategy(
  strategy: any,
  data: MarketData,
  config: BacktestConfig
): BacktestResult {
  const backtester = new StrategyBacktester()
  return backtester.backtest(strategy, data, config)
}
*/
