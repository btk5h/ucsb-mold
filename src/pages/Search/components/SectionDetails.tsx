import React from "react"
import tw from "tailwind.macro"

import { ClassSection } from "api/generated/curriculums"
import CapacityIndicator from "./CapacityIndicator"

const Wrapper = tw.div`
  m-4
  rounded
  bg-gray-100
`

type SectionDetailsProps = {
  section: ClassSection
}

const SectionDetails: React.FC<SectionDetailsProps> = (props) => {
  const {
    section
  } = props

  return (
    <Wrapper>
      <CapacityIndicator max={section.maxEnroll} slotsFilled={section.enrolledTotal}/>
      {JSON.stringify(section)}
    </Wrapper>
  )
}

export default SectionDetails
