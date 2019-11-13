import React from "react"
import tw from "tailwind.macro"

import { Class } from "api/generated/curriculums"
import SectionTable from "pages/Search/components/SectionTable"

const Wrapper = tw.div`
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
      <Units>{unitsString(info)}</Units>
      {gradingOptionToString(info.gradingOption)}
      <Description>{info.description}</Description>
      <SectionTable sections={info.classSections} />
    </Wrapper>
  )
}

export default ClassDetails
