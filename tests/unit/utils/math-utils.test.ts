import { describe, expect, it } from '@jest/globals'
import { MathUtils } from '@utils/math-utils'

describe('Math Utils', () => {
  const testData = [1, -2, 3, -4, 5]
  const emptyData: number[] = []
  const nanData = [1, NaN, 3, 4, 5]

  describe('Basic Math Functions', () => {
    it('should calculate absolute values', () => {
      expect(MathUtils.abs(-5)).toBe(5)
      expect(MathUtils.abs(10)).toBe(10)
      expect(MathUtils.abs(-15)).toBe(15)
    })

    it('should calculate square root', () => {
      expect(MathUtils.sqrt(4)).toBe(2)
      expect(MathUtils.sqrt(9)).toBe(3)
      expect(MathUtils.sqrt(16)).toBe(4)
    })

    it('should calculate power', () => {
      expect(MathUtils.pow(2, 3)).toBe(8)
      expect(MathUtils.pow(3, 2)).toBe(9)
      expect(MathUtils.pow(4, 2)).toBe(16)
    })

    it('should calculate natural logarithm', () => {
      expect(MathUtils.log(1)).toBe(0)
      expect(MathUtils.log(Math.E)).toBeCloseTo(1, 5)
    })

    it('should calculate base-10 logarithm', () => {
      expect(MathUtils.log10(1)).toBe(0)
      expect(MathUtils.log10(10)).toBe(1)
      expect(MathUtils.log10(100)).toBe(2)
    })

    it('should calculate trigonometric functions', () => {
      expect(MathUtils.sin(0)).toBeCloseTo(0, 5)
      expect(MathUtils.sin(Math.PI / 2)).toBeCloseTo(1, 5)
      expect(MathUtils.cos(0)).toBeCloseTo(1, 5)
      expect(MathUtils.cos(Math.PI / 2)).toBeCloseTo(0, 5)
    })

    it('should calculate inverse trigonometric functions', () => {
      expect(MathUtils.asin(0)).toBeCloseTo(0, 5)
      expect(MathUtils.asin(1)).toBeCloseTo(Math.PI / 2, 5)
      expect(MathUtils.acos(1)).toBeCloseTo(0, 5)
      expect(MathUtils.acos(0)).toBeCloseTo(Math.PI / 2, 5)
    })

    it('should calculate floor and ceiling', () => {
      expect(MathUtils.floor(3.7)).toBe(3)
      expect(MathUtils.ceil(3.2)).toBe(4)
      expect(MathUtils.floor(-3.7)).toBe(-4)
      expect(MathUtils.ceil(-3.2)).toBe(-3)
    })

    it('should calculate sign', () => {
      expect(MathUtils.sign(-5)).toBe(-1)
      expect(MathUtils.sign(0)).toBe(0)
      expect(MathUtils.sign(5)).toBe(1)
    })

    it('should calculate exponential', () => {
      expect(MathUtils.exp(0)).toBe(1)
      expect(MathUtils.exp(1)).toBeCloseTo(Math.E, 5)
    })

    it('should calculate modulo', () => {
      expect(MathUtils.mod(7, 3)).toBe(1)
      expect(MathUtils.mod(8, 3)).toBe(2)
      expect(MathUtils.mod(9, 3)).toBe(0)
    })

    it('should calculate remainder', () => {
      expect(MathUtils.rem(7, 3)).toBe(1)
      expect(MathUtils.rem(8, 3)).toBe(2)
      expect(MathUtils.rem(9, 3)).toBe(0)
    })

    it('should calculate factorial', () => {
      expect(MathUtils.factorial(0)).toBe(1)
      expect(MathUtils.factorial(1)).toBe(1)
      expect(MathUtils.factorial(5)).toBe(120)
    })
  })

  describe('Array Math Functions', () => {
    it('should calculate sum', () => {
      expect(MathUtils.sum(testData)).toBe(3)
      expect(MathUtils.sum([1, 2, 3])).toBe(6)
    })

    it('should calculate average', () => {
      expect(MathUtils.average(testData)).toBe(0.6)
      expect(MathUtils.average([1, 2, 3])).toBe(2)
    })

    it('should find minimum value', () => {
      expect(MathUtils.min(testData)).toBe(-4)
      expect(MathUtils.min([1, 2, 3])).toBe(1)
    })

    it('should find maximum value', () => {
      expect(MathUtils.max(testData)).toBe(5)
      expect(MathUtils.max([1, 2, 3])).toBe(3)
    })

    it('should clamp values correctly', () => {
      expect(MathUtils.clamp(5, 0, 10)).toBe(5)
      expect(MathUtils.clamp(-5, 0, 10)).toBe(0)
      expect(MathUtils.clamp(15, 0, 10)).toBe(10)
    })

    it('should round values correctly', () => {
      expect(MathUtils.round(3.14159, 2)).toBe(3.14)
      expect(MathUtils.round(3.14159, 3)).toBe(3.142)
      expect(MathUtils.round(3.14159, 0)).toBe(3)
    })
  })

  describe('Rolling Window Functions', () => {
    it('should calculate rolling minimum', () => {
      const result = MathUtils.rollingMin(testData, 3)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(testData.length)
    })

    it('should calculate rolling maximum', () => {
      const result = MathUtils.rollingMax(testData, 3)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(testData.length)
    })

    it('should calculate highest values', () => {
      const result = MathUtils.highest(testData, 3)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(testData.length)
    })

    it('should calculate lowest values', () => {
      const result = MathUtils.lowest(testData, 3)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(testData.length)
    })
  })

  describe('Change Functions', () => {
    it('should calculate changes', () => {
      const result = MathUtils.changeArray(testData)
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(testData.length - 1)
      expect(result[0]).toBe(-3)
    })
  })

  describe('Utility Functions', () => {
    it('should calculate GCD', () => {
      expect(MathUtils.gcd(12, 18)).toBe(6)
      expect(MathUtils.gcd(7, 13)).toBe(1)
      expect(MathUtils.gcd(0, 5)).toBe(5)
    })

    it('should calculate LCM', () => {
      expect(MathUtils.lcm(12, 18)).toBe(36)
      expect(MathUtils.lcm(7, 13)).toBe(91)
    })
  })

  describe('Error Handling', () => {
    it('should handle empty arrays', () => {
      expect(() => MathUtils.average(emptyData)).toThrow()
    })

    it('should handle NaN values', () => {
      const result = MathUtils.absArray(nanData)
      expect(result[1]).toBeNaN()
    })

    it('should handle invalid parameters', () => {
      expect(() => MathUtils.rollingMin(testData, 0)).toThrow()
      expect(() => MathUtils.rollingMin(testData, -1)).toThrow()
    })
  })
})
