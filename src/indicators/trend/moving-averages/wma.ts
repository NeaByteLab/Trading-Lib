import { DEFAULT_LENGTHS } from '@constants/indicator-constants'
import { createMovingAverageIndicator } from '@core/factories/indicator-factory'

const { class: WMA, function: wma } = createMovingAverageIndicator(
  'WMA',
  'Weighted Moving Average',
  'wma',
  DEFAULT_LENGTHS.WMA
)

export { WMA }
export { wma }
