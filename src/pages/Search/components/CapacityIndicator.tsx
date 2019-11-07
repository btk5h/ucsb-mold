import React from "react"
import tw from "tailwind.macro"

const IndicatorPill = tw.span`
  px-3 py-1
  rounded-full
  font-semibold whitespace-no-wrap
`

type CapacityIndicatorProps = {
  max?: number
  slotsFilled?: number
}

const CapacityIndicator: React.FC<CapacityIndicatorProps> = props => {
  const { max = 0, slotsFilled = 0 } = props

  const slotsAvailable = Math.max(max - slotsFilled, 0)
  const ratio = slotsAvailable / Math.max(max, 1)

  const style =
    ratio === 0
      ? tw`bg-red-200 text-red-800`
      : ratio < 0.25
      ? tw`bg-orange-200 text-orange-800`
      : ratio < 0.5
      ? tw`bg-yellow-200 text-yellow-800`
      : tw`bg-green-200 text-green-800`

  return <IndicatorPill style={style}>{slotsAvailable} / {max || 0}</IndicatorPill>
}

export default CapacityIndicator
