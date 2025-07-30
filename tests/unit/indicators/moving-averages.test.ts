import { movingAverage } from '@calculations/moving-averages'
import { beforeAll, describe, expect, it } from '@jest/globals'
import { loadTestData, validateTestData } from '@tests/utils/data-loader'

describe('Moving Averages', () => {
  let testData: number[]
  let marketData: any
  const expectArrayResult = (result: unknown) => expect(Array.isArray(result)).toBe(true)
  const expectResultLength = (result: unknown[]) => expect(result.length).toBe(testData.length)
  const expectFirstFourNaN = (result: number[]) => {
    for (let i = 0; i < 4; i++) {
      expect(result[i]).toBeNaN()
    }
  }
  const expectFirstValueNaN = (result: number[]) => expect(result[0]).toBeNaN()
  const expectSecondValueNaN = (result: number[]) => expect(result[1]).toBeNaN()
  const expectFirstValueEqualsTestData = (result: number[]) => expect(result[0]).toBe(testData[0])
  const expectThirdValueNotNaN = (result: number[]) => expect(result[2]).not.toBeNaN()
  const expectFourthValueNotNaN = (result: number[]) => expect(result[3]).not.toBeNaN()
  const expectFifthValueNotNaN = (result: number[]) => expect(result[4]).not.toBeNaN()
  const expectFifthValueEqualsThree = (result: number[]) => expect(result[4]).toBe(3)
  const expectSixthValueNotNaN = (result: number[]) => expect(result[5]).not.toBeNaN()

  const expectAllButFirstNotNaN = (result: number[]) => {
    for (let i = 1; i < result.length; i++) {
      expect(result[i]).not.toBeNaN()
    }
  }

  beforeAll(() => {
    testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    marketData = loadTestData()
  })

  describe('SMA (Simple Moving Average)', () => {
    it('should calculate SMA correctly', () => {
      const result = movingAverage(testData, 3, 'sma')
      expectArrayResult(result)
      expectResultLength(result)

      // First two values should be NaN (not enough data)
      expectFirstValueNaN(result)
      expectSecondValueNaN(result)

      // Third value should be average of first 3 values
      expect(result[2]).toBe(2)
    })

    it('should handle different periods', () => {
      const result = movingAverage(testData, 5, 'sma')
      expectArrayResult(result)
      expectResultLength(result)

      // First 4 values should be NaN
      expectFirstFourNaN(result)

      // Fifth value should be average of first 5 values
      expectFifthValueEqualsThree(result)
    })
  })

  describe('EMA (Exponential Moving Average)', () => {
    it('should calculate EMA correctly', () => {
      const result = movingAverage(testData, 3, 'ema')
      expectArrayResult(result)
      expectResultLength(result)

      // First value should be the first data point
      expectFirstValueEqualsTestData(result)

      // Subsequent values should be EMA calculations
      expect(result[1]).not.toBeNaN()
      expectThirdValueNotNaN(result)
    })

    it('should handle different periods', () => {
      const result = movingAverage(testData, 5, 'ema')
      expectArrayResult(result)
      expectResultLength(result)

      // First value should be the first data point
      expectFirstValueEqualsTestData(result)

      // All subsequent values should be calculated
      expectAllButFirstNotNaN(result)
    })
  })

  describe('WMA (Weighted Moving Average)', () => {
    it('should calculate WMA correctly', () => {
      const result = movingAverage(testData, 3, 'wma')
      expectArrayResult(result)
      expectResultLength(result)

      // First two values should be NaN
      expectFirstValueNaN(result)
      expectSecondValueNaN(result)

      // Third value should be weighted average
      expectThirdValueNotNaN(result)
    })

    it('should handle different periods', () => {
      const result = movingAverage(testData, 5, 'wma')
      expectArrayResult(result)
      expectResultLength(result)

      // First 4 values should be NaN
      expectFirstFourNaN(result)

      // Fifth value should be weighted average
      expectFifthValueNotNaN(result)
    })
  })

  describe('Hull Moving Average', () => {
    it('should calculate Hull MA correctly', () => {
      const result = movingAverage(testData, 3, 'hull')
      expectArrayResult(result)
      expectResultLength(result)

      // First few values should be NaN (not enough data)
      expectFirstValueNaN(result)
      expectSecondValueNaN(result)

      // Later values should be calculated
      expectFourthValueNotNaN(result)
    })

    it('should handle different periods', () => {
      const result = movingAverage(testData, 5, 'hull')
      expectArrayResult(result)
      expectResultLength(result)

      // First few values should be NaN
      expectFirstFourNaN(result)

      // Later values should be calculated
      expectSixthValueNotNaN(result)
    })
  })

  describe('Real Market Data', () => {
    it('should work with real market data', () => {
      const closePrices = marketData.close
      const result = movingAverage(closePrices, 20, 'sma')

      expectArrayResult(result)
      expect(result.length).toBe(closePrices.length)
      expect(validateTestData(marketData, closePrices.length)).toBe(true)
    })

    it('should calculate EMA with real data', () => {
      const closePrices = marketData.close
      const result = movingAverage(closePrices, 20, 'ema')

      expectArrayResult(result)
      expect(result.length).toBe(closePrices.length)

      // First value should be the first close price
      expect(result[0]).toBe(closePrices[0])
    })

    it('should calculate WMA with real data', () => {
      const closePrices = marketData.close
      const result = movingAverage(closePrices, 20, 'wma')

      expectArrayResult(result)
      expect(result.length).toBe(closePrices.length)
    })

    it('should calculate Hull MA with real data', () => {
      const closePrices = marketData.close
      const result = movingAverage(closePrices, 20, 'hull')

      expectArrayResult(result)
      expect(result.length).toBe(closePrices.length)
    })
  })

  describe('Error Handling', () => {
    it('should handle empty arrays', () => {
      expect(() => movingAverage([], 3, 'sma')).toThrow()
    })

    it('should handle invalid periods', () => {
      expect(() => movingAverage(testData, 0, 'sma')).toThrow()
      expect(() => movingAverage(testData, -1, 'sma')).toThrow()
    })

    it('should handle periods larger than data length', () => {
      const result = movingAverage(testData, 15, 'sma')
      expectArrayResult(result)
      expectResultLength(result)

      // All values should be NaN
      for (let i = 0; i < result.length; i++) {
        expect(result[i]).toBeNaN()
      }
    })

    it('should handle invalid moving average types', () => {
      expect(() => movingAverage(testData, 3, 'invalid' as any)).toThrow()
    })
  })

  describe('Edge Cases', () => {
    it('should handle single value arrays', () => {
      const result = movingAverage([5], 1, 'sma')
      expectArrayResult(result)
      expect(result.length).toBe(1)
      expect(result[0]).toBe(5)
    })

    it('should handle period of 1', () => {
      const result = movingAverage(testData, 1, 'sma')
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(testData.length)

      // All values should equal the original data
      for (let i = 0; i < result.length; i++) {
        expect(result[i]).toBe(testData[i])
      }
    })
  })
})
