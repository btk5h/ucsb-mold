import React from "react"
import tw from "tailwind.macro"
import styled from "styled-components/macro"

import Select from "components/Select"
import courses from "data/courses.json"

const courseOptions: any = {
  "": "All Courses",
  ...courses
}

function itemToString(item: string) {
  return courseOptions[item]
}

function matches(inputValue: string | null, item: string) {
  if (!inputValue) {
    return true
  }

  const normalInput = inputValue.toLowerCase()

  return (
    item.toLowerCase().includes(normalInput) ||
    courseOptions[item].toLowerCase().includes(normalInput)
  )
}

type RowProps = {
  isHighlighted: boolean
}

const Row = styled.div<RowProps>`
  ${tw`
    p-2
    text-off-black
  `}
  ${props => props.isHighlighted && tw`bg-highlight`}
`

const CourseCode = tw.span`
  px-2 py-1 mr-2
  text-xs font-bold text-indigo-700
  rounded-full
  bg-indigo-200
`

type CourseSelectProps = {
  value: string
  onChange: (newValue: string) => void
}

const CourseSelect: React.FC<CourseSelectProps> = props => {
  const { value, onChange } = props

  return (
    <Select
      label="Subject Area"
      value={value}
      items={Object.keys(courseOptions)}
      onChange={onChange}
      filterPredicate={matches}
      itemToString={itemToString}
      keyFunction={i => i}
    >
      {(item, { isHighlighted }) => (
        <Row isHighlighted={isHighlighted}>
          {item && <CourseCode>{item}</CourseCode>} {courseOptions[item]}
        </Row>
      )}
    </Select>
  )
}

export default CourseSelect
