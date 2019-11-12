import React from "react"
import tw from "tailwind.macro"

import { Class } from "api/generated/curriculums"
import SectionDetails from "./SectionDetails"

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

type ClassDetailsProps = {
  class: Class
}

const ClassDetails: React.FC<ClassDetailsProps> = (props) => {
  const {
    class: info
  } = props
  return (
    <Wrapper>
      <Title><CourseId>{info.courseId}</CourseId> {info.title}</Title>
      <p>{info.description}</p>
      {
        info.classSections && info.classSections.map(s => (
          <SectionDetails key={s.section} section={s} />
        ))
      }
    </Wrapper>
  )
}

export default ClassDetails
