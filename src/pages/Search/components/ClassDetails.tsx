import React from "react"
import tw from "tailwind.macro"

import { Class, GeneralEducation } from "api/generated/curriculums"
import SectionTable from "pages/Search/components/SectionTable"

const Wrapper = tw.div`
  flex flex-col
  my-4 p-8
  bg-white
  rounded-lg
  shadow
`

const CourseId = tw.span`
  mr-4
  font-bold
`

const Title = tw.h1`
  text-2xl
`

const Units = tw.span`
  mr-4
`

const Description = tw.p`
  mt-2
`

function gradingOptionToString(gradingOption?: string) {
  switch (gradingOption) {
    case "P":
      return "Pass/No Pass Only"
    case "L":
      return "Letter Grade Only"
  }

  return "Optional Grading"
}

function unitsString(c: Class) {
  if (c.unitsFixed) {
    return `${c.unitsFixed} Unit${c.unitsFixed > 1 && "s"}`
  }

  if (c.unitsVariableHigh) {
    return `${c.unitsVariableLow} - ${c.unitsVariableHigh} Units`
  }
}

const GEListWrapper = tw.div`
  mt-1
`

const GEPill = tw.span`
  px-2 py-1 mr-1
  bg-blue-500
  rounded-full
  text-white text-xs
`

type GeneralEducationProps = {
  generalEducation: GeneralEducation[] | undefined
  geCollege?: string
}

const GEList: React.FC<GeneralEducationProps> = props => {
  const { generalEducation, geCollege = "ENGR" } = props

  if (!generalEducation || generalEducation.length === 0) {
    return null
  }

  return (
    <GEListWrapper>
      {generalEducation
        .filter(ge => ge.geCollege === "UCSB" || ge.geCollege === geCollege)
        .map(ge => (
          <GEPill key={`${ge.geCollege} ${ge.geCode}`}>
            {ge.geCode && ge.geCode.trim()}
          </GEPill>
        ))}
    </GEListWrapper>
  )
}

type ClassDetailsProps = {
  class: Class
}

const ClassDetails: React.FC<ClassDetailsProps> = props => {
  const { class: info } = props
  return (
    <Wrapper>
      <Title>
        <CourseId>{info.courseId}</CourseId> {info.title}
      </Title>
      <div>
        <Units>{unitsString(info)}</Units>
        {gradingOptionToString(info.gradingOption)}
      </div>
      <GEList generalEducation={info.generalEducation} />
      <Description>{info.description}</Description>
      <SectionTable sections={info.classSections} />
    </Wrapper>
  )
}

export default ClassDetails
