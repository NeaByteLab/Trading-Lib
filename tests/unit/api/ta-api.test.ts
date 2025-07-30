import { ta } from '@api/ta'
import type { MarketData } from '@core/types/indicator-types'
import { beforeAll, describe, expect, it } from '@jest/globals'
import { loadTestData } from '@tests/utils/data-loader'

describe('TA API', () => {
  let testData: number[]
  let marketData: MarketData

  beforeAll(() => {
    testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    marketData = loadTestData()
  })

  describe('Math Functions', () => {
    it('should calculate absolute values', () => {
      expect(ta.abs(-5)).toBe(5)
      expect(ta.abs(10)).toBe(10)
      expect(ta.abs(-15)).toBe(15)
    })

    it('should calculate square root', () => {
      expect(ta.sqrt(4)).toBe(2)
      expect(ta.sqrt(9)).toBe(3)
      expect(ta.sqrt(16)).toBe(4)
    })

    it('should calculate power', () => {
      expect(ta.pow(2, 3)).toBe(8)
      expect(ta.pow(3, 2)).toBe(9)
      expect(ta.pow(4, 2)).toBe(16)
    })

    it('should calculate floor and ceiling', () => {
      expect(ta.floor(3.7)).toBe(3)
      expect(ta.ceil(3.2)).toBe(4)
      expect(ta.floor(-3.7)).toBe(-4)
      expect(ta.ceil(-3.2)).toBe(-3)
    })

    it('should calculate sign', () => {
      expect(ta.sign(-5)).toBe(-1)
      expect(ta.sign(0)).toBe(0)
      expect(ta.sign(5)).toBe(1)
    })

    it('should calculate exponential', () => {
      expect(ta.exp(0)).toBe(1)
      expect(ta.exp(1)).toBeCloseTo(Math.E, 5)
    })

    it('should calculate factorial', () => {
      expect(ta.factorial(0)).toBe(1)
      expect(ta.factorial(1)).toBe(1)
      expect(ta.factorial(5)).toBe(120)
    })

    it('should calculate GCD and LCM', () => {
      expect(ta.gcd(12, 18)).toBe(6)
      expect(ta.lcm(12, 18)).toBe(36)
    })
  })

  describe('Array Functions', () => {
    it('should calculate sum', () => {
      expect(ta.sum(testData)).toBe(55)
      expect(ta.sum([1, 2, 3])).toBe(6)
    })

    it('should calculate average', () => {
      expect(ta.average(testData)).toBe(5.5)
      expect(ta.average([1, 2, 3])).toBe(2)
    })

    it('should find min and max', () => {
      expect(ta.min(testData)).toBe(1)
      expect(ta.max(testData)).toBe(10)
    })

    it('should calculate highest and lowest', () => {
      const result = ta.highest(testData)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(testData.length)
    })

    it('should calculate changes', () => {
      const result = ta.change(10, 5)
      expect(result).toBe(5)
    })

    it('should clamp values', () => {
      expect(ta.clamp(5, 0, 10)).toBe(5)
      expect(ta.clamp(-5, 0, 10)).toBe(0)
      expect(ta.clamp(15, 0, 10)).toBe(10)
    })

    it('should round values', () => {
      expect(ta.round(3.14159, 2)).toBe(3.14)
      expect(ta.round(3.14159, 3)).toBe(3.142)
    })
  })

  describe('Price Calculations', () => {
    it('should calculate HL2', () => {
      const result = ta.hl2(marketData)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(marketData.high!.length)
      expect(result[0]).toBe((marketData.high![0]! + marketData.low![0]!) / 2)
    })

    it('should calculate HLC3', () => {
      const result = ta.hlc3(marketData)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(marketData.high!.length)
      expect(result[0]).toBe((marketData.high![0]! + marketData.low![0]! + marketData.close![0]!) / 3)
    })

    it('should calculate OHLC4', () => {
      const result = ta.ohlc4(marketData)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(marketData.high!.length)
      expect(result[0]).toBe((marketData.open![0]! + marketData.high![0]! + marketData.low![0]! + marketData.close![0]!) / 4)
    })
  })

  describe('Moving Averages', () => {
    it('should calculate SMA', () => {
      const result = ta.sma(testData, 3)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(testData.length)
    })

    it('should calculate EMA', () => {
      const result = ta.ema(testData, 3)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(testData.length)
    })

    it('should calculate WMA', () => {
      const result = ta.wma(testData, 3)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(testData.length)
    })

    it('should calculate Hull MA', () => {
      const result = ta.hull(testData, 3)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(testData.length)
    })
  })

  describe('Momentum Indicators', () => {
    it('should calculate RSI', () => {
      const result = ta.rsi(testData, 3)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(testData.length)
    })

    it('should calculate CCI', () => {
      const result = ta.cci(testData, 3)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(testData.length)
    })

    it('should calculate MACD', () => {
      const result = ta.macd(testData, 3, 5, 2)
      expect(result).toHaveProperty('macd')
      expect(result).toHaveProperty('signal')
      expect(result).toHaveProperty('histogram')
      expect(Array.isArray(result.macd)).toBe(true)
      expect(Array.isArray(result.signal)).toBe(true)
      expect(Array.isArray(result.histogram)).toBe(true)
    })
  })

  describe('Volatility Indicators', () => {
    it('should calculate Bollinger Bands', () => {
      const result = ta.bbands(testData, 3, 2)
      expect(result).toHaveProperty('upper')
      expect(result).toHaveProperty('middle')
      expect(result).toHaveProperty('lower')
      expect(Array.isArray(result.upper)).toBe(true)
      expect(Array.isArray(result.middle)).toBe(true)
      expect(Array.isArray(result.lower)).toBe(true)
    })
  })

  describe('Statistical Functions', () => {
    it('should calculate mean', () => {
      expect(ta.calculateMean([1, 2, 3, 4, 5])).toBe(3)
    })

    it('should calculate variance', () => {
      const variance = ta.calculateVariance([1, 2, 3, 4, 5])
      expect(variance).toBeCloseTo(2, 2)
    })

    it('should calculate standard deviation', () => {
      const stdDev = ta.calculateStandardDeviation([1, 2, 3, 4, 5])
      expect(stdDev).toBeCloseTo(1.41, 2)
    })
  })

  describe('Utility Functions', () => {
    it('should perform safe division', () => {
      expect(ta.safeDivision(10, 2)).toBe(5)
      expect(ta.safeDivision(10, 0)).toBe(0)
    })

    it('should fill arrays with NaN', () => {
      const result = ta.fillNaN([1, NaN, 3, 4], 0)
      expect(Array.isArray(result)).toBe(true)
      expect(result).toEqual([1, 0, 3, 4])
    })

    it('should shift arrays', () => {
      const result = ta.shiftArray([1, 2, 3, 4], 2)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(4)
    })
  })

  describe('Error Handling', () => {
    it('should handle empty arrays', () => {
      expect(() => ta.average([])).toThrow()
    })

    it('should handle invalid parameters', () => {
      expect(() => ta.sma(testData, 0)).toThrow()
      expect(() => ta.sma(testData, -1)).toThrow()
    })

    it('should handle null/undefined data', () => {
      expect(() => ta.sma(null as unknown as number[], 3)).toThrow()
      expect(() => ta.sma(undefined as unknown as number[], 3)).toThrow()
    })
  })
})
