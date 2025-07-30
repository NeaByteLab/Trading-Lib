import { DEFAULT_LENGTHS } from '@constants/indicator-constants'
import { createMovingAverageIndicator } from '@core/factories/indicator-factory'

const { class: Hull, function: hull } = createMovingAverageIndicator(
  'Hull',
  'Hull Moving Average',
  'hull',
  DEFAULT_LENGTHS.HULL
)

export { Hull }
export { hull }
