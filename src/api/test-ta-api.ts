// Test the TA API
import { ta } from './ta'

const testData = [10, 20, 15, 25, 12, 18, 22, 16, 14, 19]

// Market data for indicators that require OHLC
const marketData = {
  open: [10, 12, 14, 16, 18],
  high: [15, 17, 19, 21, 23],
  low: [8, 10, 12, 14, 16],
  close: [12, 14, 16, 18, 20],
  volume: [1000, 1200, 1400, 1600, 1800]
}

console.log('Original data:', testData)

// Test math functions
console.log('Abs:', ta.abs(-5))
console.log('Sqrt:', ta.sqrt(16))
console.log('Pow:', ta.pow(2, 3))
console.log('Log:', ta.log(10))
console.log('Sin:', ta.sin(Math.PI / 2))
console.log('Floor:', ta.floor(3.7))
console.log('Ceil:', ta.ceil(3.2))
console.log('Sign:', ta.sign(-5))
console.log('Exp:', ta.exp(1))
console.log('Mod:', ta.mod(10, 3))
console.log('Factorial:', ta.factorial(5))
console.log('GCD:', ta.gcd(12, 18))
console.log('LCM:', ta.lcm(4, 6))

// Test array functions
console.log('Sum:', ta.sum(testData))
console.log('Average:', ta.average(testData))
console.log('Min:', ta.min(testData))
console.log('Max:', ta.max(testData))
console.log('Highest:', ta.highest(testData))
console.log('Lowest:', ta.lowest(testData))
console.log('Change (10, 5):', ta.change(10, 5))
console.log('Clamp (15, 0, 20):', ta.clamp(15, 0, 20))
console.log('Round (3.14159, 2):', ta.round(3.14159, 2))

// Test calculation functions
console.log('Calculate RSI:', ta.calculateRSI(testData, 3))
console.log('Calculate CCI:', ta.calculateCCI(testData, 3))
console.log('Calculate Mean:', ta.calculateMean(testData))
console.log('Calculate Variance:', ta.calculateVariance(testData))
console.log('Calculate Standard Deviation:', ta.calculateStandardDeviation(testData))
console.log('Safe Division (10/2):', ta.safeDivision(10, 2))
console.log('Safe Division (10/0):', ta.safeDivision(10, 0))

// Test array processing
console.log('Process Array:', ta.processArray(testData, (val, _i) => val * 2))
console.log('Rolling Statistic (min):', ta.rollingStatistic(testData, 3, 'min'))
console.log('Fill NaN:', ta.fillNaN([1, NaN, 3, Infinity, 5], 0))
console.log('Shift Array:', ta.shiftArray([1, 2, 3, 4], 2))

// Test range calculations
console.log('Range Percentage (5, 0, 10):', ta.calculateRangePercentage(5, 0, 10, 100))
console.log('High Low Range:', ta.calculateHighLowRange(marketData.high, marketData.low, 2, 3))
