import React from "react"
import tw from "tailwind.macro"
import styled from "styled-components/macro"

import Select from "components/Select"
import courses from "data/courses.json"

function itemToString(item: string) {
  return (courses as any)[item]
}

function matches(inputValue: string | null, item: string) {
  if (!inputValue) {
    return true
  }

  const normalInput = inputValue.toLowerCase()

  return (
    item.toLowerCase().includes(normalInput) || (courses as any)[item].toLowerCase().includes(normalInput)
  )
}

type RowProps = {
  isHighlighted: boolean
}

const Row = styled.div<RowProps>`
  ${tw`
    py-2
  `}
  ${props => props.isHighlighted && tw`bg-green-200`}
`

const CourseCode = tw.span`
  px-2 py-1 mx-2
  text-xs font-bold text-indigo-700
  rounded-full
  bg-indigo-200
`

type CourseSelectProps = {
  value: string
  onChange: (newValue: string) => void
}

const CourseSelect: React.FC<CourseSelectProps> = (props) => {
  const {
    value,
    onChange
  } = props

  return (
    <Select
      label="Subject Area"
      value={value}
      items={Object.keys(courses)}
      onChange={onChange}
      filterPredicate={matches}
      itemToString={itemToString}
    >
      {(item, { isHighlighted }) => (
        <Row isHighlighted={isHighlighted}>
          <CourseCode>{item}</CourseCode> {(courses as any)[item]}
        </Row>
      )}
    </Select>
  )
}

export default CourseSelect
