/**
 * Large Dataset Processing Example
 *
 * Demonstrates how to use optimized chunking utilities for handling big OHLC datasets.
 * Shows memory-efficient processing strategies for large datasets.
 *
 * @example
 * ```typescript
 * import { ta } from '../src/api/ta'
 * import { ChunkingUtils, OHLCChunkingUtils } from '../src/core/utils/chunking-utils'
 * import { LargeDatasetCalculations } from '../src/core/utils/calculation-utils'
 *
 * // Process large dataset with chunking
 * const results = processLargeDataset(largeMarketData)
 * ```
 */
import { ta } from '../src/api/ta'
import { ChunkingUtils, OHLCChunkingUtils } from '../src/core/utils/chunking-utils'
import { LargeDatasetCalculations } from '../src/core/utils/calculation-utils'
import type { MarketData } from '../src/core/types/indicator-types'

/**
 * Process large dataset with optimized chunking
 *
 * @param data - Large OHLC market data
 * @param config - Chunking configuration
 * @returns Processed indicator results
 */
export function processLargeDataset(
  data: MarketData,
  config: Partial<ChunkingUtils.ChunkConfig> = {}
): {
  rsi: number[]
  sma: number[]
  atr: number[]
  pivots: {
    pp: number[]
    r1: number[]
    s1: number[]
  }
} {
  console.log(`Processing dataset with ${data.close.length} data points`)
  console.log(`Memory usage before processing: ${ChunkingUtils.getMemoryUsage().toFixed(2)} MB`)

  // Optimize chunk configuration based on dataset size
  const optimizedConfig = ChunkingUtils.optimizeChunkConfig(data.close.length, 100)
  const finalConfig = { ...optimizedConfig, ...config }

  console.log(`Using chunk size: ${finalConfig.chunkSize}`)
  console.log(`Using overlap: ${finalConfig.overlap}`)

  // Process RSI with chunking
  const rsi = LargeDatasetCalculations.calculateRSIChunked(
    data.close,
    14,
    finalConfig.chunkSize
  )

  // Process SMA with chunking
  const sma = LargeDatasetCalculations.calculateMAChunked(
    data.close,
    20,
    'sma',
    finalConfig.chunkSize
  )

  // Process ATR with chunking
  const atr = LargeDatasetCalculations.calculateTrueRangeChunked(
    data.high,
    data.low,
    data.close,
    finalConfig.chunkSize
  )

  // Process pivot points with chunking
  const pivots = LargeDatasetCalculations.calculatePivotPointsChunked(
    data.high,
    data.low,
    data.close,
    finalConfig.chunkSize
  )

  console.log(`Memory usage after processing: ${ChunkingUtils.getMemoryUsage().toFixed(2)} MB`)

  return {
    rsi,
    sma,
    atr,
    pivots: {
      pp: pivots.pp,
      r1: pivots.r1,
      s1: pivots.s1
    }
  }
}

/**
 * Stream process large dataset for memory efficiency
 *
 * @param data - Large OHLC market data
 * @param config - Chunking configuration
 * @returns Generator for streaming results
 */
export function* streamProcessLargeDataset(
  data: MarketData,
  config: Partial<ChunkingUtils.ChunkConfig> = {}
): Generator<{
  chunkIndex: number
  rsi: number[]
  sma: number[]
  atr: number[]
}, void, unknown> {
  const optimizedConfig = ChunkingUtils.optimizeChunkConfig(data.close.length, 100)
  const finalConfig = { ...optimizedConfig, ...config }

  // Create OHLC chunks
  const chunks = OHLCChunkingUtils.createOHLCChunks(data, finalConfig)

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]!
    console.log(`Processing chunk ${i + 1}/${chunks.length}`)

    // Process indicators for this chunk
    const rsi = ta.rsi(chunk.close, 14)
    const sma = ta.sma(chunk.close, 20)
    const atr = ta.atr(chunk, 14)

    yield {
      chunkIndex: i,
      rsi,
      sma,
      atr
    }
  }
}

/**
 * Process large dataset with custom chunking strategy
 *
 * @param data - Large OHLC market data
 * @param processor - Custom processing function
 * @param config - Chunking configuration
 * @returns Processed results
 */
export function processWithCustomChunking<T>(
  data: MarketData,
  processor: (chunk: MarketData, chunkIndex: number) => T[],
  config: Partial<ChunkingUtils.ChunkConfig> = {}
): T[] {
  return OHLCChunkingUtils.processOHLCChunks(data, processor, config)
}

/**
 * Example usage for large dataset processing
 */
export function exampleUsage(): void {
  // Simulate large dataset
  const largeDataset: MarketData = {
    open: Array.from({ length: 100000 }, (_, i) => 100 + Math.sin(i * 0.01) * 10),
    high: Array.from({ length: 100000 }, (_, i) => 105 + Math.sin(i * 0.01) * 15),
    low: Array.from({ length: 100000 }, (_, i) => 95 + Math.sin(i * 0.01) * 5),
    close: Array.from({ length: 100000 }, (_, i) => 100 + Math.sin(i * 0.01) * 10),
    volume: Array.from({ length: 100000 }, (_, i) => 1000000 + Math.random() * 500000)
  }

  console.log('=== Large Dataset Processing Example ===')

  // Method 1: Process with optimized chunking
  const results = processLargeDataset(largeDataset)
  console.log(`RSI length: ${results.rsi.length}`)
  console.log(`SMA length: ${results.sma.length}`)
  console.log(`ATR length: ${results.atr.length}`)

  // Method 2: Stream processing for memory efficiency
  console.log('\n=== Streaming Processing ===')
  for (const chunkResult of streamProcessLargeDataset(largeDataset)) {
    console.log(`Chunk ${chunkResult.chunkIndex}: RSI=${chunkResult.rsi.length}, SMA=${chunkResult.sma.length}`)
  }

  // Method 3: Custom chunking strategy
  console.log('\n=== Custom Chunking ===')
  const customResults = processWithCustomChunking(
    largeDataset,
    (chunk, chunkIndex) => {
      // Custom processing logic
      return chunk.close.map((price, i) => price * (1 + chunkIndex * 0.001))
    },
    { chunkSize: 5000, overlap: 50 }
  )
  console.log(`Custom results length: ${customResults.length}`)
}

/**
 * Performance comparison between chunked and non-chunked processing
 *
 * @param data - Market data
 * @returns Performance metrics
 */
export function comparePerformance(data: MarketData): {
  chunked: { time: number, memory: number }
  nonChunked: { time: number, memory: number }
} {
  const startMemory = ChunkingUtils.getMemoryUsage()

  // Test chunked processing
  const chunkedStart = performance.now()
  const chunkedResults = processLargeDataset(data)
  const chunkedTime = performance.now() - chunkedStart
  const chunkedMemory = ChunkingUtils.getMemoryUsage() - startMemory

  // Test non-chunked processing (for smaller datasets)
  const nonChunkedStart = performance.now()
  const nonChunkedResults = {
    rsi: ta.rsi(data.close, 14),
    sma: ta.sma(data.close, 20),
    atr: ta.atr(data, 14)
  }
  const nonChunkedTime = performance.now() - nonChunkedStart
  const nonChunkedMemory = ChunkingUtils.getMemoryUsage() - startMemory

  return {
    chunked: { time: chunkedTime, memory: chunkedMemory },
    nonChunked: { time: nonChunkedTime, memory: nonChunkedMemory }
  }
}

// Run the example
exampleUsage() 