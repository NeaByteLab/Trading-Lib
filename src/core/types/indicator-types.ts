export interface MarketData {
  open: number[]
  high: number[]
  low: number[]
  close: number[]
  volume?: number[]
  timestamp?: number[]
}
export interface IndicatorResult {
  values: number[]
  metadata: {
    length: number
    source: string
    [key: string]: number | string | boolean | number[]
  }
}
export interface IndicatorConfig {
  length?: number
  source?: string
  [key: string]: number | string | boolean | undefined
}
export interface IndicatorFunction {

  (_data: MarketData | number[], _config?: IndicatorConfig): IndicatorResult
}
export interface MultiResult {
  [key: string]: number[] | {
    length: number
    source: string
    [key: string]: number | string | boolean | number[]
  }
  metadata: {
    length: number
    source: string
    [key: string]: number | string | boolean | number[]
  }
}
